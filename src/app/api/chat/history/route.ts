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

    // Fetch the user's last 3 chat sessions for cross-session context
    const { data: recentSessions } = await supabase
      .from("chat_sessions")
      .select("id")
      .eq("user_id", userId)
      .order("started_at", { ascending: false })
      .limit(3);

    if (!recentSessions || recentSessions.length === 0) {
      return NextResponse.json({ messages: [], todayDate: new Date().toISOString().slice(0, 10) });
    }

    const sessionIds = recentSessions.map((s) => s.id);

    // Fetch messages across all recent sessions for full conversational context
    const { data: messages, error } = await supabase
      .from("chat_messages")
      .select("id, sender, message, created_at")
      .in("session_id", sessionIds)
      .order("created_at", { ascending: true })
      .limit(50);

    if (error) {
      console.error("Error fetching chat messages:", error);
      return NextResponse.json({ messages: [] });
    }

    return NextResponse.json({
      messages: messages || [],
      todayDate: new Date().toISOString().slice(0, 10),
    });
  } catch (err: any) {
    console.error("Chat history error:", err);
    return NextResponse.json({ messages: [] }, { status: 200 });
  }
}
