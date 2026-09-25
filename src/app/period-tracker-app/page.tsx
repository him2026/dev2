import { redirect } from "next/navigation";

// This page has moved to /online-period-tracker
// The redirect is also handled in next.config.ts for non-JS clients
export default function PeriodTrackerAppRedirect() {
  redirect("/online-period-tracker");
}
