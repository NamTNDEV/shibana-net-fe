'use client';

import { ROUTES } from "@/constants/routes";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";

export type PostActionsProps = {
    postId: string;
    commentCount: number;
}

export default function PostActions({ postId, commentCount }: PostActionsProps) {
    const router = useRouter();

    const handleCommentButtonClick = () => {
        router.push(ROUTES.POST.DETAIL.replace(":postId", postId), { scroll: false });
    }

    return (
        <div className="h-11 flex items-center">
            <div className="flex items-center gap-2 h-full px-3 rounded-bl-lg hover:bg-muted cursor-pointer">
                <ThumbsUp className="size-5" />
                {commentCount ? commentCount : ""}
            </div>
            <div className="flex items-center gap-2 h-full px-3 hover:bg-muted cursor-pointer" onClick={handleCommentButtonClick}>
                <MessageCircle className="size-5" />
                {commentCount ? commentCount : ""}
            </div>
        </div>
    )
}