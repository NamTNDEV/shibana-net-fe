import { Button } from "@/components/ui/button";

export type ProfileActionsPropsType = {
    isOwner: boolean;
}
export default function ProfileActions({ isOwner }: ProfileActionsPropsType) {
    return (
        <div className="flex gap-2 md:pt-3 lg:pt-0">
            {isOwner ? <ProfileActionsOwner /> : <ProfileActionsNotOwner />}
        </div>
    )
}

function ProfileActionsOwner() {
    return (
        <div>
            <Button variant="outline">
                Chỉnh sửa
            </Button>
        </div>
    )
}

function ProfileActionsNotOwner() {
    return (
        <div>
            <Button>
                Theo dõi
            </Button>
        </div>
    )
}