import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Ban } from "lucide-react";

export const OwnerActions = () => {
    return null;
    return (
        <DropdownMenuContent className="mt-3 p-1" align="center">
            <DropdownMenuItem
                className="min-w-screen md:min-w-[280px] max-h-8 p-2 hover:cursor-pointer hover:bg-secondary!"
            >
                <Ban className="size-5" />
                <span className="text-base sm:w-[280px]">Hi</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    )
}   