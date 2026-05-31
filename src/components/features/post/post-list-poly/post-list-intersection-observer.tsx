'use client'
import { useCallback, useEffect, useRef, useState } from "react";
import PostItem from "../post-item"
import { PostResponseDataType } from "@/types/post.type"
import { NEXT_SERVER_ROUTES } from "@/constants/api-route";
import { CursorPaginationResponseDataType } from "@/types/response.type";
import PostItemSkeleton from "../post-item-skeleton";

const FETCHING_SIZE = 10

export default function PostListIntersectionObserver() {
    const [hasNext, setHasNext] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [posts, setPosts] = useState<PostResponseDataType[]>([])

    const isFetchingRef = useRef<boolean>(false)
    const cursorRef = useRef<string | null>(null)

    const bottomRef = useRef<HTMLDivElement | null>(null)

    const fetchPosts = useCallback(async () => {
        console.log("❤️‍🔥⚡🚀 Attempting to fetch posts...")
        if (isFetchingRef.current || !hasNext) return;

        isFetchingRef.current = true
        setIsLoading(true)
        try {
            const url = NEXT_SERVER_ROUTES.POSTS.GET_NEWSFEED_CURSOR_BASED
                .replace(":size", FETCHING_SIZE.toString())
                .replace(":cursor", cursorRef.current ?? "")
            const res = await fetch(url)
            const data = (await res.json()).data as CursorPaginationResponseDataType<PostResponseDataType[]>

            setPosts(prev => [...prev, ...data.payload])
            cursorRef.current = data.nextCursor
            setHasNext(data.hasNext)
        } catch (error) {
            console.error("🚨 Error fetching posts ~ ", error)
        } finally {
            setIsLoading(false)
            isFetchingRef.current = false
        }
    }, [hasNext])

    useEffect(() => {
        if (posts.length === 0) {
            fetchPosts()
        }
    }, [fetchPosts, posts.length])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                console.log("🕵 Fetching more posts...")
                fetchPosts()
            }
        })

        if (bottomRef.current) {
            observer.observe(bottomRef.current)
        }

        return () => {
            if (bottomRef.current) {
                observer.unobserve(bottomRef.current)
            }
        }

    }, [fetchPosts])

    return (
        <div className="flex flex-col gap-4">
            {posts.map(post => <PostItem key={post.id} post={post} displayMode="NEWSFEED" />)}

            {isLoading && Array.from({ length: 3 }).map((_, index) => <PostItemSkeleton key={index} />)}

            {hasNext && (
                <div ref={bottomRef} className="h-10 bg-red-100 flex items-center justify-center">
                    <span className="text-red-500 font-bold">--- Tấm thảm chùi chân (Observer Target) ---</span>
                </div>
            )}

            {!hasNext && <p className="text-gray-500 text-sm pb-4 text-center">Bạn đã xem hết bài viết.</p>}
        </div>
    )
}