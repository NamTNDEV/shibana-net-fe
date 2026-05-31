'use client'
import { useCallback, useEffect, useRef, useState } from "react";
import PostItem from "../post-item"
import { PostResponseDataType } from "@/types/post.type"
import { NEXT_SERVER_ROUTES } from "@/constants/api-route";
import { CursorPaginationResponseDataType } from "@/types/response.type";
import PostItemSkeleton from "../post-item-skeleton";

const FETCHING_SIZE = 10

export default function PostListIntersectionObserverV02() {
    const [hasNext, setHasNext] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [posts, setPosts] = useState<PostResponseDataType[]>([])

    const isFetchingRef = useRef<boolean>(false)
    const cursorRef = useRef<string | null>(null)
    const intersectionObserverRef = useRef<IntersectionObserver | null>(null)

    const abortControllerRef = useRef<AbortController | null>(null)

    const fetchPosts = useCallback(async () => {
        if (isFetchingRef.current || !hasNext) return;

        isFetchingRef.current = true
        setIsLoading(true)

        abortControllerRef.current = new AbortController()
        try {
            const url = NEXT_SERVER_ROUTES.POSTS.GET_NEWSFEED_CURSOR_BASED
                .replace(":size", FETCHING_SIZE.toString())
                .replace(":cursor", cursorRef.current ?? "")
            const res = await fetch(url, { signal: abortControllerRef.current.signal })
            const data = (await res.json()).data as CursorPaginationResponseDataType<PostResponseDataType[]>

            setPosts(prev => [...prev, ...data.payload])
            cursorRef.current = data.nextCursor
            setHasNext(data.hasNext)
        } catch (error: any) {
            if (error.name === "AbortError") {
                console.log("🚫 Fetch aborted");
            } else {
                console.error("🚨 Error fetching posts ~ ", error)
            }
        } finally {
            setIsLoading(false)
            isFetchingRef.current = false
        }
    }, [hasNext])

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                console.log("💀 Rút phích cắm mạng...");
                abortControllerRef.current.abort()
            }
        }
    }, [])

    useEffect(() => {
        if (posts.length === 0) {
            fetchPosts()
        }
    }, [fetchPosts, posts.length])

    const lastPostElementAppearedCallback = useCallback((node: HTMLDivElement | null) => {
        if (intersectionObserverRef.current) intersectionObserverRef.current.disconnect();
        if (!node) return;

        intersectionObserverRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNext) {
                fetchPosts()
            }
        }, { threshold: 0.5 })

        intersectionObserverRef.current.observe(node)
    }, [fetchPosts, hasNext])

    return (
        <div className="flex flex-col gap-4">
            {posts.map(post => <PostItem key={post.id} post={post} displayMode="NEWSFEED" />)}

            {isLoading && Array.from({ length: 5 }).map((_, index) => <PostItemSkeleton key={index} />)}
            {!hasNext && <p className="text-gray-500 text-sm pb-4 text-center">Bạn đã xem hết bài viết.</p>}

            {hasNext && (<div ref={lastPostElementAppearedCallback} />)}
        </div>
    )
}