'use client'
import { useCallback, useEffect, useRef, useState } from "react"
import PostItem from "./post-item"
import { PostResponseDataType } from "@/types/post.type"
import { CursorPaginationResponseDataType } from "@/types/response.type";

const FETCHING_SIZE = 5;

export default function PostListWindowScroll() {
    const [posts, setPosts] = useState<PostResponseDataType[]>([])
    const [hasNext, setHasNext] = useState(true)
    const [cursor, setCursor] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false);

    const isFetchingRef = useRef<boolean>(false);

    const fetchPosts = useCallback(async () => {
        console.log("Fetching posts with cursor: ", cursor);
        if (isFetchingRef.current || !hasNext) return;

        isFetchingRef.current = true;
        setIsLoading(true);
        try {
            const fetchingUrl = `/api/posts/newsfeed-cursor?size=${FETCHING_SIZE}${cursor ? `&cursor=${cursor}` : ""}`;
            const res = await fetch(fetchingUrl);
            const data = (await res.json()).data as CursorPaginationResponseDataType<PostResponseDataType[]>;
            setPosts(prev => [...prev, ...data.payload]);
            setHasNext(data.hasNext);
            setCursor(data.nextCursor);
        } catch (error) {
            console.error("🚨 Error fetching posts: ", error);
        } finally {
            isFetchingRef.current = false;
            setIsLoading(false);
        }
    }, [cursor, hasNext])

    useEffect(() => {
        if (posts.length === 0) {
            fetchPosts();
        }
    }, [fetchPosts, posts.length])

    const handleScroll = useCallback(() => {
        if (isFetchingRef.current || !hasNext) return;

        const windowHeight = window.innerHeight;
        const scrollTop = document.documentElement.scrollTop;
        const fullHeight = document.documentElement.offsetHeight;

        if (scrollTop + windowHeight >= fullHeight - 100) {
            fetchPosts();
        }

    }, [hasNext, fetchPosts])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [handleScroll]);

    return (
        <div className="flex flex-col gap-4">
            {posts.map(post => <PostItem key={post.id} post={post} displayMode="NEWSFEED" />)}
            {isLoading && <div className="text-center py-4">Đang tải...</div>}
            {!hasNext && <div className="text-center py-4 text-gray-500">Không còn bài viết nào nữa.</div>}
        </div>
    )
}