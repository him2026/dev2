import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ehfcfprgvsfcdwjgpmzo.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_hXV0bVWpfXvaazbjaw8DrQ_YR3CPU-Q";

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const { full_name, email, password, date_of_birth, last_period_start, avg_cycle_length } = await req.json();

    if (!full_name || !email || !password || !date_of_birth || !last_period_start) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Check if user exists in Supabase
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json({ error: "Email already registered." }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Insert new user into Supabase `users` table
    const { data: user, error: userError } = await supabase
      .from("users")
      .insert({
        full_name,
        email,
        password_hash: hashedPassword,
        date_of_birth: new Date(date_of_birth).toISOString(),
        role: "user",
      })
      .select()
      .single();

    if (userError || !user) {
      console.error("Supabase user creation error:", userError);
      return NextResponse.json({ error: userError?.message || "Failed to create user." }, { status: 500 });
    }

    // Calculate next period prediction
    const lastPeriodDate = new Date(last_period_start);
    const cycleLength = parseInt(avg_cycle_length, 10) || 28;
    const nextPredictedDate = new Date(lastPeriodDate);
    nextPredictedDate.setDate(nextPredictedDate.getDate() + cycleLength);

    // Insert cycle settings into Supabase `cycle_settings` table
    await supabase.from("cycle_settings").insert({
      user_id: user.id,
      last_period_start: lastPeriodDate.toISOString(),
      avg_cycle_length: cycleLength,
      next_predicted_date: nextPredictedDate.toISOString(),
    });

    return NextResponse.json({ success: true, message: "User registered successfully." });
  } catch (error: any) {
    console.error("Register Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
