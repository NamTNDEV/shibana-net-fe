'use client';

import { useAuthStore } from "@/stores/auth.store";
import { Fragment } from "react/jsx-runtime";
import CommentItem from "./comment-item";
import { cn } from "@/lib/utils";
import { CommentResponseDataType } from "@/types/post.type";
import { FileText } from "lucide-react";

type CommentListPropsType = {
    commentList: CommentResponseDataType[];
    siblingCommentCount?: number;
    lastSiblingItemRef?: React.RefObject<HTMLDivElement | null>;
};


function CommentList({ commentList, siblingCommentCount }: CommentListPropsType) {
    const isAncestorCmtList = commentList.some(c => c.level === 0);

    if (commentList.length === 0) {
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

    return (
        <div
            className={cn(
                "flex flex-col gap-1",
                isAncestorCmtList && "pl-3",
                !isAncestorCmtList && "mt-1",
            )}
        >
            {commentList.map((comment, index) => {
                return (
                    <Fragment key={comment.id}>
                        <CommentItem
                            comment={comment}
                            isLastSibling={siblingCommentCount === index + 1}
                        />
                    </Fragment>
                )
            })}
        </div>
    )
}

export default CommentList;