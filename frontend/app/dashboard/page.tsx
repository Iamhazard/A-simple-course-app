'use client'
import CardWrapper from '@/components/auth/Cardwrapper'
import React from 'react'
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
import Link from "next/link"

import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"


import { z } from "zod"
import { useRouter, useSearchParams } from "next/navigation"
import { CoursesSchema } from '@/components/zodSchema'
import { FormError } from '@/components/auth/formErrors'
import { FormSuccess } from '@/components/auth/formSuccess'
import { Label } from '@/components/ui/label'
const APP_BACKEND_URL = "http://localhost:5000/api"

const Page = () => {
    const params = useSearchParams();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter()
    const urlError =
        params?.get("error") === "OAuthAccountNotLinked"
            ? "Description already used by different providers!"
            : "";
    const form = useForm<z.infer<typeof CoursesSchema>>({
        resolver: zodResolver(CoursesSchema),
        defaultValues: {
            title: "",
            description: "",
            duration: "",
            lessons: ""
        },
    });
    const onSubmit = async (values: z.infer<typeof CoursesSchema>) => {
        setError("");
        setSuccess("");
        console.log(values)
        try {
            const response = await fetch(`${APP_BACKEND_URL}/course/createCourses`, {
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

            setSuccess('course created  successfully');
            if (response.ok) {
                router.push('/dashboard')

            }
        } catch (error: any) {


            console.error('Error submitting data:', error.message);
            setError('Failed to submit data');

        }

    };
    return (
        <div className='h-full flex items-center justify-center'>
            <CardWrapper
                headerLabel="Create a Courses"
                backButtonLabel="View Courses?"
                blackButtonHref="/dashboard/viewCourses"
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">

                            <>
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter your Course Title "
                                                    {...field}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}></FormField>
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter your Course duration "
                                                    {...field}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}></FormField>
                                <FormField
                                    control={form.control}
                                    name="duration"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Duration</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter your description"
                                                    {...field}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}></FormField>

                                <FormField
                                    control={form.control}
                                    name="lessons"
                                    render={({ field }) => (
                                        <FormItem>

                                            <FormControl>
                                                <div className="grid w-full gap-1.5">
                                                    <Label htmlFor="message">Your Lessons</Label>
                                                    <Textarea placeholder="Type your text here." id="message"{...field}
                                                        disabled={isPending} />
                                                </div>
                                                {/* <Input
                                                    type="text"
                                                    placeholder="Enter your description"
                                                    {...field}
                                                    disabled={isPending}
                                                /> */}
                                            </FormControl>
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
                            Save
                        </Button>
                    </form>
                </Form>

            </CardWrapper>
        </div>

    )
}

export default Page