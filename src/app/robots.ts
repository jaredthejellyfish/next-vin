import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/private/", // Adjust this path based on your site's structure
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: "/private/",
      },
      {
        userAgent: ["Applebot", "Bingbot"],
        disallow: "/",
      },
    ],
    sitemap: "https://vin-decode.com/sitemap.xml",
    host: "https://vin-decode.com",
  };
}
