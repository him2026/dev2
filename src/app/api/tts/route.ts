import { NextResponse } from "next/server";

// Supported languages from Chatterbox Multilingual NIM
const SUPPORTED_VOICES: Record<string, { male: string; female: string }> = {
  "en-US": { male: "Chatterbox-Multilingual.en-US.Male", female: "Chatterbox-Multilingual.en-US.Female" },
  "es-US": { male: "Chatterbox-Multilingual.es-US.Male", female: "Chatterbox-Multilingual.es-US.Female" },
  "hi-IN": { male: "Chatterbox-Multilingual.hi-IN.Male", female: "Chatterbox-Multilingual.hi-IN.Female" },
  "fr-FR": { male: "Chatterbox-Multilingual.fr-FR.Male", female: "Chatterbox-Multilingual.fr-FR.Female" },
  "de-DE": { male: "Chatterbox-Multilingual.de-DE.Male", female: "Chatterbox-Multilingual.de-DE.Female" },
  "it-IT": { male: "Chatterbox-Multilingual.it-IT.Male", female: "Chatterbox-Multilingual.it-IT.Female" },
  "pt-BR": { male: "Chatterbox-Multilingual.pt-BR.Male", female: "Chatterbox-Multilingual.pt-BR.Female" },
  "ja-JP": { male: "Chatterbox-Multilingual.ja-JP.Male", female: "Chatterbox-Multilingual.ja-JP.Female" },
  "ko-KR": { male: "Chatterbox-Multilingual.ko-KR.Male", female: "Chatterbox-Multilingual.ko-KR.Female" },
  "zh-CN": { male: "Chatterbox-Multilingual.zh-CN.Male", female: "Chatterbox-Multilingual.zh-CN.Female" },
  "ar-XA": { male: "Chatterbox-Multilingual.ar-XA.Male", female: "Chatterbox-Multilingual.ar-XA.Female" },
  "ru-RU": { male: "Chatterbox-Multilingual.ru-RU.Male", female: "Chatterbox-Multilingual.ru-RU.Female" },
  "pl-PL": { male: "Chatterbox-Multilingual.pl-PL.Male", female: "Chatterbox-Multilingual.pl-PL.Female" },
  "nl-NL": { male: "Chatterbox-Multilingual.nl-NL.Male", female: "Chatterbox-Multilingual.nl-NL.Female" },
  "sv-SE": { male: "Chatterbox-Multilingual.sv-SE.Male", female: "Chatterbox-Multilingual.sv-SE.Female" },
  "tr-TR": { male: "Chatterbox-Multilingual.tr-TR.Male", female: "Chatterbox-Multilingual.tr-TR.Female" },
  "da-DK": { male: "Chatterbox-Multilingual.da-DK.Male", female: "Chatterbox-Multilingual.da-DK.Female" },
  "fi-FI": { male: "Chatterbox-Multilingual.fi-FI.Male", female: "Chatterbox-Multilingual.fi-FI.Female" },
  "nb-NO": { male: "Chatterbox-Multilingual.nb-NO.Male", female: "Chatterbox-Multilingual.nb-NO.Female" },
  "uk-UA": { male: "Chatterbox-Multilingual.uk-UA.Male", female: "Chatterbox-Multilingual.uk-UA.Female" },
  "el-GR": { male: "Chatterbox-Multilingual.el-GR.Male", female: "Chatterbox-Multilingual.el-GR.Female" },
  "cs-CZ": { male: "Chatterbox-Multilingual.cs-CZ.Male", female: "Chatterbox-Multilingual.cs-CZ.Female" },
  "ro-RO": { male: "Chatterbox-Multilingual.ro-RO.Male", female: "Chatterbox-Multilingual.ro-RO.Female" },
};

export async function POST(req: Request) {
  try {
    const { text, language = "en-US", emotion = 0.5, voice = "female" } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const apiKey = process.env.NVIDIA_API_KEY;
    // Self-hosted NIM Docker endpoint (gRPC on 50051 or HTTP on 9000)
    const nimHttpUrl = process.env.NIM_HTTP_URL || "https://ai.api.nvidia.com/v1/genai/resemble-ai/chatterbox-multilingual";

    if (!apiKey) {
      return NextResponse.json({ error: "NVIDIA API key not configured" }, { status: 500 });
    }

    // Resolve the voice name
    const langVoices = SUPPORTED_VOICES[language] || SUPPORTED_VOICES["en-US"];
    const voiceName = voice === "male" ? langVoices.male : langVoices.female;

    // Try NVIDIA NIM Riva-compatible HTTP endpoint first (self-hosted Docker or cloud)
    // The self-hosted NIM exposes a Riva-compatible REST API on port 9000
    const isSelfHosted = nimHttpUrl.includes("localhost") || nimHttpUrl.includes("127.0.0.1");

    if (isSelfHosted) {
      // Self-hosted NIM Docker: Use Riva-compatible /v1/tts endpoint
      const response = await fetch(`${nimHttpUrl}/v1/tts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          language_code: language,
          voice_name: voiceName,
          encoding: "LINEAR_PCM",
          sample_rate_hz: 24000,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Self-hosted NIM TTS error:", response.status, errorText);
        return NextResponse.json({ fallback: true, text });
      }

      const audioBuffer = await response.arrayBuffer();
      return new NextResponse(audioBuffer, {
        status: 200,
        headers: {
          "Content-Type": "audio/wav",
          "Cache-Control": "public, max-age=3600",
        },
      });
    } else {
      // Cloud NVIDIA NIM API
      const response = await fetch(nimHttpUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          Accept: "audio/wav",
        },
        body: JSON.stringify({
          text,
          language_code: language,
          voice_name: voiceName,
          emotion_exaggeration: emotion,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn("NVIDIA Cloud TTS warning:", response.status, errorText);
        return NextResponse.json({ fallback: true, text });
      }

      const audioBuffer = await response.arrayBuffer();
      return new NextResponse(audioBuffer, {
        status: 200,
        headers: {
          "Content-Type": "audio/wav",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }
  } catch (error: any) {
    console.error("NVIDIA Chatterbox TTS Error:", error);
    return NextResponse.json({ fallback: true, text: "fallback" }, { status: 200 });
  }
}
