'use client'

import { cn } from "@/lib/utils";
import Link from "next/link";
import { LogoImage } from "@/assets";

type LogoProps = {
    className?: string;
    showText?: boolean;
    fontSize?: string;
    iconSize?: string;
    isLink?: boolean;
}

export default function Logo({
    className,
    showText = true,
    fontSize = "text-2xl",
    iconSize = "size-10",
    isLink = true
}: LogoProps) {
    return (
        isLink ?
            (
                <Link href="/" className={cn("flex items-center gap-2 group", className)}>
                    <LogoImage className={iconSize} />
                    {showText && (<LogoText fontSize={fontSize} />)}
                </Link>
            ) :
            (
                <div className={cn("flex items-center gap-2 group", className)}>
                    <LogoImage className={iconSize} />
                    {showText && (<LogoText fontSize={fontSize} />)}
                </div>
            )
    )
};

const LogoText = ({ fontSize }: { fontSize: string }) => {
    return (
        <span className={cn("font-semibold tracking-tight select-none hidden lg:block", fontSize)}>
            ShibaNa
            <span className="text-primary ml-0.5">Net</span>
        </span>
    );
};
