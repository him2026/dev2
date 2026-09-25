import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HIM - Her Intelligent Mate | AI Period Companion & Feminine Health Website",
    short_name: "HIM",
    description: "Empathetic AI period companion, online menstrual cycle tracker, and feminine wellness platform for women globally. No download needed.",
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
