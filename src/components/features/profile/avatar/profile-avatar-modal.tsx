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
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type ProfileAvatarModalProps = {
    avatarUrl: string | null;
    onClose: () => void;
}

const DEFAULT_AVATAR_SCALE = 1;
const SCALE_STEP = 0.1;

export default function ProfileAvatarModal({ avatarUrl, onClose }: ProfileAvatarModalProps) {
    const [avatarScale, setAvatarScale] = useState(DEFAULT_AVATAR_SCALE);

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

    if (!avatarUrl) return null;

    return (
        <Dialog open={!!avatarUrl}>
            <DialogContent className="p-0 min-w-screen sm:min-w-[96%] md:min-w-[700px] gap-0" showCloseButton={false}>
                <DialogHeader className="relative flex items-center justify-center px-[60px] h-[60px] bg-white rounded-t-lg">
                    <DialogTitle className="px-4 text-xl font-bold">Chọn ảnh đại diện</DialogTitle>
                    <div
                        className="absolute w-9 h-9 flex items-center 
                    justify-center bg-secondary rounded-full hover:cursor-pointer hover:opacity-80
                    top-1/2 -translate-y-1/2 right-4
                    "
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
                        {/* Nơi xử lý kéo ảnh đại diện */}
                        <AvatarPreview avatarUrl={avatarUrl} avatarScale={avatarScale} />

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
                        <Button type="button" className="bg-transparent text-primary hover:bg-secondary p-3">Huỷ</Button>
                    </DialogClose>
                    <Button type="button" className="text-white px-9">Lưu</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

type AvatarScaleSliderProps = {
    avatarScale: number;
    setAvatarScale: (value: number) => void;
    onDecreaseAvatarScale: () => void;
    onIncreaseAvatarScale: () => void;
}

const AvatarScaleSlider = ({ avatarScale, setAvatarScale, onDecreaseAvatarScale, onIncreaseAvatarScale }: AvatarScaleSliderProps) => {
    return (
        <div className="w-full py-3 flex items-center justify-center gap-3">
            <Minus className="size-5 text-gray-600 hover:cursor-pointer hover:opacity-80" onClick={onDecreaseAvatarScale} />
            <Slider
                defaultValue={[DEFAULT_AVATAR_SCALE]}
                value={[avatarScale]}
                max={10}
                min={DEFAULT_AVATAR_SCALE}
                step={SCALE_STEP}
                className="w-[400px] cursor-pointer"
                onValueChange={(value) => setAvatarScale(value[0])}
            />
            <Plus className="size-5 text-gray-600 hover:cursor-pointer hover:opacity-80" onClick={onIncreaseAvatarScale} />
        </div>
    )
}

const DEFAULT_CONTAINER_SIZE = 300;

const AvatarPreview = ({ avatarUrl, avatarScale }: { avatarUrl: string, avatarScale: number }) => {
    const [imageNaturalSize, setImageNaturalSize] = useState({
        width: 0,
        height: 0
    });
    const [renderedSize, setRenderedSize] = useState({
        width: 0,
        height: 0
    });

    useEffect(() => {
        if (!imageNaturalSize.width || !imageNaturalSize.height) return;
        const scaleX = DEFAULT_CONTAINER_SIZE / imageNaturalSize.width;
        const scaleY = DEFAULT_CONTAINER_SIZE / imageNaturalSize.height;
        const isWThanH = imageNaturalSize.width > imageNaturalSize.height;
        if (isWThanH) {
            setRenderedSize({
                height: DEFAULT_CONTAINER_SIZE,
                width: imageNaturalSize.width * scaleY
            })
        } else {
            setRenderedSize({
                width: DEFAULT_CONTAINER_SIZE,
                height: imageNaturalSize.height * scaleX
            })
        }
    }, [imageNaturalSize])

    const x = 0;
    const y = 0;
    // http://localhost:3000/ac56a441-218f-48f6-892e-c7aad34d980b
    return (
        <div className="relative w-full h-[420px] overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
                <Image
                    src={avatarUrl}
                    alt="Avatar Preview"
                    className={cn(
                        "max-w-none"
                    )}
                    style={{
                        transform: `
                            scale(${avatarScale})
                            translate(${x}%, ${y}%)
                        `,
                        width: renderedSize.width,
                        height: renderedSize.height
                    }}
                    width={0}
                    height={0}
                    onLoad={(e) => {
                        const image = e.currentTarget;
                        const naturalWidth = image.naturalWidth;
                        const naturalHeight = image.naturalHeight;
                        setImageNaturalSize({
                            width: naturalWidth,
                            height: naturalHeight
                        });
                    }}
                    priority
                    unoptimized={true}
                />
            </div>
            <div className="absolute pointer-events-none w-full h-full flex items-center justify-center">
                <div className="w-[300px] h-[300px] rounded-full shadow-[0_0_0_9999px_rgba(255,255,255,0.6)]" />
            </div>
        </div>
    )
}