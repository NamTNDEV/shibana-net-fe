type PostDetailPageProps = {
    params: Promise<{ id: string }>;
}

async function PostDetailPage({
    params,
}: PostDetailPageProps) {
    const { id } = await params;
    return <div>PostDetailPage: {id}</div>;
}

export default PostDetailPage;
