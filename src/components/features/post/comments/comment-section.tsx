import { useCallback, useRef } from "react";
import CommentList from "./comment-list";
import { useCommentQuery } from "@/hooks/tanstacks/queries/use-comment-query";

type CommentSectionProps = {
    postId: string;
};

function CommentSection({ postId }: CommentSectionProps) {
    const intersectionObserverRef = useRef<IntersectionObserver | null>(null)
    const {
        data,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isFirstFetching,
    } = useCommentQuery({ postId });

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

    const commentList = data?.pages.flatMap(page => page.payload) ?? [];

    if (isFirstFetching) return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-5 p-6 mb-2">
            <div className="w-full max-w-125 flex flex-col items-center">
                <h3 className="text-xl font-semibold">Đang tải bình luận...</h3>
            </div>
        </div>
    )

    return (
        <div className="w-full h-full">
            <CommentList commentList={commentList} />
            {!isError && hasNextPage && (
                <div ref={lastPostElementAppearedCallback} />
            )}
        </div>
    )
}

export default CommentSection;
