'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link, X } from "lucide-react";
import { useRouter } from "next/navigation";
import PostItem from "../feeds/post-item";
import { PostResponseDataType } from "@/types/post.type";

type PostDetailDialogProps = {
    post: PostResponseDataType | null;
}

export default function PostDetailDialog({ post }: PostDetailDialogProps) {
    const router = useRouter();

    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            router.back();
        }
    }

    return (
        <Dialog defaultOpen={true} onOpenChange={handleOpenChange}>
            <DialogContent className="p-0 gap-0 max-w-175! w-full flex flex-col mb-4" showCloseButton={false}>
                <DialogHeader className="h-15 relative flex items-center justify-center rounded-t-lg px-4 shrink-0 border-b border-gray-300">
                    <DialogTitle className="px-4 text-xl font-bold">Bài viết {post ? `của ${post.author.firstName}` : ""} </DialogTitle>
                    <div
                        className="absolute w-9 h-9 flex items-center justify-center bg-secondary rounded-full hover:cursor-pointer hover:opacity-80 top-1/2 -translate-y-1/2 right-4"
                        onClick={() => handleOpenChange(false)}
                    >
                        <X className="size-5" />
                    </div>
                    <DialogDescription className="hidden" />
                </DialogHeader>

                <div className="flex-1 flex items-center justify-center overflow-y-auto">
                    {post ? (
                        <PostItem
                            displayMode="MODAL_DETAIL"
                            post={post}
                        />
                    ) : (
                        <div className="w-full h-[80vh] max-h-[85vh] flex flex-col items-center justify-start gap-5 p-9">
                            <Link className="size-22 text-gray-600" />
                            <div className="w-full max-w-125 flex flex-col items-center gap-1">
                                <span className="text-gray-500 font-semibold text-xl">Bài viết không tồn tại hoặc đã bị xóa.</span>
                                <p className="text-gray-500 text-base text-center">Nguyên nhân có thể là lỗi kỹ thuật mà chúng tôi đang nỗ lực khắc phục. Hãy thử tải lại trang này.</p>
                            </div>
                            <Button onClick={() => router.back()} className="">
                                Quay lại Bảng feed
                            </Button>
                        </div>
                    )}
                </div>

                <DialogFooter className="rounded-b-lg p-4 pt-3 shrink-0">
                    <div className="w-full">
                        {
                            post ? (
                                <Button
                                    type="submit"
                                    className="text-white px-9 w-full"
                                >
                                    Chia sẻ
                                </Button>
                            ) : (
                                <div className="w-full flex items-center gap-1.5">
                                    <div className="size-8 rounded-full bg-gray-300 animate-pulse"></div>
                                    <div className="flex-1 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                                </div>
                            )
                        }
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}
