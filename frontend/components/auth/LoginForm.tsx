'use client'
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import CardWrapper from "./Cardwrapper"
import Link from "next/link"
import { FormError } from "./formErrors"
import { FormSuccess } from "./formSuccess"
import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "../zodSchema"
import { z } from "zod"
import { useRouter, useSearchParams } from "next/navigation"
const APP_BACKEND_URL = "http://localhost:5000/api"
const LoginForm = () => {
    const params = useSearchParams();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter()
    const urlError =
        params?.get("error") === "OAuthAccountNotLinked"
            ? "Email already used by different providers!"
            : "";
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        console.log(values)
        try {
            const response = await fetch(`${APP_BACKEND_URL}/account/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            if (!response.ok) {
                throw new Error('Failed to Login ');
            }
            const data = await response.json();
            console.log('Data submitted successfully:', data);

            setSuccess('Login  successfully');
            if (response.ok) {
                router.push('/dashboard')

            }
        } catch (error: any) {


            console.error('Error submitting data:', error.message);
            setError('Failed to submit data');

        }

    };
    return (
        <CardWrapper
            headerLabel="Welcome Back"
            backButtonLabel="Don't have an a account?"
            blackButtonHref="/auth/register"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">

                        <>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Enter your email address"
                                                {...field}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}></FormField>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter your Password"
                                                {...field}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <Button
                                            size="sm"
                                            variant="link"
                                            asChild
                                            className="px-0 font-normal">
                                            <Link href="/auth/reset">Forgot Password</Link>
                                        </Button>
                                        <FormMessage />
                                    </FormItem>
                                )}></FormField>
                        </>

                    </div>

                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button
                        variant="bluebtn"
                        disabled={isPending}
                        type="submit"
                        className="w-full">
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default LoginForm