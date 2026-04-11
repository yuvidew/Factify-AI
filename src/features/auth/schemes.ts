import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required."),
});

export const signUpSchema = z.object({
    name: z.string().trim().min(1, "Name is required."),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters."),
});

export const verifyEmailSchema = z.object({
    email: z.string().email(),
});

export const verifyOtpSchema = z.object({
    userId: z.string().min(1),
    otp: z.string().length(6, "OTP must be 6 digits"),
});

export const resetPasswordSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters."),
});

export const resendOtpSchema = z.object({
    userId: z.string().min(1),
});