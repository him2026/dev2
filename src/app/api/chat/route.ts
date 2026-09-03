import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    const body = await req.json();
    const { message, mood = "neutral" } = body;

    let cyclePhase = "Follicular Phase";
    let userName = session?.name || "Friend";

    const nvidiaApiKey = process.env.NVIDIA_API_KEY;

    const systemPrompt = `You are HIM (Her Intelligent Mate), a deeply empathetic, warm, and supportive AI companion specializing in women's menstrual, hormonal, and mental health. The user's name is ${userName}, their current mood is '${mood}', and their estimated cycle phase is '${cyclePhase}'. Provide concise, comforting, and scientifically grounded guidance with genuine care. Keep responses under 150 words.`;

    // Initialize OpenAI client pointing to NVIDIA NIM API endpoint
    if (nvidiaApiKey) {
      try {
        const openai = new OpenAI({
          apiKey: nvidiaApiKey,
          baseURL: "https://integrate.api.nvidia.com/v1",
        });

        const completion = await openai.chat.completions.create({
          model: "deepseek-ai/deepseek-v4-flash-0731",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message },
          ],
          temperature: 0.6,
          max_tokens: 1024,
        });

        const reply = completion.choices[0]?.message?.content;

        if (reply) {
          return NextResponse.json({ reply, model: "DeepSeek-V4-Flash-0731 (NVIDIA NIM)", contextAware: true });
        }
      } catch (err: any) {
        console.warn("NVIDIA NIM DeepSeek SDK Call Warning:", err?.message || err);
      }
    }

    // Empathetic Context-Aware Fallback Engine
    const responses: Record<string, string[]> = {
      happy: [
        `That's wonderful to hear, ${userName}! High energy and positive mood are typical during your ${cyclePhase}. How can we build on this momentum today?`,
        `I love that you are feeling good! Celebrating these moments is so important for holistic wellness.`
      ],
      sad: [
        `I'm sending you warmth, ${userName}. During your ${cyclePhase}, hormonal fluctuations can affect emotional resilience. Would you like a 5-minute breathing exercise or a soothing audiobook suggestion?`,
        `It is completely valid to feel down. Take it easy on yourself today.`
      ],
      anxious: [
        `Take a deep, slow breath with me, ${userName}. Let's inhale for 4 seconds and exhale for 6. Your body is supported, and you are not alone.`,
        `Anxiety can feel overwhelming. Remember to sip water and ground yourself. I'm right here with you.`
      ],
      tired: [
        `Rest is productive, ${userName}. Make sure to honor your body's signal for sleep and gentle movement today.`,
        `Feeling low on energy is very natural during hormonal shifts. Listen to your body and take a break.`
      ],
      neutral: [
        `Thank you for sharing, ${userName}. How has your day been treating you overall?`,
        `I'm here for you whenever you need to chat, log symptoms, or take a peaceful pause.`
      ]
    };

    const moodList = responses[mood] || responses.neutral;
    const reply = moodList[Math.floor(Math.random() * moodList.length)];

    return NextResponse.json({ reply, model: "HIM Empathetic Engine", contextAware: true });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { reply: "I am here with you. How can I support your wellness journey right now?" },
      { status: 200 }
    );
  }
}
