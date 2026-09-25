import { redirect } from "next/navigation";

// This page has moved to /wellness-for-women
// The redirect is also handled in next.config.ts for non-JS clients
export default function WomenWellnessAppRedirect() {
  redirect("/wellness-for-women");
}
