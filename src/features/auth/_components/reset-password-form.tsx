"use client"

import { useState } from "react"
import { GalleryVerticalEnd, Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    FieldDescription,
    FieldGroup,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import Link from "next/link"
import { Spinner } from "@/components/ui/spinner"
import { useResetPassword } from "../hooks/use-auth"

const resetPasswordSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export const ResetPasswordForm = () => {
    const {mutate: onResetPassword, isPending} = useResetPassword();
    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })

    const [showPassword, setShowPassword] = useState({ newPassword: false, confirmPassword: false });


    const togglePasswordVisibility = (field: "newPassword" | "confirmPassword") => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    }

    const onSubmit = (data: ResetPasswordFormValues) => {
        onResetPassword({ json: { password: data.password } });
    }

    return (
        <section className="flex flex-col gap-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <div className="flex flex-col items-center gap-2 text-center">
                            <a
                                href="#"
                                className="flex flex-col items-center gap-2 font-medium"
                            >
                                <div className="flex size-8 items-center justify-center rounded-md">
                                    <GalleryVerticalEnd className="size-6" />
                                </div>
                                <span className="sr-only">Factify AI</span>
                            </a>
                            <h1 className="text-xl font-bold">Reset your password</h1>
                            <FieldDescription>
                                Enter a new password for your account.
                            </FieldDescription>
                        </div>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword.newPassword ? "text" : "password"}
                                                placeholder="Enter your password"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                                                onClick={() => togglePasswordVisibility("newPassword")}
                                            >
                                                {showPassword.newPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword.confirmPassword ? "text" : "password"}
                                                placeholder="Confirm your password"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                                                onClick={() => togglePasswordVisibility("confirmPassword")}
                                            >
                                                {showPassword.confirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormItem>
                            <Button disabled={isPending} type="submit" className="w-full">
                                {isPending ? <>
                                    <Spinner/> 
                                    Resetting...
                                </> : "Reset Password"}
                            </Button>
                        </FormItem>
                    </FieldGroup>
                </form>
            </Form>
            <div className="flex flex-col gap-2 text-center text-sm">
                <FieldDescription>
                    Back to{" "}
                    <Link href="/sign-in" className="underline underline-offset-4">Sign In</Link>
                </FieldDescription>
            </div>
            <FieldDescription className="px-6 text-center">
                By clicking reset, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </section>
    )
}
