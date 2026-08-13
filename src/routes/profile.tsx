import { createFileRoute } from "@tanstack/react-router";
import Profile from "@/pages/Profile";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile & Settings | Iron Sharpens Iron" },
      {
        name: "description",
        content:
          "Manage your account, emergency accountability contact, reminders, and privacy settings.",
      },
      { property: "og:title", content: "Profile & Settings | Iron Sharpens Iron" },
      {
        property: "og:description",
        content:
          "Manage your account, emergency accountability contact, reminders, and privacy settings.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Profile,
});
