import PostCreationTrigger from "@/components/features/post/post-creation-trigger";
import PostListWindowScroll from "@/components/features/post/post-list-window-scroll";
import ReelsCarousel from "@/components/features/reels/reels-carousel";

export default function NewsfeedContainer() {
    return (
        <div className="w-full sm:max-w-170 mx-auto flex flex-col gap-2">
            <PostCreationTrigger />
            <ReelsCarousel />
            <PostListWindowScroll />
        </div>
    )
}
