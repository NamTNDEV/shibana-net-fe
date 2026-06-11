import { Fragment } from "react/jsx-runtime";

const RENDER_SKELETON_ITEM_NUMBER = 5;
const SKELETON_ITEM_LIST = [
    {
        type: 1,
        skeleton: (
            <div className="w-full h-fit flex items-start gap-1.5">
                <div className="size-8 shrink-0 rounded-full bg-gray-300 animate-pulse" />
                <div className="w-2/3 h-8 rounded-full bg-gray-300 animate-pulse" />
            </div>
        )
    },
    {
        type: 2,
        skeleton: (
            <div className="w-full h-fit flex items-start gap-1.5">
                <div className="size-8 shrink-0 rounded-full bg-gray-300 animate-pulse" />
                <div className="w-3/4 h-8 rounded-full bg-gray-300 animate-pulse" />
            </div>
        )
    },
    {
        type: 3,
        skeleton: (
            <div className="w-full h-fit flex items-start gap-1.5">
                <div className="size-8 shrink-0 rounded-full bg-gray-300 animate-pulse" />
                <div className="w-1/2 h-24 rounded-lg bg-gray-300 animate-pulse" />
            </div>
        )
    },
    {
        type: 4,
        skeleton: (
            <div className="w-full h-fit flex items-start gap-1.5">
                <div className="size-8 shrink-0 rounded-full bg-gray-300 animate-pulse" />
                <div className="w-1/2 h-16 rounded-lg bg-gray-300 animate-pulse" />
            </div>
        )
    }
]

export default function CommentListSkeleton() {
    return (
        <div className="w-full h-full flex flex-col gap-3 pl-3">
            {renderRandomSkeletonList(RENDER_SKELETON_ITEM_NUMBER)}
        </div>
    )
}

const renderRandomSkeletonList = (itemNumber: number) => {
    const skeletonList = [];
    for (let i = 0; i < itemNumber; i++) {
        const randomIndex = Math.floor(Math.random() * SKELETON_ITEM_LIST.length);
        skeletonList.push(
            <Fragment key={i}>
                {SKELETON_ITEM_LIST[randomIndex].skeleton}
            </Fragment>
        )
    }
    return skeletonList;
}


