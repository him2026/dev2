import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ehfcfprgvsfcdwjgpmzo.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_hXV0bVWpfXvaazbjaw8DrQ_YR3CPU-Q";

export const supabase = createClient(supabaseUrl, supabaseKey);
