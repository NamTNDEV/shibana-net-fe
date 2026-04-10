'use client'
import { PostResponseDataType } from "@/types/post.type"
import PostItem from "./post-item"
import { usePostNewsfeedQuery } from "@/queries/use-post-query";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { HttpError } from "@/lib/http-errors";
import { ROUTES } from "@/constants/routes";
import PostItemSkeleton from "./post-item/post-item-skeleton";
import { postService } from "@/services/post.service";
import { API_ROUTES, NEXT_SERVER_ROUTES } from "@/constants/api-route";
import { PaginationResponseDataType } from "@/types/response.type";

const PAGE_SIZE = 5;

export default function PostList() {
    const router = useRouter();
    const [posts, setPosts] = useState<PostResponseDataType[]>([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasNext, setHasNext] = useState(true);

    const observerTarget = useRef<HTMLDivElement | null>(null);

    const isLoadingRef = useRef(isLoading);
    const hasNextRef = useRef(hasNext);

    // 2. Luôn giữ cho đồ đạc trong hộp là mới nhất (bằng cách đồng bộ với state)
    useEffect(() => {
        isLoadingRef.current = isLoading;
        hasNextRef.current = hasNext;
    }, [isLoading, hasNext]);

    useEffect(() => {
        const controller = new AbortController();
        const fetchPosts = async () => {
            if (!hasNext) return;
            setIsLoading(true);
            try {
                const res = await fetch(NEXT_SERVER_ROUTES.POSTS.GET_NEWSFEED.replace(":page", page.toString()).replace(":size", PAGE_SIZE.toString()), {
                    signal: controller.signal
                });
                if (!res.ok) throw new HttpError({
                    status: res.status,
                    payload: {
                        code: res.status,
                        message: res.statusText
                    }
                });
                const data = await res.json();
                const newPosts = data.data as PaginationResponseDataType<PostResponseDataType[]>;
                if (newPosts.payload.length === 0) {
                    setHasNext(false);
                } else {
                    setPosts(prevPosts => [...prevPosts, ...newPosts.payload]);
                }
            } catch (error) {
                if ((error as any).name === "AbortError") {
                    console.error("🔥 Đã hủy gọi API thành công do User chuyển trang!");
                    return;
                };
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
            } finally {
                setIsLoading(false);
            }
        }

        fetchPosts();

        return () => {
            controller.abort();
        }
    }, [page])

    useEffect(() => {
        const target = observerTarget.current;
        if (!target) return;
        const observer = new IntersectionObserver((entries) => {
            const firstEntry = entries[0];
            if (firstEntry.isIntersecting && !isLoadingRef.current && hasNextRef.current) {
                setPage(prevPage => prevPage + 1);
            }
        }, {
            threshold: .5
        });

        observer.observe(target);

        return () => {
            observer.unobserve(target);
        }
    }, [])

    // const { data: paginationData, isLoading, isError, error } = usePostNewsfeedQuery();

    // useEffect(() => {
    //     if (!isError && !error) return;

    //     if (error instanceof HttpError) {
    //         toast.error(error.payload.message, {
    //             position: "bottom-right",
    //             richColors: true,
    //             duration: 2000
    //         });

    //         if (error.payload.code === 401) router.push(ROUTES.AUTH.LOGIN);
    //     } else {
    //         toast.error("Lỗi hệ thống, vui lòng thử lại sau.", {
    //             position: "bottom-right",
    //             richColors: true,
    //             duration: 2000
    //         });
    //     }
    // }, [isError, error, router])

    // if (isLoading) return (
    //     <div className="flex flex-col gap-4">
    //         <PostItemSkeleton />
    //         <PostItemSkeleton />
    //         <PostItemSkeleton />
    //     </div>
    // )

    // if (!paginationData?.payload || paginationData.payload.length === 0) return "Không có bài viết nào";

    return (
        <div className="flex flex-col gap-4">
            {posts.map(post => <PostItem key={post.id} post={post} displayMode="NEWSFEED" />)}

            <div ref={observerTarget} className="flex flex-col gap-4">
                {isLoading && <>
                    <PostItemSkeleton />
                    <PostItemSkeleton />
                    <PostItemSkeleton />
                    <PostItemSkeleton />
                    <PostItemSkeleton />
                </>}
                {!hasNext && <p className="text-gray-500 text-sm pb-4 text-center">Bạn đã xem hết bài viết.</p>}
            </div>
        </div>
    )
}
