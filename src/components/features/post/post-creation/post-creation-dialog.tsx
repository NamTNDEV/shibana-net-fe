'use client';

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import PostCreationForm from "./post-creation-form";
import { useState } from "react";
import { cn } from "@/lib/utils";

type PostCreationDialogProps = {
    authUser: {
        firstName: string
    }
}

function PostCreationDialog({ authUser }: PostCreationDialogProps) {
    const [content, setContent] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleModalClose = () => {
        setIsOpen(false);
    }

    const handleContentChange = (newContent: string) => {
        setContent(newContent);
    }

    const placeholderText = content.length > 0 ? content : `${authUser.firstName ? `${authUser.firstName} ơi, bạn đang nghĩ gì thế?` : "Bạn đang nghĩ gì thế?"}`;
    const hasContent = content.trim().length > 0;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div className="flex-1 min-h-10 px-4 py-2 rounded-4xl bg-muted hover:bg-secondary cursor-pointer flex items-center justify-start">
                    <p className={cn(
                        "text-base w-full break-all line-clamp-2",
                        hasContent ? "text-black" : "text-muted-foreground" // Đổi màu text nếu có nội dung
                    )}>
                        {placeholderText}
                    </p>
                </div>
            </DialogTrigger>
            <DialogContent className="p-0 gap-0 bg-white max-w-125 overflow-hidden" showCloseButton={false}>
                <PostCreationForm mode="CREATE" onContentChange={handleContentChange} initialData={content} onModalClose={handleModalClose} />
            </DialogContent>
        </Dialog>
    )
}

export default PostCreationDialog;
