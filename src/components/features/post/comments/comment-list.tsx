'use client';

import { useAuthStore } from "@/stores/auth.store";
import { Fragment } from "react/jsx-runtime";
import CommentItem from "./comment-item";
import { CommentType } from "./comment-section";
import { cn } from "@/lib/utils";

type CommentListPropsType = {
    commentList: CommentType[];
    siblingCommentCount?: number;
    lastSiblingItemRef?: React.RefObject<HTMLDivElement | null>;
};


function CommentList({ commentList, siblingCommentCount, lastSiblingItemRef }: CommentListPropsType) {
    const { authUser } = useAuthStore();
    const isAncestorCmtList = commentList.some(c => c.level === 0);
    if (!authUser) return null;
    console.log("Rendering comment list with sibling count: ", siblingCommentCount);
    console.log("Comment list length: ", commentList.length);
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
                            lastSiblingItemRef={lastSiblingItemRef}
                        />
                    </Fragment>
                )
            })}
        </div>
    )
}

export default CommentList;