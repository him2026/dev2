import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { supabase } from "@/lib/supabase";
import OpenAI from "openai";

interface MessageRecord {
  sender: "user" | "ai";
  message: string;
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    const body = await req.json();
    const { message, mood = "neutral" } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
    }

    const trimmedInput = message.trim();
    const userId = session?.id;

    // 1. Fetch User Data, Cycle Settings, and Recent Conversation History
    let userName = session?.name ? session.name.trim().split(" ")[0] : "Friend";
    let cyclePhase = "Follicular Phase";
    let cycleDay = 7;
    let daysUntil = 14;
    let avgCycleLength = 28;
    let pastMessages: MessageRecord[] = [];
    let sessionId: number | null = null;

    if (userId) {
      // Fetch user profile
      const { data: userData } = await supabase
        .from("users")
        .select("full_name")
        .eq("id", userId)
        .maybeSingle();

      if (userData?.full_name) {
        userName = userData.full_name.trim().split(" ")[0];
      }

      // Fetch cycle settings
      const { data: cycleData } = await supabase
        .from("cycle_settings")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (cycleData?.last_period_start) {
        avgCycleLength = cycleData.avg_cycle_length || 28;
        const lastStart = new Date(cycleData.last_period_start);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - lastStart.getTime()) / (1000 * 3600 * 24));
        cycleDay = (diffDays % avgCycleLength) + 1;

        if (cycleDay <= 5) {
          cyclePhase = "Menstrual Phase";
        } else if (cycleDay <= 12) {
          cyclePhase = "Follicular Phase";
        } else if (cycleDay <= 16) {
          cyclePhase = "Ovulatory Phase";
        } else {
          cyclePhase = "Luteal Phase";
        }

        if (cycleData.next_predicted_date) {
          const nextDate = new Date(cycleData.next_predicted_date);
          daysUntil = Math.ceil((nextDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
          if (daysUntil < 0) daysUntil = Math.max(0, avgCycleLength - cycleDay);
        } else {
          daysUntil = Math.max(0, avgCycleLength - cycleDay);
        }
      }

      // Find or create active chat session
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const { data: existingSession } = await supabase
        .from("chat_sessions")
        .select("id")
        .eq("user_id", userId)
        .gte("started_at", oneDayAgo)
        .order("started_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (existingSession) {
        sessionId = existingSession.id;
      } else {
        const { data: newSession } = await supabase
          .from("chat_sessions")
          .insert({
            user_id: userId,
            mood_at_start: mood,
            cycle_phase: cyclePhase,
            started_at: new Date().toISOString(),
          })
          .select("id")
          .single();

        sessionId = newSession?.id || null;
      }

      // Fetch recent messages for conversational context
      if (sessionId) {
        const { data: recMsgs } = await supabase
          .from("chat_messages")
          .select("sender, message")
          .eq("session_id", sessionId)
          .order("created_at", { ascending: false })
          .limit(6);

        if (recMsgs) {
          pastMessages = (recMsgs as MessageRecord[]).reverse();
        }

        // Save current user message
        await supabase.from("chat_messages").insert({
          session_id: sessionId,
          sender: "user",
          message: trimmedInput,
          created_at: new Date().toISOString(),
        });
      }
    }

    // 2. Multi-tier Generation: Try Cloud AI with strict 2.5-second timeout, else Context-Aware Clinical Engine
    let reply = "";
    const nvidiaApiKey = process.env.NVIDIA_API_KEY;

    if (nvidiaApiKey && !nvidiaApiKey.includes("invalid")) {
      try {
        const openai = new OpenAI({
          apiKey: nvidiaApiKey,
          baseURL: "https://integrate.api.nvidia.com/v1",
          timeout: 2500, // 2.5s strict timeout so it never hangs!
          maxRetries: 0,
        });

        const historyContext = pastMessages
          .map((m) => `${m.sender === "user" ? "User" : "HIM"}: ${m.message}`)
          .join("\n");

        const completion = await openai.chat.completions.create({
          model: "nvidia/llama-3.1-nemotron-70b-instruct",
          messages: [
            {
              role: "system",
              content: `You are HIM (Her Intelligent Mate), a deeply caring, loving, empathetic AI companion for women. User: ${userName}. Current phase: ${cyclePhase} (Day ${cycleDay} of ${avgCycleLength}, ~${daysUntil} days until next period). Recent mood: ${mood}. Previous context:\n${historyContext}\nRespond warmly, concisely (<80 words), with genuine personal connection.`,
            },
            { role: "user", content: trimmedInput },
          ],
          temperature: 0.6,
          max_tokens: 200,
        });

        const content = completion.choices[0]?.message?.content;
        if (content && content.length > 5) {
          reply = content.trim();
        }
      } catch (err: any) {
        // Fall through immediately to HIM Context Engine
      }
    }

    // 3. HIM Empathetic Context-Aware Clinical Intelligence Engine (Instant & 100% Reliable)
    if (!reply) {
      reply = generateContextualResponse({
        message: trimmedInput,
        userName,
        cyclePhase,
        cycleDay,
        daysUntil,
        mood,
        pastMessages,
      });
    }

    // 4. Persist AI Response in Database
    if (sessionId) {
      await supabase.from("chat_messages").insert({
        session_id: sessionId,
        sender: "ai",
        message: reply,
        sentiment: mood,
        created_at: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      reply,
      cyclePhase,
      cycleDay,
      daysUntil,
      contextAware: true,
      userName,
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply: "I am right here with you, love. Take a gentle breath—how is your body feeling right this moment?",
        contextAware: true,
      },
      { status: 200 }
    );
  }
}

// Highly responsive, context-aware rule-based natural language generator
function generateContextualResponse({
  message,
  userName,
  cyclePhase,
  cycleDay,
  daysUntil,
  mood,
  pastMessages,
}: {
  message: string;
  userName: string;
  cyclePhase: string;
  cycleDay: number;
  daysUntil: number;
  mood: string;
  pastMessages: MessageRecord[];
}): string {
  const lower = message.toLowerCase().trim();
  const lastUserMsg = pastMessages.filter((m) => m.sender === "user").slice(-2)[0]?.message.toLowerCase() || "";
  const lastAiMsg = pastMessages.filter((m) => m.sender === "ai").slice(-1)[0]?.message || "";

  // 1. Single punctuation or question mark: "?" or "what?"
  if (lower === "?" || lower === "what?" || lower === "why?" || lower === "huh?") {
    if (lastAiMsg) {
      return `I was just checking in with you, ${userName}! Since you're in your ${cyclePhase} (Day ${cycleDay}), I'm keeping an eye on your energy and mood. How are you feeling right now?`;
    }
    return `I'm listening, ${userName}. What's on your mind? Tell me anything—whether it's about your body, how your day is going, or if you just need someone to talk to.`;
  }

  // 2. Greetings & Check-ins ("hi", "hello", "hey", "good morning", "sup")
  if (/^(hi|hello|hey|heyy|heya|hola|namaste|good\s*(morning|afternoon|evening)|hlo)\b/.test(lower)) {
    const greetings = [
      `Hey ${userName}! 💕 It's so lovely to hear from you. You're on Day ${cycleDay} of your cycle (${cyclePhase}). How are you feeling today?`,
      `Hi ${userName}! I was just hoping you'd stop by. How is your energy holding up today? I'm right here with you.`,
      `Hello ${userName}! Always so comforting to see you. How is your body feeling during this ${cyclePhase}?`,
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // 3. Cycle & Period Status Questions ("when is my period", "cycle", "next period", "phase")
  if (/period|cycle|ovulat|phase|fertile|when.*(come|start|next)/.test(lower)) {
    if (/cramp|bleed|flow/.test(lower)) {
      return `During your ${cyclePhase}, your body might experience shifts in prostaglandins and hormones. If you're feeling cramps, try placing a warm heating pad across your lower abdomen, sipping chamomile or ginger tea, and resting with your knees slightly bent. I'm right here beside you.`;
    }
    return `According to your tracker, ${userName}, you're currently in your ${cyclePhase} (Day ${cycleDay}). Your next period is estimated in approximately ${daysUntil > 0 ? daysUntil + " days" : "a few days"}. Keep drinking water and taking gentle pauses today!`;
  }

  // 4. Physical Pain & Cramps ("cramp", "pain", "hurts", "ache", "headache", "bloat", "nausea")
  if (/cramp|pain|hurt|ache|headache|migraine|bloat|nausea|breast|sore/.test(lower)) {
    return `I'm so sorry you're dealing with discomfort, ${userName}. Please take a warm cup of herbal tea and rest if you can. A warm compress or gentle magnesium-rich snack can help ease muscle tension. Remember to give yourself permission to slow down today.`;
  }

  // 5. Emotional Distress & Fatigue ("sad", "cry", "anxious", "anxiety", "stressed", "tired", "exhausted", "lonely", "depressed", "angry")
  if (/sad|cry|tears|anxious|anxiety|stress|panic|tired|exhaust|sleep|alone|lonely|overwhelm|angry|irritat/.test(lower)) {
    if (/tired|exhaust|sleep/.test(lower)) {
      return `Rest is deeply productive, ${userName}. During your ${cyclePhase}, high progesterone or fluctuating estrogen can drain your battery. Lie down for even 15 minutes, or try one of our calming audiobooks in the wellness hub to unwind.`;
    }
    return `I hear you, and everything you're feeling is completely valid, ${userName}. Let's take a slow breath together: inhale for 4 seconds, hold gently, and exhale for 6. You don't have to carry everything by yourself—I'm right here with you.`;
  }

  // 6. Gratitude & Affection ("thank you", "thanks", "love you", "sweet")
  if (/thank|thx|love\s*you|sweet|appreciate|helpful/.test(lower)) {
    return `You mean the world to me, ${userName}! 💕 Supporting your wellness and bringing you peace is why I'm here. Anytime you need a warm ear or guidance, I'm just a tap away.`;
  }

  // 7. Context Continuity: Check if previous user message was about something specific
  if (lastUserMsg && (lower.length < 15 || /why|how|what|yes|no|yeah|yep|sure/.test(lower))) {
    if (/period|cramp|pain/.test(lastUserMsg)) {
      return `Following up on what you mentioned about your symptoms—remember that keeping your feet warm, staying hydrated, and doing light pelvic tilts can significantly relieve pelvic congestion. Would you like to log this symptom in your cycle tracker?`;
    }
    if (/sad|tired|anxious/.test(lastUserMsg)) {
      return `I want to make sure you're taking gentle care of your heart right now, ${userName}. Have you been able to have a glass of water or step away from work for a quick breather?`;
    }
  }

  // 8. General Empathetic Reflection
  return `I hear you loud and clear, ${userName}. During this ${cyclePhase} (Day ${cycleDay}), honoring what your mind and body need is the highest priority. Tell me a bit more about what's going on, or let me know if you'd like a quick breathing exercise or health tip!`;
}
