import { PostResponseDataType } from "@/types/post.type";
import PostBody from "./post-item-body";
import PostHeader from "./post-item-header";
import PostActions from "./post-item-actions";
import MediaGrid from "./post-item-medias";

export type DisplayMode = "NEWSFEED" | "PREVIEW" | "DETAIL";

type PostItemProps = {
    post: PostResponseDataType;
    displayMode: DisplayMode;
}

export default function PostItem({ displayMode, post }: PostItemProps) {
    return (
        <div className="w-full bg-white rounded-lg shadow-sm flex flex-col">
            <PostHeader author={post.author} createdAt={post.createdAt} privacy={post.privacy} />

            <PostBody content={post.content} />
            <MediaGrid mediaList={[]} />

            <PostActions commentCount={post.commentCount} />
        </div>
    )
}