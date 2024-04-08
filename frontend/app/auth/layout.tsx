import Navbar from '@/components/Navbar'
import React, { ReactNode } from 'react'
import PageWrapper from '../dashboard/_Components/page-wrapper'

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main><Navbar />
            <PageWrapper>{children}</PageWrapper>
        </main>
    )
}

export default AuthLayout