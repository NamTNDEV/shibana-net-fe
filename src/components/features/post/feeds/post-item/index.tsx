import { PostResponseDataType } from "@/types/post.type";
import PostBody from "./post-item-body";
import PostHeader from "./post-item-header";
import PostActions from "./post-item-actions";
import MediaGrid from "./post-item-medias";
import { cn } from "@/lib/utils";

export type DisplayMode = "NEWSFEED" | "MODAL_DETAIL";

type PostItemProps = {
    post: PostResponseDataType;
    displayMode: DisplayMode;
}

export default function PostItem({ displayMode, post }: PostItemProps) {
    return (
        <div className={cn(
            "w-full bg-white flex flex-col",
            displayMode === "NEWSFEED" && "rounded-lg shadow-sm "
        )}>
            <PostHeader post={post} />

            <PostBody content={post.content} displayMode={displayMode} />
            <MediaGrid mediaList={[]} />

            <PostActions
                postId={post.id}
                commentCount={post.commentCounts}
                displayMode={displayMode}
            />
        </div>
    )
}