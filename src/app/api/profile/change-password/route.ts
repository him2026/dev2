import { NextResponse } from "next/server";
import { compare, hash } from "bcryptjs";
import { supabase } from "@/lib/supabase";
import { getSession } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { current_password, new_password, confirm_password } = await req.json();

    if (!current_password || !new_password) {
      return NextResponse.json({ error: "All password fields are required." }, { status: 400 });
    }

    if (new_password !== confirm_password) {
      return NextResponse.json({ error: "New passwords do not match." }, { status: 400 });
    }

    if (new_password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long." }, { status: 400 });
    }

    const userId = session.id;

    // Fetch user's current password hash
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("password_hash")
      .eq("id", userId)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const isMatch = await compare(current_password, user.password_hash);
    if (!isMatch) {
      return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
    }

    const newHash = await hash(new_password, 10);

    const { error: updateError } = await supabase
      .from("users")
      .update({
        password_hash: newHash,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (updateError) {
      console.error("Password update error:", updateError);
      return NextResponse.json({ error: "Failed to update password." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Password changed successfully." });
  } catch (err: any) {
    console.error("Change password API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
