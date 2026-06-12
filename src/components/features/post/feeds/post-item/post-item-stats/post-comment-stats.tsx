'use client';

import { ROUTES } from "@/constants/routes";
import { usePostStatsStore } from "@/stores/post-stats.store";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type PostCommentStatsProps = {
    postId: string;
    commentCount: number;
    displayMode: "NEWSFEED" | "MODAL_DETAIL";
}

function PostCommentStats({ postId, commentCount: initialCount, displayMode }: PostCommentStatsProps) {
    const router = useRouter();
    const initCommentCount = usePostStatsStore(state => state.initCommentCount);
    const currentCount = usePostStatsStore(state => state.commentCounts[postId]);

    useEffect(() => {
        initCommentCount(postId, initialCount);
    }, [postId, initialCount, initCommentCount]);

    const handleCommentButtonClick = () => {
        if (displayMode === "NEWSFEED") {
            router.push(ROUTES.POST.DETAIL.replace(":postId", postId), { scroll: false });
        } else if (displayMode === "MODAL_DETAIL") {

        }
    }
    const displayCount = currentCount !== undefined ? currentCount : initialCount;
    return (
        <div className="flex items-center gap-2 h-full px-3 hover:bg-muted cursor-pointer" onClick={handleCommentButtonClick}>
            <MessageCircle className="size-5" />
            {displayCount ? displayCount : ""}
        </div>
    )
}

export default PostCommentStats;
