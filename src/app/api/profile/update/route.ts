import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getSession, setSession } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { full_name, date_of_birth, avg_cycle_length, avg_period_length, notification_enabled } = body;

    if (!full_name) {
      return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    }

    const userId = session.id;

    // 1. Update users table
    const { error: userError } = await supabase
      .from("users")
      .update({
        full_name,
        date_of_birth: date_of_birth ? new Date(date_of_birth).toISOString() : null,
        notification_enabled: Boolean(notification_enabled),
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (userError) {
      console.error("User profile update error:", userError);
      return NextResponse.json({ error: "Failed to update profile." }, { status: 500 });
    }

    // 2. Update cycle_settings table
    if (avg_cycle_length || avg_period_length) {
      await supabase
        .from("cycle_settings")
        .update({
          avg_cycle_length: Number(avg_cycle_length) || 28,
          avg_period_length: Number(avg_period_length) || 5,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId);
    }

    // 3. Update session cookie with new name
    await setSession({
      ...session,
      name: full_name,
    });

    return NextResponse.json({ success: true, message: "Profile updated successfully." });
  } catch (err: any) {
    console.error("Profile update API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("full_name, email, date_of_birth, notification_enabled, theme_preference, cycle_settings(*)")
      .eq("id", session.id)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const cycleSettings = Array.isArray(user.cycle_settings) ? user.cycle_settings[0] : user.cycle_settings;

    return NextResponse.json({
      success: true,
      user: {
        full_name: user.full_name,
        email: user.email,
        date_of_birth: user.date_of_birth ? user.date_of_birth.split("T")[0] : "",
        notification_enabled: user.notification_enabled ?? true,
        avg_cycle_length: cycleSettings?.avg_cycle_length || 28,
        avg_period_length: cycleSettings?.avg_period_length || 5,
      },
    });
  } catch (err: any) {
    console.error("Profile GET API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

