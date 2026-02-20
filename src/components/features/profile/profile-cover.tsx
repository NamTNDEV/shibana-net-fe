import { Button } from "@/components/ui/button";
import { CameraIcon } from "lucide-react";
import Image from "next/image";

type ProfileCoverProps = {
    coverUrl?: string | null;
    altText?: string;
};

export default function ProfileCover({ coverUrl, altText = "Cover Photo" }: ProfileCoverProps) {
    if (!coverUrl) {
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
                    src={coverUrl}
                    alt="Ambient Background"
                    fill
                    className="object-cover blur-[100px] scale-110"
                    priority
                />

                <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/60 to-white" />
            </div>

            <div
                className="relative z-10 w-full lg:max-w-[74%] h-[240px] md:h-[310px] lg:h-[465px] rounded-b-sm overflow-hidden shadow-sm border border-gray-100/20 group"
            >
                <Image
                    src={coverUrl}
                    alt={altText}
                    fill
                    className="object-cover object-center hover:cursor-pointer hover:opacity-95"
                    priority
                />

                <div className="absolute bottom-3 right-6 md:bottom-4 md:right-8 z-50">
                    <Button
                        variant="secondary"
                        size="default"
                        className="font-semibold rounded-sm bg-white hover:bg-gray-100 px-4!"
                    >
                        <CameraIcon className="size-4" />
                        <span className="hidden lg:inline">Chỉnh sửa ảnh bìa</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}