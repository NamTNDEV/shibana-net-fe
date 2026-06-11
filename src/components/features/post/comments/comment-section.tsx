import { useCallback, useRef } from "react";
import CommentList from "./comment-list";
import { useRootCommentQuery } from "@/hooks/tanstacks/queries/use-comment-query";
import CommentListSkeleton from "./skeleton/comment-list-skeleton";

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
    } = useRootCommentQuery({ postId });

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

    if (isFirstFetching) {
        return (
            <CommentListSkeleton />
        )
    }

    return (
        <div className="w-full h-full">
            <CommentList commentList={commentList} />
            {!isError && hasNextPage && (
                <div ref={lastPostElementAppearedCallback} />
            )}

            {isFetchingNextPage && (
                <CommentListSkeleton />
            )}
        </div>
    )
}

export default CommentSection;
