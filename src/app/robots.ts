import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/(authenticated)/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/(authenticated)/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/(authenticated)/"],
      },
      {
        userAgent: "Slurp",
        allow: "/",
        disallow: ["/api/", "/admin/", "/(authenticated)/"],
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/(authenticated)/"],
      },
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/(authenticated)/"],
      },
      {
        userAgent: "YandexBot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/(authenticated)/"],
      },
    ],
    sitemap: "https://www.herintelligentmate.in/sitemap.xml",
    host: "https://www.herintelligentmate.in",
  };
}
