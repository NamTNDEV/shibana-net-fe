import PostDetailDialog from "@/components/features/post/post-detail/post-detail-dialog";
import { postService } from "@/services/post.service";

type PostDetailParallelPageProps = {
    params: Promise<{ id: string }>;
};

async function PostDetailParallelPage({
    params,
}: PostDetailParallelPageProps) {
    const { id } = await params;

    // const response = await postService.getPostDetailById(id);

    return (
        <PostDetailDialog post={null} />
    );
}

export default PostDetailParallelPage;
