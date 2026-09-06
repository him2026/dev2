import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HIM - Her Intelligent Mate | AI Period Companion & Feminine Health Ally",
    short_name: "HIM AI",
    description: "Empathetic AI period companion, menstrual cycle tracker, and feminine wellness assistant for women globally.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#FF7096",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
