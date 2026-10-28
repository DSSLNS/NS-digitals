import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NS Digital Solutions",
    short_name: "NS Digital",
    start_url: "/",
    display: "browser",
    background_color: "#FFF9F1",
    theme_color: "#492653",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
