"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { RegisterSchema } from "../zodSchema";
import CardWrapper from "./Cardwrapper";
import { FormError } from "./formErrors";
import { FormSuccess } from "./formSuccess";


//const APP_BACKEND_URL = "http://localhost:5000/api"
const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const route = useRouter()

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",

        },
    });

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        console.log(values)

        try {
            const response = await fetch(`${process.env.APP_BACKEND_URL}/account/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

            if (!response.ok) {
                throw new Error('Failed to submit data');
            }

            const data = await response.json();
            console.log('Data submitted successfully:', data);

            if (data.isSuccess) {
                const { token, message } = data;
            }
            setSuccess('Data submitted successfully');

        } catch (error: any) {
            console.error('Error submitting data:', error.message);
            setError('Failed to submit data');
        }

    };
    return (
        <CardWrapper
            headerLabel={`Sign up `}
            backButtonLabel="Already have an account?"
            blackButtonHref="/auth/login"
            showSocial>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
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
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full  px-3 mb-6 md:mb-0">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>  Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="name"
                                                    placeholder="Enter  Name"
                                                    {...field}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}></FormField>
                            </div>

                        </div>

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
                                    <FormMessage />
                                </FormItem>
                            )}></FormField>
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                        variant="bluebtn">
                        Create an Account
                    </Button>
                </form>
                <div className="my-0 border-b border-gray-400  text-center">
                    <div className="leading-none px-2 inline-block text-sm text-gray-700 tracking-wide font-medium bg-white transform translate-y-1/2">
                        Or
                    </div>
                </div>
            </Form>
        </CardWrapper>
    );
};

export default RegisterForm;