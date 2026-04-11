"use client"

import {  GalleryVerticalEnd } from "lucide-react"
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
import { useVerifyEmail } from "../hooks/use-auth"

const verifyEmailSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>

export const VerifyEmail = () => {
    const {mutate: onVerifyEmail , isPending} = useVerifyEmail();

    const form = useForm<VerifyEmailFormValues>({
        resolver: zodResolver(verifyEmailSchema),
        defaultValues: {
            email: "",
        },
    })


    const onSubmit = (data: VerifyEmailFormValues) => {
        onVerifyEmail({ json: data });
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
                            <h1 className="text-xl font-bold">Verify your email</h1>
                            <FieldDescription>
                                Enter your email address to receive a verification code.
                            </FieldDescription>
                        </div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="m@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormItem>
                            <Button disabled={isPending} type="submit" className="w-full">
                                {isPending ? <>
                                    <Spinner />
                                    Submitting...
                                </> : "Submit"}
                            </Button>
                        </FormItem>
                    </FieldGroup>
                </form>
            </Form>
            <div className="flex flex-col gap-2 text-center text-sm">
                <FieldDescription>
                    Already verified?{" "}
                    <Link href="/sign-in" className="underline underline-offset-4">Sign In</Link>
                </FieldDescription>
            </div>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </section>
    )
}
