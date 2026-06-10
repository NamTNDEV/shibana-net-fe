'use client';

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

type CommentUpdateFormPropsType = {
    commentContent: string;
    onEditingSubmit: (e: React.FormEvent, newContent: string) => void;
}

function CommentUpdateForm({ commentContent, onEditingSubmit }: CommentUpdateFormPropsType) {
    const [editingContent, setEditingContent] = useState(commentContent);

    return (
        <form className="w-full flex flex-col gap-0 bg-gray-100 rounded-lg re" onSubmit={(e) => onEditingSubmit(e, editingContent)}>
            <Textarea
                placeholder="Viết bình luận..."
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                className={cn(
                    "w-full px-3 pt-2 m-0 resize-none flex-1 min-h-9 max-h-[50vh] overflow-auto",
                    "outline-none border-none shadow-none bg-gray-100",
                    "leading-normal break-all whitespace-pre-wrap text-left",
                    "focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus:border",
                    "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                )}
                autoFocus
            />
            <div className="flex items-center gap-2 shrink-0 p-2 pt-0" >
                <Button
                    type="submit"
                    className="size-9 ml-auto rounded-full bg-transparent hover:bg-gray-200 text-primary disabled:text-gray-600"
                // disabled={isCreatingComment || commentContent.trim() === ""}
                >
                    <Send className="text-8" />
                </Button>
            </div>
        </form>
    )
}

export default CommentUpdateForm;
