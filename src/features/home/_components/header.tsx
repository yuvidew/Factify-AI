"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AvatarBtn } from "./avatar-btn";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

interface HeaderProps {
    isUserLogin : boolean;
}

export const Header = ({ isUserLogin }: HeaderProps) => {
    const navigate = useRouter();
    return (
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl ">
            <nav className="flex items-center justify-between gap-8 px-6 py-3 bg-background/80 backdrop-blur-md border border-border/50 rounded-full shadow-lg w-full">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <svg
                        className="w-6 h-6 text-foreground"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 2a10 10 0 0 1 0 20" />
                        <path d="M12 2a10 10 0 0 0 0 20" />
                        <path d="M2 12h20" />
                    </svg>
                    <span className="font-semibold text-foreground">Factify AI</span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-3">
                    <AnimatedThemeToggler/>
                    {/* if user is not login */}
                    {!isUserLogin ? (
                        <Button  onClick={() => navigate.push("/sign-in")} >
                            Sign in
                        </Button>
                    ) : (
                        <AvatarBtn/>
                    )}
                </div>
            </nav>
        </header>
    );
};
