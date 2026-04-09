import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { signInSchema, signUpSchema } from "../schemes";
import { createAdminClient } from "@/lib/appwrite";
import { deleteCookie, setCookie } from "hono/cookie";
import { AUTH_COOKIE } from "@/lib/constants";
import { ID } from "node-appwrite";

const app = new Hono()

    .post("/sign-in", zValidator("json", signInSchema), async (c) => {
        const { email, password } = c.req.valid("json");

        const { account } = await createAdminClient();

        const session = await account.createEmailPasswordSession(email, password);

        setCookie(c, AUTH_COOKIE, session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30,
        });

        return c.json({ success: true });
    })
    .post("/sign-up", zValidator("json", signUpSchema), async (c) => {
        const { name, email, password } = c.req.valid("json");
        console.log("the data" , name, email, password);

        const { account } = await createAdminClient();

        await account.create(ID.unique(), email, password, name);

        const session = await account.createEmailPasswordSession(email, password);

        setCookie(c, AUTH_COOKIE, session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30,
        });

        return c.json({ success: true });

    })
    .post("/log-out", async (c) => {
        const { account } = await createAdminClient();

        await account.deleteSession("current");

        deleteCookie(c, AUTH_COOKIE, {
            path: "/",
        });

        return c.json({ success: true });
    });

export default app;