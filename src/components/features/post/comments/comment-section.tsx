import { FileText } from "lucide-react";
import { useState } from "react";
import CommentList from "./comment-list";
import { useCommentQuery } from "@/hooks/tanstacks/queries/use-comment-query";

type CommentSectionProps = {
    postId: string;
};

export const MOCK_COMMENT_LIST = Array.from({ length: 3 }, (_, index) => ({
    id: crypto.randomUUID(),
    content: `Bình luận số ${index + 1}`,
    replyCounts: Math.floor(Math.random() * 10),
    level: 0,
}));

export type CommentType = typeof MOCK_COMMENT_LIST[number];

export const fakeFetchingRepliesCommentList = (commentId: string, fetchingCommentNumber: number) => {
    const comment = MOCK_COMMENT_LIST.find(c => c.id === commentId);
    if (!comment) {
        return Promise.resolve([]);
    }
    return new Promise<CommentType[]>(resolve => {
        setTimeout(() => {
            resolve(Array.from({ length: fetchingCommentNumber }, (_, index) => {
                const res = {
                    id: crypto.randomUUID(),
                    content: `Phản hồi ${index + 1} cho bình luận ${commentId}`,
                    replyCounts: Math.floor(Math.random() * 10),
                    level: comment.level + 1,
                }
                MOCK_COMMENT_LIST.push(res);
                return res;
            }));
        }, 0);
    }
    )
};

function CommentSection({ postId }: CommentSectionProps) {
    const [comments, setComments] = useState(MOCK_COMMENT_LIST);

    const {
        data,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isFirstFetching,
    } = useCommentQuery({ postId });

    if (comments.length === 0) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center gap-5 p-6 mb-2">
                <FileText className="size-28" />
                <div className="w-full max-w-125 flex flex-col items-center">
                    <h3 className="text-xl font-semibold">Chưa có bình luận nào</h3>
                    <span className="text-gray-500 text-center text-lg">Hãy là người đầu tiên bình luận.</span>
                </div>
            </div>
        )
    }

    const commentList = data?.pages.flatMap(page => page.payload) ?? [];
    console.log("commentList", commentList)
    return (
        <div className="w-full h-full">
            <CommentList commentList={commentList} />
        </div>
    )
}

export default CommentSection;
