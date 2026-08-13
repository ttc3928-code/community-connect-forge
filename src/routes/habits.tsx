import { createFileRoute } from "@tanstack/react-router";
import MyHabits from "@/pages/MyHabits";
export const Route = createFileRoute("/habits")({ component: MyHabits });