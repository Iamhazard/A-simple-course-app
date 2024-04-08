'use client'
import CardWrapper from '@/components/auth/Cardwrapper'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useRouter } from 'next/navigation'
import { Course } from '@/@types/enum'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const APP_BACKEND_URL = "http://localhost:5000/api"

const ViewCourses = () => {
    const router = useRouter()
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        const getCourses = async () => {

            try {
                const response = await fetch(`${APP_BACKEND_URL}/course/getcourses`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                });
                if (!response.ok) {
                    throw new Error('Failed to Login ');
                }
                const data = await response.json();
                setCourses(data)
                console.log('Data submitted successfully:', data);


            } catch (error: any) {


                console.error('Error submitting data:', error.message);
                alert('Failed to submit data');


            }
        }
        getCourses();
    }, [router])


    return (

        <div className='h-full flex items-center justify-center'>
            <CardWrapper
                headerLabel="View  Courses"
                backButtonLabel="create a course?"
                blackButtonHref="/dashboard"
            >
                <div>
                    <Table>
                        <TableCaption>A list of Courses.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Id</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Duration</TableHead>
                                <TableHead className="text-right">Lessons</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {courses.map(course => (
                                <TableRow key={course.id}>
                                    <TableCell className="font-medium">{course.id}</TableCell>
                                    <TableCell>{course.title}</TableCell>
                                    <TableCell>{course.description}</TableCell>
                                    <TableCell className="text-right">{course.duration}</TableCell>
                                    <TableCell className="text-right"><Link href='dashboard/lessons'>{course.lessons}</Link></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </div>
            </CardWrapper>
        </div>
    )
}

export default ViewCourses