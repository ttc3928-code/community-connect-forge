import { createFileRoute } from "@tanstack/react-router";
import Devotionals from "@/pages/Devotionals";
export const Route = createFileRoute("/devotionals")({ component: Devotionals });