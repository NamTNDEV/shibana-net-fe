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
            (<Link href="/" className={cn("flex items-center gap-2 group", className)}>
                <LogoImage className={iconSize} />

                {showText && (
                    <span className={cn("font-semibold tracking-tight select-none", fontSize)}>
                        ShibaNa
                        <span className="text-primary ml-0.5">Net</span>
                    </span>
                )}
            </Link>) :
            (<div className={cn("flex items-center gap-2 group", className)}>
                <LogoImage className={iconSize} />

                {showText && (
                    <span className={cn("font-semibold tracking-tight select-none", fontSize)}>
                        ShibaNa
                        <span className="text-primary ml-0.5">Net</span>
                    </span>
                )}
            </div>)
    )
}
