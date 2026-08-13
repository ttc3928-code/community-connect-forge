import { createFileRoute } from "@tanstack/react-router";
import DailySurrender from "@/pages/DailySurrender";
export const Route = createFileRoute("/surrender")({ component: DailySurrender });