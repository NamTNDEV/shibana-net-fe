export default function PostItemSkeleton() {
    return (
        <div className="w-full bg-white rounded-lg shadow-sm p-3 px-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <div className="size-10 bg-gray-200 animate-pulse rounded-full"></div>
                <div className="flex flex-col gap-1">
                    <div className="w-[100px] h-3 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-[120px] h-3 bg-gray-200 animate-pulse rounded-full"></div>
                </div>
            </div>
            <div className="w-full h-40"></div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-[60px] h-3 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-[60px] h-3 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-[60px] h-3 bg-gray-200 animate-pulse rounded-full"></div>
                </div>
                <div className="w-[60px] h-3 bg-gray-200 animate-pulse rounded-full"></div>
            </div>
        </div >
    )
}
