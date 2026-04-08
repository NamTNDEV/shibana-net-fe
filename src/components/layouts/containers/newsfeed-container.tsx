import PostList from "../../features/post/post-list";
import PostCreationTrigger from "../../features/post/post-creation-trigger";
import ReelsCarousel from "@/components/features/reels/reels-carousel";

export default function NewsfeedContainer() {
    return (
        <div className="w-full sm:max-w-[680px] mx-auto flex flex-col gap-2">
            <PostCreationTrigger />
            <ReelsCarousel />
            <PostList />
        </div>
    )
}
