import { getSession } from "@/lib/session";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import CycleTrackerClient from "@/components/CycleTrackerClient";

export default async function CycleTrackerPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const userId = session.id;

  const { data: cycleSettings, error: cycleError } = await supabase
    .from("cycle_settings")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (cycleError || !cycleSettings) {
    redirect("/dashboard");
  }

  const { data: periodLogsData } = await supabase
    .from("period_logs")
    .select("*")
    .eq("user_id", userId)
    .order("start_date", { ascending: false });

  const { data: symptomLogsData } = await supabase
    .from("symptom_logs")
    .select("log_date, severity")
    .eq("user_id", userId)
    .order("log_date", { ascending: false })
    .limit(90);

  return (
    <CycleTrackerClient
      cycleSettings={cycleSettings}
      periodLogs={periodLogsData || []}
      symptomLogs={symptomLogsData || []}
    />
  );
}
