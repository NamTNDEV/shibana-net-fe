'use client'

import { Slider } from "@/components/ui/slider";
import { Minus, Plus } from "lucide-react";
import { DEFAULT_AVATAR_SCALE, SCALE_STEP } from "./profile-avatar-modal-constants";

type AvatarScaleSliderProps = {
    avatarScale: number;
    setAvatarScale: (value: number) => void;
    onDecreaseAvatarScale: () => void;
    onIncreaseAvatarScale: () => void;
}

export const AvatarScaleSlider = ({ avatarScale, setAvatarScale, onDecreaseAvatarScale, onIncreaseAvatarScale }: AvatarScaleSliderProps) => {
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
