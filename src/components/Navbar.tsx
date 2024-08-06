"use client"

import { useState } from "react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

import { buttonVariants } from "@/components/ui/button"

import { GitHubLogoIcon } from "@radix-ui/react-icons";

interface RouteProps {
    href: string;
    label: string;
}

const routeList: RouteProps[] = [
    {
        href: "/",
        label: "Home",
    },
    {
        href: "/search",
        label: "Search Companies",
    },
    // {
    //     href: "/disclaimer",
    //     label: "Disclaimer"
    // },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <header className="sticky border-b-[1px] top-0 z-40 w-ful">
            <NavigationMenu className="mx-auto">
                <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between">
                    <NavigationMenuItem className="font-bold flex">
                        <a
                            rel="noreferrer noopener"
                            href="/"
                            className="ml-2 font-bold text-xl flex"
                        >
                            {/*NEED TO ADD LOGO*/}
                            Equitalytics

                        </a>
                    </NavigationMenuItem>

                    {/* mobile */}
                    
                    {/* desktop */}
                    <nav className="hidden md:flex gap-2">
                        {routeList.map((route: RouteProps, i) => (
                            <a
                                rel="noreferrer noopener"
                                href={route.href}
                                key={i}
                                className={`text-[17px] ${buttonVariants({
                                    variant: "ghost"
                                })}`}
                            >
                                {route.label}
                            </a>
                        ))}
                        <a
                            rel="noreferrer noopener"
                            href="https://github.com/mattrmcg/equitalytics-frontend.git"
                            target="_blank"
                            className={`${buttonVariants({ variant: "ghost" })}`}
                        >
                            <GitHubLogoIcon className="w-5 h-5" />

                        </a>
                    </nav>

                </NavigationMenuList>
            </NavigationMenu>

        </header>
    );
};