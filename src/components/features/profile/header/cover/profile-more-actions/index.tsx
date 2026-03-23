import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { ViewerContextResponseDataType } from '@/types/profile.type'
import { NotOwnerActions } from './NotOwnerActions'
import { OwnerActions } from './OwnerActions'

type ProfileMoreActionsPropsType = {
    viewerContext: ViewerContextResponseDataType;
    userId: string;
}

export default function ProfileMoreActions({ viewerContext, userId }: ProfileMoreActionsPropsType) {
    const { isOwner } = viewerContext;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center justify-center gap-1 px-3 h-9 hover:bg-secondary">
                    <MoreHorizontal className="size-5 text-gray-600" />
                </Button>
            </DropdownMenuTrigger>
            {isOwner ? <OwnerActions /> : <NotOwnerActions userId={userId} />}
        </DropdownMenu>
    )
}




