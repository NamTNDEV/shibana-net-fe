'use client'
import PostItem from "./post-item"
import { usePostNewsfeedQuery } from "@/queries/use-post-query";
import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { HttpError } from "@/lib/http-errors";
import { ROUTES } from "@/constants/routes";
import PostItemSkeleton from "./post-item/post-item-skeleton";

export default function PostList() {
    const router = useRouter();
    const observerRef = useRef<IntersectionObserver | null>(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error
    } = usePostNewsfeedQuery();

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

    const lastPostElementAppearedCallback = useCallback((node: HTMLDivElement | null) => {
        if (isFetchingNextPage || !hasNextPage) return;
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                fetchNextPage();
            }
        }, { threshold: .5 });
        if (node) observerRef.current.observe(node);
    }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

    if (isLoading) return (
        <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, index) => <PostItemSkeleton key={index} />)}
        </div>
    )

    const posts = data?.pages.flatMap(page => page.payload) || [];

    if (!posts || posts.length === 0) return <p className="text-center text-gray-500 mt-10">Không có bài viết nào.</p>;
    return (
        <div className="flex flex-col gap-4">
            {posts.map(post => <PostItem key={post.id} post={post} displayMode="NEWSFEED" />)}

            <div ref={lastPostElementAppearedCallback} className="flex flex-col gap-4">
                {isFetchingNextPage && Array.from({ length: 3 }).map((_, index) => <PostItemSkeleton key={index} />)}
                {!hasNextPage && <p className="text-gray-500 text-sm pb-4 text-center">Bạn đã xem hết bài viết.</p>}
            </div>
        </div>
    )
}