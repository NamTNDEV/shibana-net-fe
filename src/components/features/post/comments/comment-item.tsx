import { MyAccountMetadataResponseDataType } from "@/types/user.type";
import ProfileAvatarContainer from "../../profile/header/avatar/profile-avatar-container";
import { getInitialName } from "@/lib/utils";
import { CommentType, fakeFetchingRepliesCommentList } from "./comment-section";
import { useCallback, useEffect, useState } from "react";
import CommentList from "./comment-list";

type CommentItemProps = {
    comment: CommentType;
    author: MyAccountMetadataResponseDataType
    isLastSibling?: boolean;
};

const FETCHING_COMMENT_NUMBER = 1;
function CommentItem({ comment, author, isLastSibling }: CommentItemProps) {
    const [xHeight, setXHeight] = useState(0);
    const [replies, setReplies] = useState<CommentType[]>([]);
    const [nodeRef, setNodeRef] = useState<HTMLDivElement | null>(null);
    const [unfetchedReplyCounts, setUnfetchedReplyCounts] = useState(comment.replyCounts);

    useEffect(() => {
        if (!nodeRef) return;

        const observer = new ResizeObserver(() => {
            setXHeight(nodeRef.offsetHeight - 16);
        });

        observer.observe(nodeRef);

        return () => observer.disconnect(); // ✅ Cleanup đúng cách
    }, [nodeRef]);

    const handleClickViewReplies = async () => {
        const replies = await fakeFetchingRepliesCommentList(comment.id, FETCHING_COMMENT_NUMBER);
        setReplies((prev) => [...prev, ...replies]);
        setUnfetchedReplyCounts(prev => prev - replies.length);
    }

    const lastReplyRef = useCallback((node: HTMLDivElement | null) => {
        if (isLastSibling) setNodeRef(node);
    }, [isLastSibling]);

    return (
        <div className="flex items-stretch gap-1.5 mr-6.5" ref={isLastSibling ? lastReplyRef : null}>
            <div className="relative shrink-0 mt-0.5 flex flex-col gap-1">
                <div>
                    <ProfileAvatarContainer
                        avatar={author.avatar}
                        initialName={getInitialName(author?.lastName, author?.firstName)}
                        avatarScale={author?.avatarScale || 1}
                        avatarPositionX={author?.avatarPositionX || 0}
                        avatarPositionY={author?.avatarPositionY || 0}
                        containerSize={32}
                    />
                </div>

                {
                    comment.level > 0 && (
                        <div className="absolute w-[calc(100%-12px)] -left-6 -top-0.5 h-5 border-l-2 border-b-2 rounded-bl-xl z-10" />
                    )
                }

                {unfetchedReplyCounts > 0 && (
                    <div className="absolute w-[calc(100%-6px)] h-[calc(100%-50px)] translate-x-3.5 top-9 border-l-2 border-b-2 border-gray-200 rounded-bl-xl"></div>
                )}

                {replies.length > 0 && unfetchedReplyCounts === 0 && (
                    <div className="absolute w-[calc(100%-8px)] h-[calc(100%-50px)] translate-x-3.5 top-9 border-l-2 border-b-2 border-gray-200 rounded-bl-xl"></div>
                )}
            </div>

            <div
                className="relative flex flex-col"
            >
                <div className="flex flex-col flex-1 py-2 px-3 bg-gray-100 rounded-xl w-fit">
                    <span className="font-semibold text-[13px]">{author?.firstName} {author?.lastName}</span>
                    <div className="text-[15px]">{comment.content}</div>
                </div>

                <div className="flex items-center gap-4 ml-1 text-[12px] text-gray-500 font-semibold">
                    <span>46 phút</span>
                    <span>Thích</span>
                    <span>Trả lời</span>
                </div>

                {
                    replies.length > 0 && (
                        <CommentList
                            commentList={replies}
                            siblingCommentCount={comment.replyCounts}
                        />
                    )
                }

                {
                    unfetchedReplyCounts > 0 && (
                        <div
                            className="ml-1.5 h-8 flex items-center cursor-pointer relative"
                            onClick={handleClickViewReplies}
                        >
                            <span className="text-sm font-semibold text-gray-500">Xem {unfetchedReplyCounts} phản hồi</span>
                        </div>
                    )
                }
                {
                    isLastSibling && xHeight > 0 && (
                        <div
                            className="absolute w-6 bottom-3.5 -left-15.5 rounded-bl-xl border-l-2 border-b-2 border-white z-0"
                            style={{ height: xHeight }}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default CommentItem;
