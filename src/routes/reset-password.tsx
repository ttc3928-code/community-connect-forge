import { createFileRoute } from "@tanstack/react-router";
import ResetPassword from "@/pages/ResetPassword";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password | Iron Sharpens Iron" },
      { name: "description", content: "Set a new password for your Iron Sharpens Iron account and get back to your daily walk." },
      { property: "og:title", content: "Reset Password | Iron Sharpens Iron" },
      { property: "og:description", content: "Set a new password for your Iron Sharpens Iron account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResetPassword,
});
