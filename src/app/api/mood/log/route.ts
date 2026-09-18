import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getSession } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { mood, intensity = 5, notes = "", cycle_phase = "Follicular Phase" } = body;

    if (!mood) {
      return NextResponse.json({ error: "Mood is required." }, { status: 400 });
    }

    const userId = session.id;

    // Check if user already logged mood today; if so, update or insert
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const { data: existingLog } = await supabase
      .from("mood_logs")
      .select("id")
      .eq("user_id", userId)
      .gte("log_date", todayStart.toISOString())
      .lte("log_date", todayEnd.toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    let result;
    if (existingLog) {
      result = await supabase
        .from("mood_logs")
        .update({
          mood: Array.isArray(mood) ? mood.join(",") : mood,
          intensity: Number(intensity),
          notes,
          cycle_phase,
          created_at: new Date().toISOString(),
        })
        .eq("id", existingLog.id)
        .select()
        .single();
    } else {
      result = await supabase
        .from("mood_logs")
        .insert({
          user_id: userId,
          log_date: new Date().toISOString(),
          mood: Array.isArray(mood) ? mood.join(",") : mood,
          intensity: Number(intensity),
          notes,
          cycle_phase,
        })
        .select()
        .single();
    }

    if (result.error) {
      console.error("Mood log DB error:", result.error);
      return NextResponse.json({ error: "Failed to save mood log." }, { status: 500 });
    }

    return NextResponse.json({ success: true, log: result.data });
  } catch (err: any) {
    console.error("Mood Log API Exception:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: logs, error } = await supabase
      .from("mood_logs")
      .select("*")
      .eq("user_id", session.id)
      .order("log_date", { ascending: false })
      .limit(30);

    if (error) {
      console.error("Fetch mood logs error:", error);
      return NextResponse.json({ error: "Failed to fetch mood logs." }, { status: 500 });
    }

    return NextResponse.json({ success: true, logs: logs || [] });
  } catch (err: any) {
    console.error("Mood GET API Exception:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
