'use client'
import { Ellipsis } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type CommentActionsProps = {
    onEditingModeStart: () => void;
    onDeleteProcess: () => void;
    isOwner?: boolean;
}

function CommentActions({ onEditingModeStart, onDeleteProcess, isOwner }: CommentActionsProps) {
    return (
        <DropdownMenu modal={true}>
            <DropdownMenuTrigger asChild>
                <div className="absolute size-8 flex items-center justify-center rounded-full hover:bg-gray-200 cursor-pointer -right-9 top-1/2 -translate-y-1/2">
                    <Ellipsis className="size-4" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="p-2 min-w-82 shadow-xl shadow-gray-500">
                {
                    isOwner ? (
                        <>
                            {/* Edit */}
                            <DropdownMenuItem
                                className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-200!"
                                onClick={onEditingModeStart}
                            >
                                <div>
                                    <h3 className="text-base font-medium">Chỉnh sửa</h3>
                                </div>
                            </DropdownMenuItem >

                            {/* Delete */}
                            <DropdownMenuItem
                                className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-200!"
                                onClick={onDeleteProcess}
                            >
                                <div>
                                    <h3 className="text-base font-medium">Xoá</h3>
                                </div>
                            </DropdownMenuItem >
                        </>
                    ) : (
                        <DropdownMenuItem
                            className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-200!"
                        >
                            <div>
                                <h3 className="text-base font-medium">Hello World</h3>
                            </div>
                        </DropdownMenuItem >
                    )
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CommentActions;
