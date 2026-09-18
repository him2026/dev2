import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.id;

    // Fetch user's latest chat session
    const { data: latestSession } = await supabase
      .from("chat_sessions")
      .select("id")
      .eq("user_id", userId)
      .order("started_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!latestSession) {
      return NextResponse.json({ messages: [] });
    }

    // Fetch messages for this session
    const { data: messages, error } = await supabase
      .from("chat_messages")
      .select("id, sender, message, created_at")
      .eq("session_id", latestSession.id)
      .order("created_at", { ascending: true })
      .limit(50);

    if (error) {
      console.error("Error fetching chat messages:", error);
      return NextResponse.json({ messages: [] });
    }

    return NextResponse.json({ messages: messages || [] });
  } catch (err: any) {
    console.error("Chat history error:", err);
    return NextResponse.json({ messages: [] }, { status: 200 });
  }
}
