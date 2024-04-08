import React, { ReactNode } from "react";
import SideNav from "./_Components/SideBar";
import Headers from "./_Components/Headers";
import MarginWidthWrapper from "./_Components/margin-width-wrapper";
import HeaderMobile from "./_Components/header-mobile";
import PageWrapper from "./_Components/page-wrapper";


const ProtectedLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main>
            <div className="flex">
                <SideNav />
            </div>
            <div className="flex-1">
                <MarginWidthWrapper>
                    <Headers />
                    <HeaderMobile />
                    <PageWrapper>{children}</PageWrapper>
                </MarginWidthWrapper>
            </div>
        </main>
    );
};

export default ProtectedLayout;