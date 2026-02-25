'use client'
import Image from "next/image";
import { useAuthStore } from "@/stores/auth.store";
import ProfileCoverActions from "./profile-cover-actions";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Earth, Move } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCoverDrag } from "@/hooks/use-cover-drag";
import { updateCoverImageAction, uploadCoverImageAction } from "@/actions/profile.action";
import { toast } from "sonner";
import { UpdateCoverImageRequestBodyType, UploadCoverImageRequestBodyType } from "@/types/media.type";
import { useRouter } from "next/navigation";

type ProfileCoverProps = {
    coverUrl?: string;
    altText?: string;
    userId: string;
};

const DEFAULT_IMAGE_POSITION_Y = 50;

export default function ProfileCover({ coverUrl: initialCoverUrl, altText = "Cover Photo", userId }: ProfileCoverProps) {
    const router = useRouter();
    const { authUser } = useAuthStore();
    const [isEditingCover, setIsEditingCover] = useState<boolean>(false);
    const [selectedCover, setSelectedCover] = useState<File | null>(null);
    const [isUploadingCover, setIsUploadingCover] = useState<boolean>(false);
    const [imageNaturalSize, setImageNaturalSize] = useState<{ width: number, height: number }>({ width: 0, height: 0 });
    const [previewCoverUrl, setPreviewCoverUrl] = useState<string | null>(null);
    const [currentCoverUrl, setCurrentCoverUrl] = useState<string | undefined>(initialCoverUrl);

    const containerCoverRef = useRef<HTMLDivElement>(null);

    const { imagePositionY, onMouseDown, setImagePositionY, isDragging } = useCoverDrag({
        containerReference: containerCoverRef,
        imageNaturalWidth: imageNaturalSize.width,
        imageNaturalHeight: imageNaturalSize.height,
    });

    useEffect(() => {
        return () => {
            if (previewCoverUrl) {
                URL.revokeObjectURL(previewCoverUrl);
            }
        }
    }, [previewCoverUrl])

    const handleUploadCover = (file: File) => {
        setSelectedCover(file);
        const objUrl = URL.createObjectURL(file);
        setPreviewCoverUrl(objUrl);
        setIsEditingCover(true);
    }

    const handleRemoveCover = () => {
    }

    const handleRepositionCover = () => {
        setIsEditingCover(true);
    }

    const handleUpdateCoverImage = async () => {
        setIsUploadingCover(true);
        try {
            let uploadedCoverMediaName: string | undefined;
            let newCoverUrl: string | undefined;
            if (selectedCover) {
                const response = await uploadCoverImageAction({ file: selectedCover });
                if (!response.success || !response.data) {
                    toast.error(response.message, {
                        position: "bottom-right",
                        richColors: true,
                        duration: 3000,
                    })
                    return;
                }
                newCoverUrl = response.data?.url;
                uploadedCoverMediaName = response.data?.fileName;
            }

            const updateBody: UpdateCoverImageRequestBodyType = {
                coverMediaName: uploadedCoverMediaName,
                coverPositionY: imagePositionY,
            }

            const res = await updateCoverImageAction(updateBody);
            if (!res.success) {
                toast.error(res.message, {
                    position: "bottom-right",
                    richColors: true,
                    duration: 3000,
                })
                return;
            }

            toast.success(res.message, {
                position: "bottom-right",
                richColors: true,
                duration: 3000,
            })

            if (newCoverUrl) {
                setCurrentCoverUrl(newCoverUrl);
                setPreviewCoverUrl(null);
            }

            setSelectedCover(null);
            setIsEditingCover(false);
            router.refresh();
        } catch (error) {
            toast.error("Lỗi hệ thống, vui lòng thử lại sau.", { position: "bottom-right", richColors: true });
        } finally {
            setIsUploadingCover(false);
        }
    }

    const handleCancelRepositionCover = () => {
        setIsEditingCover(false);
        setSelectedCover(null);
        setPreviewCoverUrl(null);
        setImagePositionY(DEFAULT_IMAGE_POSITION_Y);
    }

    const displayCoverUrl = previewCoverUrl || currentCoverUrl;

    if (!displayCoverUrl) {
        return (
            <div className="flex justify-center w-full bg-white">
                <div className="w-full max-w-[74%] h-[240px] md:h-[310px] lg:h-[465px] bg-gray-200 rounded-b-xl" />
            </div>
        );
    }

    return (
        <div className="relative w-full bg-white flex justify-center">
            <div className="absolute inset-x-0 top-0 h-[240px] md:h-[310px] lg:h-[465px] overflow-hidden pointer-events-none z-0">
                <Image
                    src={displayCoverUrl}
                    alt="Ambient Background"
                    fill
                    className="object-cover blur-[100px] scale-110"
                    priority
                />

                <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/60 to-white" />
            </div>

            <div
                className={cn(
                    "relative z-10 w-full lg:max-w-[74%] h-[240px] md:h-[310px] lg:h-[465px] rounded-b-sm overflow-hidden shadow-sm border border-gray-100/20 group",
                    isEditingCover && "cursor-move"
                )}
                ref={containerCoverRef}
            >
                <Image
                    src={displayCoverUrl}
                    alt={altText}
                    fill
                    className={cn(
                        "object-cover transition-none",
                        isEditingCover ? "cursor-move" : "pointer-events-none hover:cursor-pointer hover:opacity-95"
                    )}
                    style={{
                        objectPosition: `50% ${imagePositionY}%`
                    }}
                    onMouseDown={isEditingCover ? onMouseDown : undefined}
                    onLoad={(e) => {
                        setImageNaturalSize({
                            width: e.currentTarget.naturalWidth,
                            height: e.currentTarget.naturalHeight
                        });
                    }}
                    priority
                />

                {userId === authUser?.userId && !isEditingCover && (
                    <div className="absolute bottom-3 right-6 md:bottom-4 md:right-8 z-40">
                        <ProfileCoverActions
                            onUploadCover={handleUploadCover}
                            onRemoveCover={handleRemoveCover}
                            onRepositionCover={handleRepositionCover}
                        />
                    </div>
                )}

                {isEditingCover && !isDragging && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-fit w-1/2 max-w-[450px] bg-black/50 px-3 py-2 flex items-center gap-2 rounded-md">
                        <Move className="size-5 text-white" />
                        <span className="text-white text-[15px] font-semibold">Kéo hoặc dùng các phím mũi tên để đặt lại vị trí ảnh bìa.</span>
                    </div>
                )}
            </div>

            {isEditingCover && (
                <div className="absolute top-0 left-0 h-[60px] w-full bg-black/50 px-4 py-3 z-40">
                    <div className="h-full w-full flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Earth className="size-5 text-white" />
                            <span className="text-white text-base">Ảnh bìa của bạn hiển thị công khai.</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button className="bg-secondary/20 text-white px-10" onClick={handleCancelRepositionCover}>Huỷ</Button>
                            <Button className="px-10 text-white" onClick={handleUpdateCoverImage} disabled={isUploadingCover}>Lưu thay đổi</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}