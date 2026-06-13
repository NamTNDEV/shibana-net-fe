import ProfileAvatarContainer from "../../profile/header/avatar/profile-avatar-container";
import { cn, formatDate, getInitialName } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import CommentList from "./comment-list";
import { CommentResponseDataType, EditCommentRequestBodyType } from "@/types/post.type";
import CommentActions from "./comment-actions";
import CommentUpdateForm from "./comment-update-form";
import { useAuthStore } from "@/stores/auth.store";
import { useDeleteCommentMutation, useEditCommentMutation } from "@/hooks/tanstacks/mutations/use-comment-mutation";
import { useRepliesCommentQuery } from "@/hooks/tanstacks/queries/use-comment-query";
import { LoaderCircle } from "lucide-react";
import CommentInput from "./comment-input";
import { usePostStatsStore } from "@/stores/post-stats.store";

type CommentItemProps = {
    comment: CommentResponseDataType;
    isLastSibling?: boolean;
};

const calculateSiblingCommentCount = (commentReplyCount: number, fetchedReplies: CommentResponseDataType[]) => {
    const childFetchedReplyCount = fetchedReplies.reduce((acc, reply) => acc + reply.replyCount, 0);
    return Math.max(0, commentReplyCount - childFetchedReplyCount);
}

const calculateUnfetchedReplyCounts = (commentReplyCount: number, fetchedReplies: CommentResponseDataType[]) => {
    const fetchedReplyCount = fetchedReplies.length;
    const childFetchedReplyCount = fetchedReplies.reduce((acc, reply) => acc + reply.replyCount, 0);
    return Math.max(0, commentReplyCount - fetchedReplyCount - childFetchedReplyCount);
}

const makeFinalDisplayReplies = (deduplicatedFetchedReplies: CommentResponseDataType[], localNewReplies: CommentResponseDataType[]) => {
    return [...deduplicatedFetchedReplies, ...localNewReplies];
}

function CommentItem({ comment, isLastSibling }: CommentItemProps) {
    const { adjustCommentCount } = usePostStatsStore()
    const { authUser } = useAuthStore();

    const [xHeight, setXHeight] = useState(0);
    const [inputHeight, setInputHeight] = useState(0);

    const [nodeRef, setNodeRef] = useState<HTMLDivElement | null>(null);
    const [replyInputNodeRef, setReplyInputNodeRef] = useState<HTMLDivElement | null>(null);

    const [isEditingMode, setIsEditingMode] = useState(false);
    const [isReplyingMode, setIsReplyingMode] = useState(false);

    const [localNewReplies, setLocalNewReplies] = useState<CommentResponseDataType[]>([]);

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

    const fetchedReplies = data?.pages.flatMap(page => page.payload) ?? [];
    const localReplyIdsSet = new Set(localNewReplies.map(reply => reply.id));
    const deduplicatedFetchedReplies = fetchedReplies.filter((reply) => !localReplyIdsSet.has(reply.id));
    const finalDisplayReplies = makeFinalDisplayReplies(deduplicatedFetchedReplies, localNewReplies);
    const unfetchedReplyCounts = calculateUnfetchedReplyCounts(comment.replyCount, fetchedReplies);

    const handleClickViewReplies = async () => {
        if (!isFetchingNextPage) {
            fetchNextPage();
        }
    }

    useEffect(() => {
        if (!nodeRef) return;

        const observer = new ResizeObserver(() => {
            setXHeight(nodeRef.offsetHeight - 18);
        });

        observer.observe(nodeRef);

        return () => observer.disconnect(); // ✅ Cleanup đúng cách
    }, [nodeRef]);

    useEffect(() => {
        if (!replyInputNodeRef) return;

        const observer = new ResizeObserver(() => {
            setInputHeight(replyInputNodeRef.offsetHeight - 44);
        });

        observer.observe(replyInputNodeRef);

        return () => observer.disconnect(); // ✅ Cleanup đúng cách
    }, [replyInputNodeRef]);

    const lastReplyCallbackRef = useCallback((node: HTMLDivElement | null) => {
        if (isLastSibling || isReplyingMode) setNodeRef(node);
    }, [isLastSibling, isReplyingMode]);

    const replyInputCallbackRef = useCallback((node: HTMLDivElement | null) => {
        if (isReplyingMode) setReplyInputNodeRef(node);
    }, [isReplyingMode]);

    const targetQueryKey = comment.level === 0
        ? ["comments", "list", "cursor-based", comment.postId]
        : ["comments", "replies", "cursor-based", comment.parentId];

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
    } = useEditCommentMutation({ onEditSuccess: handleEditingSuccess, targetQueryKey });


    const handleEditingSubmit = (e: React.FormEvent, newContent: string) => {
        e.preventDefault();
        const body: EditCommentRequestBodyType = {
            newContent: newContent.trim(),
        }
        editCommentMutate({ commentId: comment.id, postId: comment.postId, body });
    };
    // ---- o0o -----

    /**
         * Delete Comment's content:
         */
    const handleDeleteSuccess = (deletedCommentId: string) => {
        setLocalNewReplies(prev => prev.filter(c => c.id !== deletedCommentId));
        const estimatedDeletedCount = 1 + fetchedReplies.length;
        adjustCommentCount(comment.postId, -estimatedDeletedCount);
    }

    const {
        mutate: deleteCommentMutate,
        isPending: isDeletingComment,
    } = useDeleteCommentMutation({ onDeleteSuccess: handleDeleteSuccess, targetQueryKey });


    const handleDeleteSubmit = () => {
        deleteCommentMutate({ commentId: comment.id });
    };

    const handleReplyCreatedSuccessfully = (newReply: CommentResponseDataType) => {
        setIsReplyingMode(false);
        setLocalNewReplies((prevReplies) => [...prevReplies, newReply]);
    }
    // ---- o0o -----

    return (
        <div className="flex items-stretch gap-1.5 mr-4" ref={(isLastSibling || isReplyingMode) ? lastReplyCallbackRef : null}>
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

                {finalDisplayReplies.length > 0 && unfetchedReplyCounts === 0 && (
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
                                    onDeleteProcess={handleDeleteSubmit}
                                />
                            </div>
                            {!isEditingComment ?
                                (<div className="flex items-center gap-4 ml-1 text-[12px] text-gray-500 font-semibold">
                                    <span>{formatDate(comment.createdAt)}</span>
                                    <span>Thích</span>
                                    <span
                                        className="cursor-pointer hover:underline"
                                        onClick={() => {
                                            setIsReplyingMode(true)
                                        }}
                                    >
                                        Trả lời
                                    </span>
                                    {comment.isEdited && (
                                        <span
                                            className="cursor-pointer hover:underline"
                                        >
                                            Đã chỉnh sửa
                                        </span>
                                    )}
                                </div>) :
                                (<div className="flex items-center gap-4 ml-1 text-[12px] text-gray-500 font-semibold">
                                    <span>Đang cập nhật...</span>
                                </div>)
                            }
                        </>
                    )
                }
                {
                    finalDisplayReplies.length > 0 && (
                        <CommentList
                            commentList={finalDisplayReplies}
                            siblingCommentCount={calculateSiblingCommentCount(comment.replyCount + localReplyIdsSet.size, finalDisplayReplies)}
                        />
                    )
                }

                {
                    unfetchedReplyCounts > 0 && (
                        <div
                            className={cn(
                                "ml-1.5 h-8 flex items-center cursor-pointer relative gap-1",
                                isReplyingMode ? "relative" : ""
                            )}
                            onClick={handleClickViewReplies}
                        >
                            {isReplyingMode && (
                                <div className="absolute w-5.5 h-5 -left-7.5 -top-1 border-l-2 border-b-2 rounded-bl-xl border-gray-200 z-10" />
                            )}
                            <span className="text-sm font-semibold text-gray-500">Xem {unfetchedReplyCounts} phản hồi khác</span>
                            {
                                isFetchingNextPage && <LoaderCircle className="animate-spin size-4 text-gray-500" />
                            }
                        </div>
                    )
                }

                {isReplyingMode && (
                    <div className="relative flex items-start gap-1.5 mt-2 mb-1" ref={replyInputCallbackRef}>
                        {xHeight > 0 && (
                            <div
                                className="absolute w-5.5 -left-6 border-l-2 border-gray-200 z-20"
                                style={{
                                    height: xHeight - inputHeight - 70,
                                    top: -xHeight + inputHeight + 68
                                }}
                            />
                        )}
                        <div className="absolute w-5.5 h-5 -left-6 -top-1 border-l-2 border-b-2 rounded-bl-xl border-gray-200 z-10" />
                        <CommentInput
                            postId={comment.postId}
                            replyTargetId={comment.id}
                            type="reply"
                            onReplyCreatedSuccessfully={handleReplyCreatedSuccessfully}
                        />
                        <div
                            className="absolute w-6.5 bottom-2.5 -left-6 rounded-bl-xl border-l-2 border-b-2 border-white z-0"
                            style={{ height: 72 }}
                        />
                        <div
                            className="absolute w-6 -left-6 rounded-bl-xl border-l-2 border-b-2 border-white z-0"
                            style={{ height: inputHeight }}
                        />
                    </div>
                )}

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
        </div >
    )
}

export default CommentItem;
