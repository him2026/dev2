import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";

export function useRealtimeSubscription(
  table: string,
  onPayload: (payload: any) => void
) {
  useEffect(() => {
    const supabase = createClient();
    
    const channel = supabase
      .channel(`realtime:${table}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: table },
        (payload) => {
          onPayload(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, onPayload]);
}
