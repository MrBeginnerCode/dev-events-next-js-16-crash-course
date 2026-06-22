"use client";
import React from 'react'
import Link from "next/link";
import Image from "next/image";
import posthog from "posthog-js";

const NavBar = () => {
    const handleNavClick = (label: string, href: string) => {
        posthog.capture("nav_link_clicked", {
            link_label: label,
            link_href: href,
        });
    };

    return (
        <header>
            <nav>
                <Link href = "/" className="logo">
                    <Image src = "/icons/logo.png" alt ="logo" width={24} height={24}/>
                    <p>DevEvent</p>
                </Link>

                <ul>
                    <Link href ="/" onClick={() => handleNavClick("Home", "/")}>Home</Link>
                    <Link href ="/" onClick={() => handleNavClick("Events", "/")}>Events</Link>
                    <Link href ="/" onClick={() => handleNavClick("Create", "/")}>Create</Link>
                </ul>
            </nav>
        </header>
    )
}
export default NavBar
