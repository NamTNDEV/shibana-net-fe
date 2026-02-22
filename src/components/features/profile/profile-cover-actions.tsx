'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CameraIcon, Images, Move, Trash, Upload } from "lucide-react";
import { useRef } from "react";

type ProfileCoverActionsProps = {
    onRemoveCover: () => void;
    onRepositionCover: () => void;
}

export default function ProfileCoverActions({ onRemoveCover, onRepositionCover }: ProfileCoverActionsProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadCover = () => {
        console.log("upload cover 📂:::");
        fileInputRef.current?.click();
    }

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("cover change 📷:::");
        const uploadedCover = e.target.files?.[0];
        if (uploadedCover) {
            console.log("uploadedCover :::", uploadedCover);
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="secondary"
                        size="default"
                        className="font-semibold rounded-sm bg-white hover:bg-gray-100 px-4!"
                    >
                        <CameraIcon className="size-4" />
                        <span className="hidden md:inline">Chỉnh sửa ảnh bìa</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[calc(100vw-16px)] ml-2 rounded-xl sm:w-fit sm:ml-0" align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="gap-3 px-3 py-2 hover:cursor-pointer">
                            <Images className="size-5" />
                            <span className="text-base sm:w-[280px] font-semibold">Chọn ảnh bìa</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-3 px-3 py-2 hover:cursor-pointer" onClick={handleUploadCover}>
                            <Upload className="size-5" />
                            <span className="text-base sm:w-[280px] font-semibold">Tải ảnh lên</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-3 px-3 py-2 hover:cursor-pointer" onClick={onRepositionCover}>
                            <Move className="size-5" />
                            <span className="text-base sm:w-[280px] font-semibold">Đặt lại vị trí</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="mx-3" />
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="gap-3 px-3 py-2 hover:cursor-pointer" onClick={onRemoveCover}>
                            <Trash className="size-5" />
                            <span className="text-base sm:w-[280px] font-semibold">Gỡ</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleCoverChange}
            />
        </>
    )
}
