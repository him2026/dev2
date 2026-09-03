"use client";

import { useEffect, useState, useRef } from "react";
import AOS from "aos";
import Link from "next/link";

// All 23 supported languages from Chatterbox Multilingual
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
  { code: "pl-PL", label: "Polski", flag: "🇵🇱" },
  { code: "nl-NL", label: "Nederlands", flag: "🇳🇱" },
  { code: "sv-SE", label: "Svenska", flag: "🇸🇪" },
  { code: "tr-TR", label: "Türkçe", flag: "🇹🇷" },
  { code: "da-DK", label: "Dansk", flag: "🇩🇰" },
  { code: "fi-FI", label: "Suomi", flag: "🇫🇮" },
  { code: "nb-NO", label: "Norsk", flag: "🇳🇴" },
  { code: "uk-UA", label: "Українська", flag: "🇺🇦" },
  { code: "el-GR", label: "Ελληνικά", flag: "🇬🇷" },
  { code: "cs-CZ", label: "Čeština", flag: "🇨🇿" },
  { code: "ro-RO", label: "Română", flag: "🇷🇴" },
];

export default function VoiceAssistantPage() {
  const [isListening, setIsListening] = useState(false);
  const [micStatus, setMicStatus] = useState("Tap to speak");
  const [breathingActive, setBreathingActive] = useState(false);
  const [breatheText, setBreatheText] = useState("Breathe In");
  const [breatheInstr, setBreatheInstr] = useState("Inhale for 4 seconds...");
  const [selectedLang, setSelectedLang] = useState("en-US");
  const [voiceGender, setVoiceGender] = useState<"male" | "female">("female");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const breathingIntervalRef = useRef<any>(null);

  const phaseInfo = {
    name: "Follicular Phase",
    color: "#10B981",
    icon: "fa-leaf",
  };

  const currentLang = LANGUAGES.find((l) => l.code === selectedLang) || LANGUAGES[0];

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
          setMicStatus(`"${transcript}"`);
          await processVoiceInput(transcript);
        };

        recognition.onerror = (event: any) => {
          console.error("Speech Recognition Error:", event.error);
          setMicStatus("Didn't catch that. Tap again.");
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (breathingIntervalRef.current) clearTimeout(breathingIntervalRef.current);
      if (audioRef.current) audioRef.current.pause();
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update recognition language when user changes it
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = selectedLang;
    }
  }, [selectedLang]);

  const processVoiceInput = async (userInput: string) => {
    try {
      setMicStatus("Thinking & generating response...");

      // 1. Get context-aware AI response
      const chatRes = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput, mood: "calm" }),
      });
      const chatData = await chatRes.json();
      const aiReply =
        chatData.reply || "I am here with you. How can I support your wellness today?";

      setMicStatus("Generating voice with NVIDIA Chatterbox...");

      // 2. Synthesize audio via NVIDIA NIM Chatterbox Multilingual
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

      if (ttsRes.ok && ttsRes.headers.get("Content-Type")?.includes("audio")) {
        // NVIDIA NIM returned high-fidelity audio
        const audioBlob = await ttsRes.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        if (audioRef.current) audioRef.current.pause();

        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onplay = () => setMicStatus("HIM is speaking (NVIDIA Chatterbox)...");
        audio.onended = () => setMicStatus("Tap to speak");
        audio.onerror = () => {
          speakText(aiReply);
          setMicStatus("Tap to speak");
        };
        audio.play();
      } else {
        // Fallback to browser TTS
        speakText(aiReply);
        setMicStatus("Tap to speak");
      }
    } catch {
      console.error("Voice Processing Error");
      setMicStatus("Connection error. Tap to try again.");
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
        const promptText = prompt("Speak to HIM (Type your message):");
        if (promptText) processVoiceInput(promptText);
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
      window.speechSynthesis.speak(utterance);
    }
  };

  const startBreathing = () => {
    setBreathingActive(true);
    let phase = 0;
    const phases = [
      { text: "Breathe In", instr: "Inhale slowly for 4 seconds...", duration: 4000 },
      { text: "Hold", instr: "Hold your breath for 4 seconds...", duration: 4000 },
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
    speakText("Let's breathe together. Breathe in slowly.");
  };

  const stopBreathing = () => {
    setBreathingActive(false);
    if (breathingIntervalRef.current) clearTimeout(breathingIntervalRef.current);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="container-md" style={{ paddingTop: "20px" }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .voice-page { text-align: center; padding-bottom: 40px; }
        .voice-hero { margin-bottom: 24px; }
        .voice-hero h2 { font-size: 32px; margin-bottom: 8px; }
        .voice-hero p { color: var(--text-secondary); font-size: 16px; margin-bottom: 12px; }

        .lang-selector-wrap { display: flex; justify-content: center; gap: 12px; margin-bottom: 28px; flex-wrap: wrap; align-items: center; }
        .lang-dropdown { position: relative; display: inline-block; }
        .lang-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 20px; border-radius: 24px;
          background: white; border: 1px solid var(--border-light);
          font-weight: 600; font-size: 14px; color: var(--text-secondary);
          cursor: pointer; transition: all 0.2s;
        }
        .lang-btn:hover { border-color: var(--color-primary); }
        .lang-btn .flag { font-size: 20px; }
        .lang-list {
          position: absolute; top: 48px; left: 50%; transform: translateX(-50%);
          background: white; border: 1px solid var(--border-light);
          border-radius: 16px; box-shadow: 0 12px 40px rgba(0,0,0,0.12);
          padding: 8px 0; z-index: 100; max-height: 320px; overflow-y: auto;
          width: 240px;
        }
        .lang-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 18px; cursor: pointer; font-size: 14px;
          transition: background 0.15s;
        }
        .lang-item:hover { background: #f3f4f6; }
        .lang-item.active { background: var(--color-primary); color: white; border-radius: 8px; margin: 0 4px; }
        .lang-item .flag { font-size: 18px; }

        .gender-toggle { display: flex; border-radius: 24px; overflow: hidden; border: 1px solid var(--border-light); }
        .gender-btn {
          padding: 10px 18px; cursor: pointer; font-size: 13px; font-weight: 600;
          border: none; background: white; color: var(--text-secondary);
          transition: all 0.2s;
        }
        .gender-btn.active { background: var(--color-primary); color: white; }

        .voice-mic-area { position: relative; margin: 40px auto; width: 160px; height: 160px; display:flex; flex-direction:column; align-items:center; }
        .breathe-ring {
            position: absolute; width: 160px; height: 160px; border-radius: 50%;
            border: 3px solid var(--color-primary); opacity: 0; top: 0;
        }
        .breathe-ring.active { animation: pulse 2s infinite; opacity: 1; }
        .mic-btn {
            width: 100px; height: 100px; border-radius: 50%;
            background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
            color: white; font-size: 36px;
            display: flex; align-items: center; justify-content: center;
            margin: 30px auto 0; box-shadow: 0 8px 32px rgba(232,86,127,0.3);
            transition: var(--transition-normal); position: relative; z-index: 1; border: none; cursor: pointer;
        }
        .mic-btn:hover { transform: scale(1.05); }
        .mic-btn.listening { background: var(--color-error); animation: pulse 1.5s infinite; }
        .mic-status { margin-top: 60px; color: var(--text-muted); font-size: 14px; font-weight: 500; max-width: 300px; }

        .voice-actions { display: flex; gap: 16px; justify-content: center; margin-top: 40px; flex-wrap: wrap; }
        .voice-action-btn {
            display: flex; flex-direction: column; align-items: center; gap: 8px;
            padding: 20px 28px; border-radius: var(--border-radius-md);
            background: white; border: 1px solid var(--border-light);
            font-weight: 600; font-size: 14px; color: var(--text-secondary);
            transition: var(--transition-normal); text-decoration: none; cursor: pointer;
        }
        .voice-action-btn:hover { border-color: var(--color-primary); color: var(--color-primary); transform: translateY(-2px); }
        .voice-action-btn i { font-size: 24px; color: var(--color-primary); }

        .breathing-overlay {
            position: fixed; inset: 0; background: var(--bg-overlay);
            z-index: 2000; display: flex; align-items: center; justify-content: center;
        }
        .breathing-card { background: white; border-radius: 32px; padding: 48px; text-align: center; width: 90%; max-width: 400px; }
        .breathing-circle {
            width: 180px; height: 180px; border-radius: 50%; margin: 32px auto;
            background: linear-gradient(135deg, rgba(232,86,127,0.2), rgba(155,142,192,0.2));
            display: flex; align-items: center; justify-content: center;
            font-weight: 700; font-size: 18px; color: var(--color-primary);
            animation: breathe 8s ease-in-out infinite;
        }
        .breathing-instruction { color: var(--text-muted); font-size: 15px; }
      `,
        }}
      />
      <div className="voice-page" data-aos="zoom-in-up">
        {/* Hero */}
        <div className="voice-hero">
          <h2>Voice Assistant</h2>
          <p>
            Powered by NVIDIA Chatterbox Multilingual &bull; 23 Languages
          </p>
          <span
            className="badge badge-primary"
            style={{ background: `${phaseInfo.color}20`, color: phaseInfo.color }}
          >
            <i className={`fa-solid ${phaseInfo.icon}`}></i> {phaseInfo.name}
          </span>
        </div>

        {/* Language & Voice Gender Selector */}
        <div className="lang-selector-wrap" data-aos="fade-up" data-aos-delay="100">
          {/* Language Dropdown */}
          <div className="lang-dropdown">
            <button
              className="lang-btn"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            >
              <span className="flag">{currentLang.flag}</span>
              <span>{currentLang.label}</span>
              <i
                className={`fa-solid fa-chevron-${langDropdownOpen ? "up" : "down"}`}
                style={{ fontSize: "10px" }}
              ></i>
            </button>
            {langDropdownOpen && (
              <div className="lang-list">
                {LANGUAGES.map((lang) => (
                  <div
                    key={lang.code}
                    className={`lang-item ${selectedLang === lang.code ? "active" : ""}`}
                    onClick={() => {
                      setSelectedLang(lang.code);
                      setLangDropdownOpen(false);
                    }}
                  >
                    <span className="flag">{lang.flag}</span>
                    <span>{lang.label}</span>
                    <span style={{ marginLeft: "auto", opacity: 0.6, fontSize: 12 }}>
                      {lang.code}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Voice Gender Toggle */}
          <div className="gender-toggle">
            <button
              className={`gender-btn ${voiceGender === "female" ? "active" : ""}`}
              onClick={() => setVoiceGender("female")}
            >
              <i className="fa-solid fa-venus"></i> Female
            </button>
            <button
              className={`gender-btn ${voiceGender === "male" ? "active" : ""}`}
              onClick={() => setVoiceGender("male")}
            >
              <i className="fa-solid fa-mars"></i> Male
            </button>
          </div>
        </div>

        {/* Mic Button */}
        <div className="voice-mic-area">
          <div
            className={`breathe-ring ${isListening ? "active" : ""}`}
            id="breatheRing"
          ></div>
          <button
            className={`mic-btn ${isListening ? "listening" : ""}`}
            id="micBtn"
            aria-label="Start listening"
            onClick={handleMicClick}
          >
            <i
              className={`fa-solid ${isListening ? "fa-stop" : "fa-microphone"}`}
              id="micIcon"
            ></i>
          </button>
          <p className="mic-status" id="micStatus">
            {micStatus}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="voice-actions" data-aos="zoom-in-up" data-aos-delay="200">
          <button className="voice-action-btn" onClick={startBreathing}>
            <i className="fa-solid fa-wind"></i>
            <span>Guided Breathing</span>
          </button>
          <Link href="/chat" className="voice-action-btn">
            <i className="fa-solid fa-comments"></i>
            <span>Text Chat</span>
          </Link>
          <Link href="/wellness" className="voice-action-btn">
            <i className="fa-solid fa-book-open"></i>
            <span>Wellness Tips</span>
          </Link>
        </div>

        {/* Breathing Exercise Modal */}
        {breathingActive && (
          <div className="breathing-overlay">
            <div className="breathing-card">
              <h3>Breathe With Me</h3>
              <div className="breathing-circle">
                <span>{breatheText}</span>
              </div>
              <p className="breathing-instruction">{breatheInstr}</p>
              <button className="btn btn-outline mt-3" onClick={stopBreathing}>
                Stop
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
