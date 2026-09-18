import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ehfcfprgvsfcdwjgpmzo.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_hXV0bVWpfXvaazbjaw8DrQ_YR3CPU-Q";

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Query user in Supabase
    const { data: user, error } = await supabase
      .from("users")
      .select("id, full_name, email")
      .eq("email", cleanEmail)
      .maybeSingle();

    if (error) {
      console.error("User existence check error:", error);
      return NextResponse.json({ error: "Failed to verify user." }, { status: 500 });
    }

    if (!user) {
      return NextResponse.json({ exists: false, email: cleanEmail });
    }

    return NextResponse.json({
      exists: true,
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
      },
    });
  } catch (err: any) {
    console.error("Forgot password check API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
