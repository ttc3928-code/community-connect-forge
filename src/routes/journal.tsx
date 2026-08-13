import { createFileRoute } from "@tanstack/react-router";
import Journal from "@/pages/Journal";
export const Route = createFileRoute("/journal")({ component: Journal });