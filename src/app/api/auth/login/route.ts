import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { createClient } from "@supabase/supabase-js";
import { setSession } from "@/lib/session";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ehfcfprgvsfcdwjgpmzo.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_hXV0bVWpfXvaazbjaw8DrQ_YR3CPU-Q";

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    // Query user from Supabase
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user || !user.password_hash) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const isValid = await compare(password, user.password_hash);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const sessionUser = {
      id: user.id,
      email: user.email,
      name: user.full_name,
      role: user.role || "user",
    };

    await setSession(sessionUser);

    return NextResponse.json({ success: true, user: sessionUser });
  } catch (err: any) {
    console.error("Login API Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
