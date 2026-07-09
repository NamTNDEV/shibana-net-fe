'use client'

import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { ReactionType } from "@/constants/reaction-type";
import { cn } from "@/lib/utils";

import { ReactionLikeIcon, ReactionHeartIcon, ReactionHahaIcon, ReactionWowIcon, ReactionSadIcon, ReactionAngryIcon, LikeButtonIcon } from "@/assets";
import { ThumbsUp } from "lucide-react";

type ReactionVariant = "animated" | "static" | "button-outline" | "button-solid";
type ReactionIconProps = {
    type?: ReactionType;
    variant?: ReactionVariant;
    className?: string;
}

const ANIMATED_REACTION_ICON_PATHS: Record<ReactionType, string> = {
    LIKE: "/animations/reactions/like.json",
    HEART: "/animations/reactions/heart.json",
    HAHA: "/animations/reactions/haha.json",
    WOW: "/animations/reactions/wow.json",
    SAD: "/animations/reactions/sad.json",
    ANGRY: "/animations/reactions/angry.json",
}

function ReactionIcon({ type = "LIKE", variant = "button-outline", className }: ReactionIconProps) {
    const [animationData, setAnimationData] = useState<any>(null);

    useEffect(() => {
        if (variant === "animated") {
            fetch(ANIMATED_REACTION_ICON_PATHS[type])
                .then((response) => response.json())
                .then((data) => setAnimationData(data))
                .catch((error) => console.error("Error loading animation data:", error));
        }
    }, [type, variant]);

    if (variant === "animated") {
        if (!animationData) return <div className={cn("bg-muted animate-pulse rounded-full", className)} />;

        return (
            <div className={cn("pointer-events-none", className)}>
                <Lottie animationData={animationData} loop={true} />
            </div>
        );
    }

    if (variant === "button-outline") {
        switch (type) {
            case "LIKE":
                return <ThumbsUp className={className} />;
        }
    }

    if (variant === "button-solid") {
        switch (type) {
            case "LIKE":
                return <LikeButtonIcon className={cn("fill-blue-600", className)} />;
            case "HEART":
                return <ReactionHeartIcon className={className} />;
            case "HAHA":
                return <ReactionHahaIcon className={className} />;
            case "WOW":
                return <ReactionWowIcon className={className} />;
            case "SAD":
                return <ReactionSadIcon className={className} />;
            case "ANGRY":
                return <ReactionAngryIcon className={className} />;
        }
    }

    if (variant === "static") {
        switch (type) {
            case "LIKE":
                return <ReactionLikeIcon className={className} />;
            case "HEART":
                return <ReactionHeartIcon className={className} />;
            case "HAHA":
                return <ReactionHahaIcon className={className} />;
            case "WOW":
                return <ReactionWowIcon className={className} />;
            case "SAD":
                return <ReactionSadIcon className={className} />;
            case "ANGRY":
                return <ReactionAngryIcon className={className} />;
        }
    }

    return null;
}

export default ReactionIcon;
