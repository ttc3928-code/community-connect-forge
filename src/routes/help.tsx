import { createFileRoute } from "@tanstack/react-router";
import HelpCenter from "@/pages/HelpCenter";
export const Route = createFileRoute("/help")({ component: HelpCenter });