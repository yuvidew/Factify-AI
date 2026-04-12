import { Hono } from "hono";
import auth from "@/features/auth/server/router";
import home from "@/features/home/server/router";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

const routes = app
    .route("/auth", auth)
    .route("/home", home)

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;