"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import AOS from "aos";
import Link from "next/link";

// All 23 supported languages
const LANGUAGES = [
  { code: "en-US", label: "English", flag: "🇺🇸" },
  { code: "hi-IN", label: "हिन्दी", flag: "🇮🇳" },
  { code: "es-US", label: "Español", flag: "🇪🇸" },
  { code: "fr-FR", label: "Français", flag: "🇫🇷" },
  { code: "de-DE", label: "Deutsch", flag: "🇩🇪" },
  { code: "it-IT", label: "Italiano", flag: "🇮🇹" },
  { code: "pt-BR", label: "Português", flag: "🇧🇷" },
  { code: "ja-JP", label: "日本語", flag: "🇯🇵" },
  { code: "ko-KR", label: "한국어", flag: "🇰🇷" },
  { code: "zh-CN", label: "中文", flag: "🇨🇳" },
  { code: "ar-XA", label: "العربية", flag: "🇸🇦" },
  { code: "ru-RU", label: "Русский", flag: "🇷🇺" },
];

const VOICE_SAMPLE_PROMPTS = [
  "How is my cycle today?",
  "What phase am I in?",
  "I have mild cramps",
  "Comfort me, I feel overwhelmed",
  "Give me an affirmation",
];

export default function VoiceAssistantPage() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [micStatus, setMicStatus] = useState("Tap \"Start Session\" to begin");
  const [breathingActive, setBreathingActive] = useState(false);
  const [breatheText, setBreatheText] = useState("Breathe In");
  const [breatheInstr, setBreatheInstr] = useState("Inhale for 4 seconds...");
  const [selectedLang, setSelectedLang] = useState("en-US");
  const [voiceGender, setVoiceGender] = useState<"male" | "female">("female");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [lastUserSpeech, setLastUserSpeech] = useState<string>("");
  const [lastAiResponse, setLastAiResponse] = useState<string>("");
  const [sessionStarted, setSessionStarted] = useState(false);
  const [manualText, setManualText] = useState("");

  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const breathingIntervalRef = useRef<any>(null);
  // Track whether the session is active to gate auto-listen
  const sessionActiveRef = useRef(false);

  const currentLang = LANGUAGES.find((l) => l.code === selectedLang) || LANGUAGES[0];

  // Start listening for speech input (used after TTS finishes to create the auto-loop)
  const startListeningAfterSpeak = useCallback(() => {
    if (!sessionActiveRef.current) return;
    setTimeout(() => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch {
          // Already started or unavailable
        }
      }
    }, 500);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 600, once: false });

    // Initialize Web Speech Recognition
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = selectedLang;

        recognition.onstart = () => {
          setIsListening(true);
          setMicStatus("Listening... Speak now");
        };

        recognition.onresult = async (event: any) => {
          const transcript = event.results[0][0].transcript;
          setLastUserSpeech(transcript);
          setMicStatus(`Heard: "${transcript}"`);
          await processVoiceInput(transcript);
        };

        recognition.onerror = (event: any) => {
          console.warn("Speech Recognition Info:", event.error);
          // On "no-speech" or "aborted", auto-restart if session is active
          if (sessionActiveRef.current && (event.error === "no-speech" || event.error === "aborted")) {
            setMicStatus("Didn't catch that. Listening again...");
            setIsListening(false);
            startListeningAfterSpeak();
            return;
          }
          setMicStatus("Tap to speak or click a prompt below");
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
          // If session is active and we're not currently speaking, auto-restart listening
          // (This handles cases where recognition ends without error or result)
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      sessionActiveRef.current = false;
      if (breathingIntervalRef.current) clearTimeout(breathingIntervalRef.current);
      if (audioRef.current) audioRef.current.pause();
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = selectedLang;
    }
  }, [selectedLang]);

  const processVoiceInput = async (userInput: string) => {
    try {
      if (userInput !== "[SYSTEM: GREETING]") {
        setLastUserSpeech(userInput);
      } else {
        setLastUserSpeech("");
      }
      setMicStatus("HIM is thinking...");
      setIsSpeaking(false);

      // 1. Get context-aware AI response from /api/chat
      const chatRes = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput, mood: "calm" }),
      });
      const chatData = await chatRes.json();
      const aiReply =
        chatData.reply || "I am right here with you, love. Take a gentle breath—how is your body feeling right now?";

      setLastAiResponse(aiReply);
      setMicStatus("HIM is speaking...");
      setIsSpeaking(true);

      // 2. Synthesize audio via TTS or Browser Speech
      let ttsHandled = false;
      try {
        const ttsRes = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: aiReply,
            language: selectedLang,
            emotion: 0.5,
            voice: voiceGender,
          }),
        });

        // Only use TTS audio if we actually got an audio response (not JSON fallback)
        const contentType = ttsRes.headers.get("Content-Type") || "";
        if (ttsRes.ok && contentType.includes("audio")) {
          const audioBlob = await ttsRes.blob();
          // Verify blob is a meaningful audio file (not empty or tiny)
          if (audioBlob.size > 100) {
            const audioUrl = URL.createObjectURL(audioBlob);

            if (audioRef.current) audioRef.current.pause();

            const audio = new Audio(audioUrl);
            audioRef.current = audio;

            audio.onplay = () => {
              setIsSpeaking(true);
              setMicStatus("HIM is speaking...");
            };
            audio.onended = () => {
              setIsSpeaking(false);
              setMicStatus("Listening...");
              URL.revokeObjectURL(audioUrl);
              startListeningAfterSpeak();
            };
            audio.onerror = () => {
              URL.revokeObjectURL(audioUrl);
              // Fall through to browser TTS
              speakText(aiReply);
            };

            // Catch autoplay policy rejection
            try {
              await audio.play();
              ttsHandled = true;
            } catch (playError) {
              console.warn("Audio autoplay blocked, falling back to browser TTS:", playError);
              URL.revokeObjectURL(audioUrl);
              // Fall through to browser TTS
            }

            if (ttsHandled) return;
          }
        }
      } catch {
        // Fallback directly to browser TTS
      }

      speakText(aiReply);
    } catch {
      console.error("Voice Processing Error");
      setMicStatus("Ready. Tap microphone or a prompt below.");
      setIsSpeaking(false);
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      setMicStatus("Tap to speak");
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch {
          setMicStatus("Listening...");
        }
      } else {
        // Speech recognition not supported or blocked in browser
        setMicStatus("Speech recognition unavailable in this browser. Use the input or prompts below!");
      }
    }
  };

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      utterance.lang = selectedLang;
      utterance.onstart = () => {
        setIsSpeaking(true);
        setMicStatus("HIM is speaking...");
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        setMicStatus("Listening...");
        startListeningAfterSpeak();
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setMicStatus("Ready. Tap microphone.");
      };
      window.speechSynthesis.speak(utterance);
    } else {
      setIsSpeaking(false);
      setMicStatus("Tap to speak again");
    }
  };

  const startBreathing = () => {
    setBreathingActive(true);
    let phase = 0;
    const phases = [
      { text: "Breathe In", instr: "Inhale slowly for 4 seconds...", duration: 4000 },
      { text: "Hold", instr: "Hold gently for 4 seconds...", duration: 4000 },
      { text: "Breathe Out", instr: "Exhale slowly for 6 seconds...", duration: 6000 },
    ];

    const cycle = () => {
      const p = phases[phase % phases.length];
      setBreatheText(p.text);
      setBreatheInstr(p.instr);
      phase++;
      breathingIntervalRef.current = setTimeout(cycle, p.duration);
    };

    cycle();
    speakText("Let's breathe together, love. Breathe in slowly.");
  };

  const stopBreathing = () => {
    setBreathingActive(false);
    if (breathingIntervalRef.current) clearTimeout(breathingIntervalRef.current);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="container-md" style={{ paddingTop: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <div className="voice-page" data-aos="zoom-in-up">
        {/* Hero */}
        <div className="voice-hero" style={{ textAlign: "center", marginBottom: "20px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 12px",
              borderRadius: "20px",
              background: "rgba(16, 185, 129, 0.15)",
              color: "#059669",
              fontSize: "12px",
              fontWeight: 800,
              marginBottom: "10px",
              border: "1px solid rgba(16, 185, 129, 0.3)",
            }}
          >
            <span className="live-dot-pulse"></span> LIVE VOICE ASSISTANT
          </div>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "var(--text-primary)" }}>
            Hands-Free Voice Companion
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
            Speak naturally with HIM. Context-aware companion for cycle support, PMS comfort, and gentle wellness.
          </p>
        </div>

        {/* Controls: Language and Gender */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "24px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {/* Language Selector */}
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "20px",
                background: "var(--bg-card, #ffffff)",
                border: "1.5px solid var(--border-light, rgba(255, 112, 150, 0.2))",
                fontWeight: 700,
                fontSize: "13px",
                color: "var(--text-primary)",
                cursor: "pointer",
              }}
            >
              <span>{currentLang.flag}</span>
              <span>{currentLang.label}</span>
              <i className="fa-solid fa-chevron-down" style={{ fontSize: "10px" }}></i>
            </button>

            {langDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "44px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "var(--bg-card, #ffffff)",
                  border: "1.5px solid var(--border-light)",
                  borderRadius: "16px",
                  boxShadow: "0 12px 36px rgba(0, 0, 0, 0.15)",
                  padding: "6px 0",
                  zIndex: 100,
                  maxHeight: "260px",
                  overflowY: "auto",
                  width: "200px",
                }}
              >
                {LANGUAGES.map((lang) => (
                  <div
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 16px",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: 600,
                      background: selectedLang === lang.code ? "var(--color-primary-light)" : "transparent",
                      color: selectedLang === lang.code ? "var(--color-primary)" : "var(--text-primary)",
                    }}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Voice Gender Toggle */}
          <div
            style={{
              display: "flex",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1.5px solid var(--border-light, rgba(255, 112, 150, 0.2))",
              background: "var(--bg-card, #ffffff)",
            }}
          >
            <button
              type="button"
              onClick={() => setVoiceGender("female")}
              style={{
                padding: "8px 16px",
                border: "none",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 700,
                background: voiceGender === "female" ? "var(--color-primary)" : "transparent",
                color: voiceGender === "female" ? "white" : "var(--text-secondary)",
                transition: "all 0.2s",
              }}
            >
              🌸 Soft &amp; Warm
            </button>
            <button
              type="button"
              onClick={() => setVoiceGender("male")}
              style={{
                padding: "8px 16px",
                border: "none",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 700,
                background: voiceGender === "male" ? "var(--color-primary)" : "transparent",
                color: voiceGender === "male" ? "white" : "var(--text-secondary)",
                transition: "all 0.2s",
              }}
            >
              🌿 Deep &amp; Grounding
            </button>
          </div>
        </div>

        {/* Central Animated Mic Orb */}
        <div
          style={{
            position: "relative",
            margin: "20px auto 30px auto",
            width: "160px",
            height: "160px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Animated sound wave rings */}
          <div
            style={{
              position: "absolute",
              width: isListening || isSpeaking ? "160px" : "120px",
              height: isListening || isSpeaking ? "160px" : "120px",
              borderRadius: "50%",
              border: "3px solid var(--color-primary)",
              opacity: isListening || isSpeaking ? 0.8 : 0.2,
              animation: isListening || isSpeaking ? "livePulsate 1.5s infinite" : "none",
              transition: "all 0.3s ease",
            }}
          ></div>

          {!sessionStarted ? (
            <button
              type="button"
              onClick={() => {
                setSessionStarted(true);
                sessionActiveRef.current = true;
                processVoiceInput("[SYSTEM: GREETING]");
              }}
              className="btn btn-primary"
              style={{
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                fontSize: "18px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                position: "relative",
                zIndex: 2,
                boxShadow: "0 8px 32px rgba(255, 112, 150, 0.4)",
              }}
            >
              <i className="fa-solid fa-play" style={{ fontSize: "28px" }}></i>
              Start Session
            </button>
          ) : (
            <button
              type="button"
              onClick={handleMicClick}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: isListening
                  ? "linear-gradient(135deg, #EF4444, #DC2626)"
                  : "linear-gradient(135deg, #10B981, #059669)",
                color: "white",
                fontSize: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                cursor: "pointer",
                boxShadow: isListening
                  ? "0 8px 32px rgba(239, 68, 68, 0.5)"
                  : "0 8px 32px rgba(16, 185, 129, 0.4)",
                position: "relative",
                zIndex: 2,
                transition: "all 0.25s ease",
              }}
              aria-label="Toggle voice recognition"
            >
              <i className={`fa-solid ${isListening ? "fa-microphone-slash" : "fa-microphone"}`}></i>
            </button>
          )}
        </div>

        {/* Live Status Text */}
        <p
          style={{
            textAlign: "center",
            fontSize: "14px",
            fontWeight: 700,
            color: isListening ? "#EF4444" : isSpeaking ? "#10B981" : "var(--text-secondary)",
            marginBottom: "18px",
          }}
        >
          {micStatus}
        </p>

        {/* Real-Time Live Transcript & Response Bubbles */}
        {(lastUserSpeech || lastAiResponse) && (
          <div
            style={{
              background: "var(--bg-card, #ffffff)",
              border: "1.5px solid var(--border-light, rgba(255, 112, 150, 0.2))",
              borderRadius: "20px",
              padding: "20px",
              marginBottom: "24px",
              textAlign: "left",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
            }}
          >
            {lastUserSpeech && (
              <div style={{ marginBottom: "14px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  You said:
                </span>
                <p
                  style={{
                    margin: 0,
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    padding: "8px 14px",
                    borderRadius: "12px",
                    background: "var(--bg-body, #f8fafc)",
                  }}
                >
                  &ldquo;{lastUserSpeech}&rdquo;
                </p>
              </div>
            )}

            {lastAiResponse && (
              <div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    color: "#10B981",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "4px",
                  }}
                >
                  <i className="fa-solid fa-volume-high"></i> HIM Answered:
                </span>
                <p
                  style={{
                    margin: 0,
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    lineHeight: 1.55,
                    padding: "12px 16px",
                    borderRadius: "14px",
                    background: "rgba(16, 185, 129, 0.08)",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                  }}
                >
                  {lastAiResponse}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Quick Voice Prompts (Instant Speak) */}
        <div style={{ marginBottom: "28px" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--text-muted)",
              display: "block",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            Tap to Ask &amp; Hear HIM Speak:
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
            {VOICE_SAMPLE_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  if (!sessionActiveRef.current) {
                    setSessionStarted(true);
                    sessionActiveRef.current = true;
                  }
                  processVoiceInput(prompt);
                }}
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  border: "1.5px solid var(--border-light, rgba(255, 112, 150, 0.25))",
                  background: "var(--bg-card, #ffffff)",
                  color: "var(--text-primary, #1e293b)",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
                }}
              >
                <i className="fa-solid fa-play" style={{ fontSize: "10px", color: "#10B981", marginRight: "6px" }}></i>
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Type to Speak Input (Accessibility Fallback) */}
        <div
          style={{
            background: "var(--bg-card, #ffffff)",
            border: "1.5px solid var(--border-light, rgba(255, 112, 150, 0.2))",
            borderRadius: "20px",
            padding: "16px",
            marginBottom: "28px",
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (manualText.trim()) {
                if (!sessionActiveRef.current) {
                  setSessionStarted(true);
                  sessionActiveRef.current = true;
                }
                processVoiceInput(manualText);
                setManualText("");
              }
            }}
            style={{ display: "flex", gap: "10px" }}
          >
            <input
              type="text"
              placeholder="Or type a question to hear HIM speak it..."
              value={manualText}
              onChange={(e) => setManualText(e.target.value)}
              style={{
                flex: 1,
                padding: "10px 16px",
                borderRadius: "14px",
                border: "1px solid var(--border-light)",
                background: "var(--bg-body, #f8fafc)",
                fontSize: "14px",
                color: "var(--text-primary)",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={!manualText.trim()}
              className="btn btn-primary"
              style={{ borderRadius: "14px", padding: "10px 20px" }}
            >
              <i className="fa-solid fa-volume-high"></i> Speak
            </button>
          </form>
        </div>

        {/* Voice Feature Action Cards */}
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            className="btn btn-outline"
            onClick={startBreathing}
            style={{
              borderRadius: "16px",
              padding: "12px 20px",
              fontWeight: 700,
              fontSize: "14px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <i className="fa-solid fa-wind" style={{ color: "var(--color-primary)" }}></i>
            Guided Breathing
          </button>

          <Link
            href="/chat"
            className="btn btn-outline"
            style={{
              borderRadius: "16px",
              padding: "12px 20px",
              fontWeight: 700,
              fontSize: "14px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
            }}
          >
            <i className="fa-solid fa-comments" style={{ color: "#EC4899" }}></i>
            Switch to Chat
          </Link>
        </div>

        {/* Guided Breathing Modal */}
        {breathingActive && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(8px)",
              zIndex: 10000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <div
              style={{
                background: "var(--bg-card, #ffffff)",
                borderRadius: "32px",
                padding: "36px",
                textAlign: "center",
                maxWidth: "380px",
                width: "100%",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                border: "2px solid var(--border-light)",
              }}
            >
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-primary)", margin: "0 0 8px 0" }}>
                Guided Relaxation Breathing
              </h3>
              <div
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "50%",
                  margin: "24px auto",
                  background: "linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(16, 185, 129, 0.2))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "20px",
                  color: "var(--color-primary)",
                  border: "3px solid var(--color-primary)",
                  animation: "livePulsate 4s ease-in-out infinite",
                }}
              >
                {breatheText}
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px", margin: "0 0 20px 0" }}>
                {breatheInstr}
              </p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={stopBreathing}
                style={{ borderRadius: "14px", padding: "8px 24px" }}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
