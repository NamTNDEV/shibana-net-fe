import GlobalPostEditModal from "@/components/providers/global-post-edit-modal";
import PostCreationWidget from "@/components/features/post/post-creation/post-creation-widget";
import PostListTanstackQuery from "@/components/features/post/post-list-poly/post-list-tanstack-query";
import ReelsCarousel from "@/components/features/reels/reels-carousel";

export default function NewsfeedContainer() {
    return (
        <div className="w-full sm:max-w-170 mx-auto flex flex-col gap-2 mb-4">
            <PostCreationWidget />
            <ReelsCarousel />
            <PostListTanstackQuery />

            <GlobalPostEditModal />
        </div>
    )
}
