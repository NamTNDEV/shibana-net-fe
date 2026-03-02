import PostItem from "./post-item";

const MOCK_POST_LIST = [
    {
        id: 1,
        content: "Hello, world!",
    },
    {
        id: 2,
        content: "Hello, world!",
    },
    {
        id: 3,
        content: "Hello, world!",
    },
    {
        id: 4,
        content: "Hello, world!",
    },
    {
        id: 5,
        content: "Hello, world!",
    },
    {
        id: 6,
        content: "Hello, world!",
    },
    {
        id: 7,
        content: "Hello, world!",
    },
    {
        id: 8,
        content: "Hello, world!",
    },
    {
        id: 9,
        content: "Hello, world!",
    },
    {
        id: 10,
        content: "Hello, world!",
    },
]

export default function PostList() {
    return (
        <div className="w-full flex flex-col gap-4">
            {MOCK_POST_LIST.map(post => <PostItem key={post.id} />)}
        </div>
    )
}
