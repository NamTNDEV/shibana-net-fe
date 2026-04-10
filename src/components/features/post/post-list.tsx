'use client'
import { PostResponseDataType } from "@/types/post.type"
import PostItem from "./post-item"
import { usePostNewsfeedQuery } from "@/queries/use-post-query";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { HttpError } from "@/lib/http-errors";
import { ROUTES } from "@/constants/routes";
import PostItemSkeleton from "./post-item/post-item-skeleton";

const DEFAULT_PAGE = 0;
const PAGE_SIZE = 5;

export default function PostList() {
    const router = useRouter();
    const { data: paginationData, isLoading, isError, error } = usePostNewsfeedQuery();

    useEffect(() => {
        if (!isError && !error) return;

        if (error instanceof HttpError) {
            toast.error(error.payload.message, {
                position: "bottom-right",
                richColors: true,
                duration: 2000
            });

            if (error.payload.code === 401) router.push(ROUTES.AUTH.LOGIN);
        } else {
            toast.error("Lỗi hệ thống, vui lòng thử lại sau.", {
                position: "bottom-right",
                richColors: true,
                duration: 2000
            });
        }
    }, [isError, error, router])

    if (isLoading) return (
        <div className="flex flex-col gap-4">
            <PostItemSkeleton />
            <PostItemSkeleton />
            <PostItemSkeleton />
        </div>
    )

    if (!paginationData?.payload || paginationData.payload.length === 0) return "Không có bài viết nào";
    console.log("Post 1:: ", paginationData.payload[0]);
    return (
        <div className="flex flex-col gap-4">
            {paginationData?.payload.map(post => <PostItem key={post.id} post={post} displayMode="NEWSFEED" />)}
        </div>
    )
}
