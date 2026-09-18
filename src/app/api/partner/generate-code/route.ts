import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getSession } from "@/lib/session";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Generate a unique 8-character alphanumeric code
    const rawCode = crypto.randomBytes(4).toString("hex").toUpperCase();
    const pairingCode = `HIM-${rawCode.slice(0, 4)}-${rawCode.slice(4, 8)}`;

    // Set expiry to 24 hours from now
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    // Invalidate any existing active or inactive codes for this user
    await supabase
      .from("partner_links")
      .delete()
      .eq("user_id", session.id);

    // Insert new code
    const { data, error } = await supabase
      .from("partner_links")
      .insert({
        user_id: session.id,
        pairing_code: pairingCode,
        is_active: false,
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating partner link:", error);
      return NextResponse.json({ error: "Failed to generate code" }, { status: 500 });
    }

    return NextResponse.json({ success: true, code: pairingCode, expiresAt });
  } catch (err: any) {
    console.error("Generate code error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
