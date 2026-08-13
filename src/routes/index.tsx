import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Iron Sharpens Iron | Christian Men's Community" },
      { name: "description", content: "A Christ-centered brotherhood for men seeking freedom through prayer, accountability, and lasting habits." },
      { property: "og:title", content: "Iron Sharpens Iron" },
      { property: "og:description", content: "Prayer, accountability, and Christ-centered support for men seeking lasting freedom." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});
