'use client'

import { useCallback, useRef } from "react"
import PostItem from "../post-item"
import { Button } from "@/components/ui/button"
import { usePostNewsfeedCursorBasedQuery } from "@/hooks/tanstacks/queries/use-post-query"
import PostItemSkeleton from "../post-item-skeleton"

export default function PostListTanstackQuery() {
    const intersectionObserverRef = useRef<IntersectionObserver | null>(null)
    const {
        data,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isFirstFetching,
    } = usePostNewsfeedCursorBasedQuery()

    const lastPostElementAppearedCallback = useCallback((node: HTMLDivElement | null) => {
        if (intersectionObserverRef.current) intersectionObserverRef.current.disconnect();
        if (!node) return;

        intersectionObserverRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage && !isError) {
                fetchNextPage();
            }
        }, { threshold: .5 });

        intersectionObserverRef.current.observe(node)
    }, [fetchNextPage, hasNextPage, isFetchingNextPage, isError])

    const posts = data?.pages.flatMap(page => page.payload) ?? []

    if (isFirstFetching) return (
        <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, index) => <PostItemSkeleton key={index} />)}
        </div>
    )

    return (
        <div className="flex flex-col gap-4">
            {posts.map(post => <PostItem key={post.id} post={post} displayMode="NEWSFEED" />)}

            {isFetchingNextPage && Array.from({ length: 2 }).map((_, index) => <PostItemSkeleton key={index} />)}
            {!hasNextPage && (
                <div className="w-full bg-white rounded-lg shadow-sm flex flex-col p-6">
                    <h2 className="text-gray-600 text-center font-bold text-xl">Không còn bài viết nào</h2>
                    <p className="text-gray-500 text-center">Thêm bạn bè để xem nhiều bài viết hơn trong Bảng feed.</p>
                    <Button onClick={() => alert('Tìm bạn bè')} className="mt-5 self-center">
                        Tìm bạn bè
                    </Button>
                </div>
            )}

            {isError && (
                <div className="w-full bg-white rounded-lg shadow-sm flex flex-col p-6">
                    <h2 className="text-red-600 text-center font-bold text-xl">Lỗi khi tải bài viết</h2>
                    <p className="text-gray-500 text-center">Đã có lỗi xảy ra khi tải bài viết. Vui lòng thử lại.</p>
                    <Button onClick={() => fetchNextPage()} className="mt-5 self-center">
                        Thử lại
                    </Button>
                </div>
            )}

            {!isError && hasNextPage && (
                <div ref={lastPostElementAppearedCallback} />
            )}
        </div>
    )
}