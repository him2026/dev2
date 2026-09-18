import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { createClient } from "@supabase/supabase-js";
import { setSession } from "@/lib/session";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ehfcfprgvsfcdwjgpmzo.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_hXV0bVWpfXvaazbjaw8DrQ_YR3CPU-Q";

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const { email, password, confirm_password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and new password are required." }, { status: 400 });
    }

    if (confirm_password && password !== confirm_password) {
      return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long." }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Verify that the user exists
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id, full_name, email, role")
      .eq("email", cleanEmail)
      .maybeSingle();

    if (userError || !user) {
      return NextResponse.json({ error: "Account not found. Please create an account." }, { status: 404 });
    }

    // Hash the new password
    const hashedPassword = await hash(password, 10);

    // Update password in Supabase
    const { error: updateError } = await supabase
      .from("users")
      .update({
        password_hash: hashedPassword,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (updateError) {
      console.error("Failed to update password in Supabase:", updateError);
      return NextResponse.json({ error: "Failed to update password in database." }, { status: 500 });
    }

    // Auto-login: establish the session cookie
    const sessionUser = {
      id: user.id,
      email: user.email,
      name: user.full_name,
      role: user.role || "user",
    };

    await setSession(sessionUser);

    return NextResponse.json({
      success: true,
      message: "Password updated successfully. Logging you in...",
      user: sessionUser,
    });
  } catch (err: any) {
    console.error("Forgot password reset API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
