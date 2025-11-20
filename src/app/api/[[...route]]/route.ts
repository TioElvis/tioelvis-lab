import app_router from "@/server";
import { handle } from "hono/vercel";

export const GET = handle(app_router.handler);
export const POST = handle(app_router.handler);
export const PUT = handle(app_router.handler);
export const PATCH = handle(app_router.handler);
export const DELETE = handle(app_router.handler);
