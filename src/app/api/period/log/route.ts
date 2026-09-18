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
    const { start_date, end_date, flow_intensity = "medium", symptoms = {}, severity = "mild", notes = "" } = body;

    if (!start_date) {
      return NextResponse.json({ error: "Start date is required." }, { status: 400 });
    }

    const userId = session.id;

    // 1. Insert Period Log
    const { data: periodLog, error: periodError } = await supabase
      .from("period_logs")
      .insert({
        user_id: userId,
        start_date: new Date(start_date).toISOString(),
        end_date: end_date ? new Date(end_date).toISOString() : null,
        flow_intensity,
        notes,
      })
      .select()
      .single();

    if (periodError) {
      console.error("Period log insert error:", periodError);
      return NextResponse.json({ error: "Failed to record period log." }, { status: 500 });
    }

    // 2. Insert Symptom Log
    const hasAnySymptom = Object.values(symptoms).some(Boolean);
    if (hasAnySymptom) {
      const { error: symptomError } = await supabase.from("symptom_logs").insert({
        user_id: userId,
        log_date: new Date(start_date).toISOString(),
        cramps: Boolean(symptoms.cramps),
        headache: Boolean(symptoms.headache),
        bloating: Boolean(symptoms.bloating),
        fatigue: Boolean(symptoms.fatigue),
        mood_swings: Boolean(symptoms.mood_swings),
        acne: Boolean(symptoms.acne),
        back_pain: Boolean(symptoms.back_pain),
        cravings: Boolean(symptoms.cravings),
        severity,
      });

      if (symptomError) {
        console.warn("Symptom log insert warning:", symptomError);
      }
    }

    // 3. Recalculate and update cycle settings
    const { data: pastPeriods } = await supabase
      .from("period_logs")
      .select("start_date")
      .eq("user_id", userId)
      .order("start_date", { ascending: false })
      .limit(6);

    let avgCycle = 28;
    if (pastPeriods && pastPeriods.length > 1) {
      let totalDiff = 0;
      let count = 0;
      for (let i = 0; i < pastPeriods.length - 1; i++) {
        const d1 = new Date(pastPeriods[i].start_date).getTime();
        const d2 = new Date(pastPeriods[i + 1].start_date).getTime();
        const days = Math.round((d1 - d2) / (1000 * 3600 * 24));
        if (days > 15 && days < 60) {
          totalDiff += days;
          count++;
        }
      }
      if (count > 0) {
        avgCycle = Math.max(20, Math.min(45, Math.round(totalDiff / count)));
      }
    }

    const nextPredicted = new Date(start_date);
    nextPredicted.setDate(nextPredicted.getDate() + avgCycle);

    const regularity = Math.abs(avgCycle - 28) > 7 ? "irregular" : "regular";
    const pcosFlag = regularity === "irregular";

    await supabase
      .from("cycle_settings")
      .update({
        last_period_start: new Date(start_date).toISOString(),
        avg_cycle_length: avgCycle,
        next_predicted_date: nextPredicted.toISOString(),
        cycle_regularity: regularity,
        pcos_flag: pcosFlag,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);

    return NextResponse.json({
      success: true,
      periodLog,
      cycle: { avgCycle, nextPredicted: nextPredicted.toISOString(), regularity },
    });
  } catch (err: any) {
    console.error("Log Period API Exception:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
