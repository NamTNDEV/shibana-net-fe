import { PrivacyType } from "@/components/features/profile/about/profile-about-item.type";
import { StepTypes } from ".";
import { cn } from "@/lib/utils";
import { DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ProfileFieldPrivacyModalContent from "@/components/features/profile/profile-field-privacy/modal/content";
import { Button } from "@/components/ui/button";

type PostFormPrivacyStepProps = {
    selectedPrivacy: PrivacyType;
    setSelectedPrivacy: (privacy: PrivacyType) => void;
    step: StepTypes;
    setStep: (step: StepTypes) => void;
}

function PostFormPrivacyStep({ selectedPrivacy, setSelectedPrivacy, step, setStep }: PostFormPrivacyStepProps) {
    return (
        <div className={cn(
            "w-full flex flex-col max-h-[85vh] transition-all duration-300 ease-in-out",
            step === "PRIVACY"
                ? "relative translate-x-0 opacity-100"
                : "absolute top-0 left-0 translate-x-full opacity-0 pointer-events-none"
        )}>
            <DialogHeader className="relative flex items-center justify-center h-15 rounded-t-lg shrink-0">
                <div
                    onClick={() => setStep("MAIN")}
                    className="absolute w-9 h-9 flex items-center justify-center bg-secondary rounded-full hover:cursor-pointer hover:opacity-80 top-1/2 -translate-y-1/2 left-4"
                >
                    <ArrowLeft className="size-5" />
                </div>
                <DialogTitle className="px-4 text-xl font-bold">Đối tượng của bài viết</DialogTitle>
            </DialogHeader>

            <Separator className="w-full bg-[#ced1d5] h-0.5" />

            <div className="flex flex-col gap-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 min-h-62.5 max-h-[calc(85vh-120px)]">
                <div className="px-4 pt-3 flex flex-col gap-1">
                    <h3 className="text-base font-bold text-black">Ai có thể xem bài viết của bạn?</h3>
                    <p className="text-sm text-gray-500">Bài viết của bạn sẽ hiển thị trên Bảng tin, trang cá nhân và trong kết quả tìm kiếm.</p>
                </div>

                <ProfileFieldPrivacyModalContent selectedPrivacy={selectedPrivacy} setSelectedPrivacy={setSelectedPrivacy} />
            </div>

            <DialogFooter className="rounded-b-lg pb-4 px-4">
                <Button type="button" onClick={() => setStep("MAIN")} className="text-white bg-primary hover:bg-primary-dark px-9 w-full">
                    Xong
                </Button>
            </DialogFooter>
        </div>
    )
}

export default PostFormPrivacyStep;
