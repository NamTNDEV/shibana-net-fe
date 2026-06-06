import { FileText } from "lucide-react";
import { useState } from "react";

type CommentSectionProps = {
    postId: string;
};

function CommentSection({ postId }: CommentSectionProps) {
    const [comments, setComments] = useState([]);

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

    return (
        <div className="w-full h-full flex flex-col items-center gap-1 bg-accent/50 p-4 mb-2">
            CommentSection for post {postId}
        </div>
    )
}

export default CommentSection;
