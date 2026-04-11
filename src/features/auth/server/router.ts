import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { resendOtpSchema, resetPasswordSchema, signInSchema, signUpSchema, verifyEmailSchema, verifyOtpSchema } from "../schemes";
import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { AUTH_COOKIE } from "@/lib/constants";
import { Account, Client, ID } from "node-appwrite";

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
        console.log("the data", name, email, password);

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
    .post("/verify-email", zValidator("json", verifyEmailSchema), async (c) => {
        const { email } = c.req.valid("json");

        const { account } = await createAdminClient();

        // This sends a 6-digit OTP to the email
        const token = await account.createEmailToken(ID.unique(), email);
        return c.json({ success: true, userId: token.userId });
    })
    .post("/verify-otp", zValidator("json", verifyOtpSchema), async (c) => {
        const { userId, otp } = c.req.valid("json");

        const { account } = await createAdminClient();
        // This verifies the OTP and creates a session if valid
        const session = await account.createSession(userId, otp);

        // Set session cookie so user is "logged in"
        setCookie(c, AUTH_COOKIE, session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30,
        });
        return c.json({ success: true });
    })
    .post("/resend-otp", zValidator("json", resendOtpSchema), async (c) => {
        const { userId } = c.req.valid("json");

        try {
            const { users } = await createAdminClient();
            const user = await users.get(userId);
            const { account } = await createAdminClient();
            const token = await account.createEmailToken(userId, user.email);
            return c.json({ success: true, userId: token.userId });
        } catch (error) {
            return c.json({ error: `Failed to resend OTP ${error instanceof Error ? error.message : "Unknown error"}` }, 500);
        }
    })
    
    .post("/reset-password", zValidator("json", resetPasswordSchema), async (c) => {
        const { password } = c.req.valid("json");

        const sessionCookie = getCookie(c, AUTH_COOKIE);
        if (!sessionCookie) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        try {
            const client = new Client()
                .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
                .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);
            client.setSession(sessionCookie);

            const account = new Account(client);
            await account.updatePassword(password);
            return c.json({ success: true });
        } catch (error) {
            return c.json({ error: `Failed to reset password ${error instanceof Error ? error.message : "Unknown error"}` }, 500);
        }
    })
    .post("/log-out", async (c) => {
        const sessionCookie = getCookie(c, AUTH_COOKIE);

        try {
            if (sessionCookie) {
                const client = new Client()
                    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
                    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);
                client.setSession(sessionCookie);

                const account = new Account(client);
                await account.deleteSession("current");
            }
        } catch (error) {
            throw new Error(`Failed to log out ${error instanceof Error ? error.message : "Unknown error"}`);
        }

        deleteCookie(c, AUTH_COOKIE, {
            path: "/",
        });

        return c.json({ success: true });
    });

export default app;