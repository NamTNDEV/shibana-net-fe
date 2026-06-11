import ProfileAvatarContainer from "../../profile/header/avatar/profile-avatar-container";
import { formatDate, getInitialName } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import CommentList from "./comment-list";
import { CommentResponseDataType, EditCommentRequestBodyType } from "@/types/post.type";
import CommentActions from "./comment-actions";
import CommentUpdateForm from "./comment-update-form";
import { useAuthStore } from "@/stores/auth.store";
import { useEditCommentMutation } from "@/hooks/tanstacks/mutations/use-comment-mutation";
import { useRepliesCommentQuery } from "@/hooks/tanstacks/queries/use-comment-query";


type CommentItemProps = {
    comment: CommentResponseDataType;
    isLastSibling?: boolean;
};

function CommentItem({ comment, isLastSibling }: CommentItemProps) {
    const { authUser } = useAuthStore();

    const [xHeight, setXHeight] = useState(0);
    const [replies, setReplies] = useState<CommentResponseDataType[]>([]);
    const [nodeRef, setNodeRef] = useState<HTMLDivElement | null>(null);
    const [unfetchedReplyCounts, setUnfetchedReplyCounts] = useState(comment.replyCount);

    const [isEditingMode, setIsEditingMode] = useState(false);

    useEffect(() => {
        if (!nodeRef) return;

        const observer = new ResizeObserver(() => {
            setXHeight(nodeRef.offsetHeight - 16);
        });

        observer.observe(nodeRef);

        return () => observer.disconnect(); // ✅ Cleanup đúng cách
    }, [nodeRef]);

    const {
        data,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isFirstFetching,
    } = useRepliesCommentQuery({
        commentId: comment.id,
        isAllowFetch: false,
    })

    const handleClickViewReplies = async () => {
        const res = await fetchNextPage();
        if (res.data && res.data.pages) {
            const newReplies = res.data.pages.flatMap(page => page.payload);
            setReplies((prev) => [...prev, ...newReplies]);
            setUnfetchedReplyCounts(prev => prev - newReplies.length);
        }
    }

    const lastReplyRef = useCallback((node: HTMLDivElement | null) => {
        if (isLastSibling) setNodeRef(node);
    }, [isLastSibling]);


    /**
     * Edit Comment's content:
     */
    const handleEditingSuccess = () => {
        setIsEditingMode(false);
    }

    const handleEditingModeChange = (state: boolean) => {
        setIsEditingMode(state);
    }

    const {
        mutate: editCommentMutate,
        isPending: isEditingComment,
    } = useEditCommentMutation(handleEditingSuccess)


    const handleEditingSubmit = (e: React.FormEvent, newContent: string) => {
        e.preventDefault();
        const body: EditCommentRequestBodyType = {
            newContent: newContent.trim(),
        }
        editCommentMutate({ commentId: comment.id, postId: comment.postId, body });
    };
    // ---- o0o -----

    if (isFirstFetching) return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-5 p-6 mb-2">
            <div className="w-full max-w-125 flex flex-col items-center">
                <h3 className="text-xl font-semibold">Đang tải bình luận...</h3>
            </div>
        </div>
    )

    return (
        <div className="flex items-stretch gap-1.5 mr-4" ref={isLastSibling ? lastReplyRef : null}>
            <div className="relative shrink-0 mt-0.5 flex flex-col gap-1">
                <div>
                    <ProfileAvatarContainer
                        avatar={comment.author.avatarUrl}
                        initialName={getInitialName(comment.author.lastName, comment.author.firstName)}
                        avatarScale={comment.author.avatarScale || 1}
                        avatarPositionX={comment.author.avatarPositionX || 0}
                        avatarPositionY={comment.author.avatarPositionY || 0}
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
                className="relative flex flex-col w-full"
            >
                {
                    isEditingMode ? (
                        (
                            <>
                                <CommentUpdateForm
                                    commentContent={comment.content}
                                    onEditingSubmit={handleEditingSubmit}
                                />

                                <div className="flex items-center gap-1 ml-1 text-[12px] text-gray-500 font-semibold">
                                    <span className="cursor-pointer hover:underline text-blue-500" onClick={() => handleEditingModeChange(false)}>Huỷ</span>
                                    chỉnh sửa
                                </div>
                            </>
                        )
                    ) : (
                        <>
                            <div className="relative flex flex-col flex-1 py-2 px-3 bg-gray-100 rounded-xl w-fit">
                                <span className="font-semibold text-[13px]">{comment.author.firstName} {comment.author.lastName}</span>
                                <div className="text-[15px]">{comment.content}</div>

                                <CommentActions
                                    isOwner={authUser?.userId === comment.author.id}
                                    onEditingModeStart={() => handleEditingModeChange(true)}
                                />
                            </div>
                            <div className="flex items-center gap-4 ml-1 text-[12px] text-gray-500 font-semibold">
                                <span>{formatDate(comment.createdAt)}</span>
                                <span>Thích</span>
                                <span>Trả lời</span>
                            </div>
                        </>
                    )
                }
                {
                    replies.length > 0 && (
                        <CommentList
                            commentList={replies}
                            siblingCommentCount={comment.replyCount}
                        />
                    )
                }

                {
                    unfetchedReplyCounts > 0 && (
                        <div
                            className="ml-1.5 h-8 flex items-center cursor-pointer relative"
                            onClick={handleClickViewReplies}
                        >
                            <span className="text-sm font-semibold text-gray-500">Xem {unfetchedReplyCounts} phản hồi khác</span>
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
            {!isEditingMode && <div className="size-8 shrink-0 h-full" />}
        </div>
    )
}

export default CommentItem;
