'use client';

import { useAuthStore } from "@/stores/auth.store";
import { Fragment } from "react/jsx-runtime";
import CommentItem from "./comment-item";
import { cn } from "@/lib/utils";
import { CommentResponseDataType } from "@/types/post.type";

type CommentListPropsType = {
    commentList: CommentResponseDataType[];
    siblingCommentCount?: number;
    lastSiblingItemRef?: React.RefObject<HTMLDivElement | null>;
};


function CommentList({ commentList, siblingCommentCount }: CommentListPropsType) {
    const { authUser } = useAuthStore();
    const isAncestorCmtList = commentList.some(c => c.level === 0);
    if (!authUser) return null;
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
                            author={authUser}
                            isLastSibling={siblingCommentCount === index + 1}
                        />
                    </Fragment>
                )
            })}
        </div>
    )
}

export default CommentList;