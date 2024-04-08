/* eslint-disable react/jsx-key */
"use client";
import React, { useEffect, useRef, useState } from "react";

import { NAV_ITEMS } from "./config/navListitems";
import { useOnClickOutside } from "./config/use-click-outside";
import NavItem from "./NavbarItem";

const NavItems = () => {
    const [activeIndex, setActiveIndex] = useState<null | number>(null);
    const isAnyOpen = activeIndex !== null;
    const navRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setActiveIndex(null);
            }
        };

        document.addEventListener("keydown", handler);

        return () => {
            document.removeEventListener("keydown", handler);
        };
    }, []);

    useOnClickOutside(navRef, () => setActiveIndex(null));

    return (
        <div className="flex gap-4 h-full" ref={navRef}>

            {NAV_ITEMS.map((nav, i) => {
                const handleOpen = () => {
                    if (activeIndex === i) {
                        setActiveIndex(null);
                    } else {
                        setActiveIndex(i);
                    }
                };
                const close = () => setActiveIndex(null)
                const isOpen = i === activeIndex;

                return (
                    <NavItem
                        nav={nav}
                        close={close}
                        key={nav.value}
                        handleOpen={handleOpen}
                        isOpen={isOpen}
                        isAnyOpen={isAnyOpen}

                    />
                );
            })}
        </div>
    );
};

export default NavItems;