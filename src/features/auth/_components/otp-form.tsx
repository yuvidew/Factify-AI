"use client"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import { GalleryVerticalEnd } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    FieldDescription,
    FieldGroup,
} from "@/components/ui/field"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import Link from "next/link"
import { Spinner } from "@/components/ui/spinner"
import { useState, useEffect, useCallback } from "react"
import { useResendOtp, useVerifyOtp } from "../hooks/use-auth"
import { useQueryState } from "@/hooks/use-query-state"
import { toast } from "sonner"

const otpSchema = z.object({
    otp: z.string().length(6, "OTP must be 6 digits"),
})

type OtpFormValues = z.infer<typeof otpSchema>

export const OtpForm = () => {

    const {mutate: onVerifyOtp, isPending} = useVerifyOtp();
    const {mutate: onResendOtp, isPending: isResending} = useResendOtp();

    const [value] = useQueryState("userId");

    const [timer, setTimer] = useState(60);
    const canResend = timer <= 0;

    useEffect(() => {
        if (timer <= 0) return;
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleResend = useCallback(() => {
        if(!value){
            toast.error("Your email verification session has expired. Please try again.");
            return;
        }
        onResendOtp({ json: { userId: value } });
        setTimer(60);
    }, [value, onResendOtp]);

    const form = useForm<OtpFormValues>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: "",
        },
    })


    const onSubmit = (data: OtpFormValues) => {
        if(!value){
            toast.error("Your email verification session has expired. Please try again.");
            return;
        }

        onVerifyOtp({ json: { userId: value, otp: data.otp } });
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
                            <h1 className="text-xl font-bold">Verify</h1>
                            <FieldDescription>
                                Your code was sent to you via email
                            </FieldDescription>
                        </div>
                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-center ">
                                    <FormControl >
                                        <InputOTP maxLength={6} className="w-full " {...field}>
                                            <InputOTPGroup className="grid grid-cols-6 gap-2 w-full ">
                                                <InputOTPSlot className="w-full h-14 border rounded-sm" index={0} />
                                                <InputOTPSlot className="w-full h-14 border rounded-sm" index={1} />
                                                <InputOTPSlot className="w-full h-14 border rounded-sm" index={2} />
                                                <InputOTPSlot className="w-full h-14 border rounded-sm" index={3} />
                                                <InputOTPSlot className="w-full h-14 border rounded-sm" index={4} />
                                                <InputOTPSlot className="w-full h-14 border rounded-sm" index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormItem>
                            <FieldDescription className="text-right">
                                {canResend ? (
                                    <>Didn&apos;t receive the code?{" "}
                                    <button type="button" disabled = {isResending} onClick={handleResend} className="underline underline-offset-4">Resend</button></>
                                ) : (
                                    <>Resend code in <span className="font-medium">{String(Math.floor(timer / 60)).padStart(2, "0")}:{String(timer % 60).padStart(2, "0")}</span></>
                                )}
                            </FieldDescription>
                            <Button disabled={isPending} type="submit" className="w-full">
                                {isPending ? <>
                                    <Spinner />
                                    Verifying...
                                </> : "Verify"}
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
                By clicking verify, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </section>
    )
}
