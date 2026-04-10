'use client';

import { MessageCircle, ThumbsUp } from "lucide-react";

export type PostActionsProps = {
    commentCount: number;
}

export default function PostActions({ commentCount }: PostActionsProps) {
    return (
        <div className="h-11 flex items-center">
            <div className="flex items-center gap-2 h-full px-3 rounded-bl-lg hover:bg-muted cursor-pointer">
                <ThumbsUp className="size-5" />
                {commentCount ? commentCount : ""}
            </div>
            <div className="flex items-center gap-2 h-full px-3 hover:bg-muted cursor-pointer">
                <MessageCircle className="size-5" />
                {commentCount ? commentCount : ""}
            </div>
        </div>
    )
}