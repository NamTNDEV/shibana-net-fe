import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import BlockUserButton from "./buttons/block-user-button";

export type NotOwnerActionsPropsType = {
    userId: string;
}

export const NotOwnerActions = ({ userId }: NotOwnerActionsPropsType) => {
    console.log("User ID:: ", userId);

    return (
        <DropdownMenuContent className="mt-6 mr-3 md:mt-3 p-2" align="center">
            <DropdownMenuItem className="w-[92vw] md:w-[328px] p-0 hover:bg-gray-300! ">
                <BlockUserButton blockeeId={userId} />
            </DropdownMenuItem>
        </DropdownMenuContent >
    )
}