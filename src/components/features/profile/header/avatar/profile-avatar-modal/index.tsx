'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DEFAULT_AVATAR_SCALE, SCALE_STEP } from "./profile-avatar-modal-constants";
import { AvatarScaleSlider } from "./profile-avatar-modal-slider";
import { AvatarPreview, AvatarPreviewRef } from "./profile-avatar-modal-preview";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { updateAvatarAction, uploadAvatarImageAction } from "@/actions/profile.action";
import { UpdateAvatarImageRequestBodyType } from "@/types/profile.type";

type ProfileAvatarModalProps = {
    selectedAvatar: File | null;
    avatarUrl: string | null;
    initialAvatarPositionX?: number;
    initialAvatarPositionY?: number;
    onClose: () => void;
    onUpdateSuccess: () => void;
}

export default function ProfileAvatarModal({ avatarUrl, selectedAvatar, initialAvatarPositionX, initialAvatarPositionY, onClose, onUpdateSuccess }: ProfileAvatarModalProps) {
    const [avatarScale, setAvatarScale] = useState(DEFAULT_AVATAR_SCALE);
    const [isUploading, setIsUploading] = useState(false);

    const avatarPreviewRef = useRef<AvatarPreviewRef>(null);

    useEffect(() => {
        if (!avatarUrl) return;
        setAvatarScale(DEFAULT_AVATAR_SCALE);
    }, [avatarUrl]);

    const handleIncreaseAvatarScale = () => {
        setAvatarScale(avatarScale + SCALE_STEP);
    }

    const handleDecreaseAvatarScale = () => {
        setAvatarScale(Math.max(avatarScale - SCALE_STEP, DEFAULT_AVATAR_SCALE));
    }

    const handleAvatarUpdate = async () => {
        setIsUploading(true);
        try {
            if (!avatarPreviewRef.current || !selectedAvatar) return;
            const { positionXInPercentage, positionYInPercentage, avatarScale } = avatarPreviewRef.current.getAvatarMetadata();
            const uploadedAvatarResponse = await uploadAvatarImageAction({ file: selectedAvatar });
            if (!uploadedAvatarResponse.success || !uploadedAvatarResponse.data) {
                toast.error(uploadedAvatarResponse.message, { position: "bottom-right", richColors: true });
                return;
            }
            const updateAvatarBody: UpdateAvatarImageRequestBodyType = {
                avatarScale,
                avatarPositionX: positionXInPercentage,
                avatarPositionY: positionYInPercentage,
                avatarMediaName: uploadedAvatarResponse.data?.fileName,
            };

            const updatedAvatarResponse = await updateAvatarAction(updateAvatarBody);
            if (!updatedAvatarResponse.success) {
                toast.error(updatedAvatarResponse.message, { position: "bottom-right", richColors: true });
                return;
            }

            onUpdateSuccess();

            toast.success(updatedAvatarResponse.message, {
                position: "bottom-right",
                richColors: true,
                duration: 3000,
            });
        } catch (error) {
            toast.error("Lỗi hệ thống, vui lòng thử lại sau.", { position: "bottom-right", richColors: true });
        } finally {
            setIsUploading(false);
        }
    }

    if (!avatarUrl || !selectedAvatar) return null;
    return (
        <Dialog open={!!avatarUrl}>
            <DialogContent className="p-0 min-w-screen sm:min-w-[96%] md:min-w-[700px] gap-0" showCloseButton={false}>
                <DialogHeader className="relative flex items-center justify-center px-[60px] h-[60px] bg-white rounded-t-lg">
                    <DialogTitle className="px-4 text-xl font-bold">Chọn ảnh đại diện</DialogTitle>
                    <div
                        className={
                            cn(
                                "absolute w-9 h-9 flex items-center justify-center bg-secondary rounded-full hover:cursor-pointer hover:opacity-80 top-1/2 -translate-y-1/2 right-4",
                                isUploading && "pointer-events-none opacity-30"
                            )
                        }
                        onClick={onClose}
                    >
                        <X className="size-5" />
                    </div>
                    <DialogDescription className="hidden" />
                </DialogHeader>
                <Separator className="w-full bg-[#ced1d5] h-0.5" />
                <div className="p-4 flex flex-col items-center justify-center bg-white">
                    <Textarea placeholder="Nhập mô tả (Tuỳ chọn)" className="w-full max-w-[666px] h-20 p-4 mb-4 border border-gray-300 resize-none" />
                    <div className="w-full">
                        <AvatarPreview
                            ref={avatarPreviewRef}
                            avatarUrl={avatarUrl}
                            avatarScale={avatarScale}
                            initialAvatarPositionX={initialAvatarPositionX}
                            initialAvatarPositionY={initialAvatarPositionY} />

                        <AvatarScaleSlider
                            avatarScale={avatarScale}
                            setAvatarScale={setAvatarScale}
                            onDecreaseAvatarScale={handleDecreaseAvatarScale}
                            onIncreaseAvatarScale={handleIncreaseAvatarScale} />
                    </div>
                </div>
                <Separator className="w-full bg-[#ced1d5] h-0.5" />
                <DialogFooter className="p-4 flex justify-end bg-white rounded-b-lg">
                    <DialogClose asChild onClick={onClose}>
                        <Button type="button" className="bg-transparent text-primary hover:bg-secondary p-3" disabled={isUploading}>Huỷ</Button>
                    </DialogClose>
                    <Button type="button" className="text-white px-9 min-w-10" onClick={handleAvatarUpdate} isLoading={isUploading}>Lưu</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}



