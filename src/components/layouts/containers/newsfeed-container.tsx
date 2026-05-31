import PostCreationTrigger from "@/components/features/post/post-creation-trigger";
import PostListIntersectionObserverV02 from "@/components/features/post/post-list-poly/post-list-intersection-observer_v02";
import ReelsCarousel from "@/components/features/reels/reels-carousel";

export default function NewsfeedContainer() {
    return (
        <div className="w-full sm:max-w-170 mx-auto flex flex-col gap-2">
            <PostCreationTrigger />
            <ReelsCarousel />
            <PostListIntersectionObserverV02 />
        </div>
    )
}
