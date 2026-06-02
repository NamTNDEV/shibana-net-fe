'use client';

import { Button } from "@/components/ui/button";
import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn, getInitialName } from "@/lib/utils";
import { ArrowLeft, Images, X } from "lucide-react";
import { useState } from "react";
import ProfileAvatarContainer from "../../profile/header/avatar/profile-avatar-container";
import { useAuthStore } from "@/stores/auth.store";
import ProfileFieldPrivacyModalContent from "../../profile/profile-field-privacy/modal/content";
import { PrivacyType } from "../../profile/about/profile-about-item.type";
import { getPrivacyIconByType, getPrivacyTitleByType } from "../../profile/about/about.utils";

type StepTypes = "MAIN" | "PRIVACY"
type PostCreationFormProps = {
    mode: "CREATE" | "EDIT";
    initialData?: string;
    onContentChange?: (content: string) => void;
    onModalClose?: () => void;
}

const BOLD_TEXT_LENGTH_BOUNDARY = 84;

function PostCreationForm({ mode, initialData, onContentChange, onModalClose }: PostCreationFormProps) {
    const [content, setContent] = useState(initialData || "");
    const [selectedPrivacy, setSelectedPrivacy] = useState<PrivacyType>("PUBLIC");

    const { authUser: user } = useAuthStore()
    const [step, setStep] = useState<StepTypes>("MAIN");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    if (!user) return null
    return (
        // <form onSubmit={handleSubmit} className="w-full">
        <form onSubmit={handleSubmit} className="w-full relative overflow-hidden">
            {/* <div className={cn(
                "w-[200%] flex transition-transform duration-300 ease-in-out",
                step === "MAIN" ? "translate-x-0" : "-translate-x-1/2"
            )}> */}
            {/* Step 1: Main content */}
            {/* <div className="w-1/2 flex flex-col max-h-[85vh]"> */}
            <div className={cn(
                "w-full flex flex-col max-h-[85vh] transition-all duration-300 ease-in-out",
                step === "MAIN"
                    ? "relative translate-x-0 opacity-100" // Hiện: Chiếm không gian
                    : "absolute top-0 left-0 -translate-x-full opacity-0 pointer-events-none" // Ẩn: Trở thành bóng ma trượt sang trái
            )}>
                <DialogHeader className="relative flex items-center justify-center h-15 rounded-t-lg py-4">
                    <DialogTitle className="px-4 text-xl font-bold">Tạo bài viết</DialogTitle>
                    <div
                        className="absolute w-9 h-9 flex items-center justify-center bg-secondary rounded-full hover:cursor-pointer hover:opacity-80 top-1/2 -translate-y-1/2 right-4"
                        onClick={onModalClose}
                    >
                        <X className="size-5" />
                    </div>
                    <DialogDescription className="hidden" />
                </DialogHeader>

                <Separator className="w-full bg-[#ced1d5] h-0.5" />

                <div className="px-4 flex flex-col items-center flex-1 overflow-hidden">
                    {/* TODO: Add user avatar and name here */}
                    <div className="w-full flex items-center justify-start gap-2 h-18 py-4">
                        <ProfileAvatarContainer
                            avatar={user.avatar}
                            initialName={getInitialName(user.firstName, user.lastName)}
                            avatarScale={user.avatarScale || 1}
                            avatarPositionX={user.avatarPositionX || 0}
                            avatarPositionY={user.avatarPositionY || 0}
                            containerSize={40}
                        />

                        <div className="flex flex-col items-start gap-0.5">
                            <h2 className="text-base font-semibold">{user.lastName} {user.firstName}</h2>
                            <Button
                                variant="outline" size="sm"
                                className="text-sm! px-2 py-1 h-7"
                                onClick={() => setStep("PRIVACY")}
                            >
                                <span className="flex items-center gap-1">
                                    {getPrivacyIconByType(selectedPrivacy, "size-3")} {getPrivacyTitleByType(selectedPrivacy)} ⏷
                                </span>
                            </Button>
                        </div>
                    </div>

                    {/* TODO: Implement auto-resizing textarea and dynamic font size based on content length */}
                    <div className="grid w-full flex-1 mx-4 mt-2 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300">
                        <div
                            aria-hidden="true"
                            className={cn(
                                "min-h-32.5 col-start-1 row-start-1 w-full h-full p-0 m-0 pointer-events-none break-all whitespace-pre-wrap text-left",
                                "text-2xl!",
                                content.length > BOLD_TEXT_LENGTH_BOUNDARY && "text-base!"
                            )}
                        >
                            {content}
                            {content.endsWith('\n') && <br />}
                        </div>

                        <Textarea
                            placeholder="__ ơi, bạn đang nghĩ gì thế?"
                            className={cn(
                                "break-all whitespace-pre-wrap text-2xl! text-transparent caret-black text-left",
                                "placeholder:text-2xl placeholder:text-gray-600",
                                "w-full h-full p-0 m-0 bg-transparent border-none",
                                "col-start-1 row-start-1 flex-1 resize-none rounded-none shadow-none overflow-hidden",
                                "focus:ring-0 p-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0",
                                content.length > BOLD_TEXT_LENGTH_BOUNDARY && "text-base!"
                            )}
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value)
                                onContentChange && onContentChange(e.target.value);
                            }}
                            autoFocus
                        />
                    </div>
                </div>

                <DialogFooter className="rounded-b-lg pb-4 px-4 mt-4">
                    <div className="w-full flex flex-col gap-3">
                        <div className="w-full flex items-center justify-between border rounded-md border-gray-300 shadow-sm p-2 mt-4">
                            <div className="px-2">
                                <span className="text-base text-black font-semibold">
                                    Thêm vào bài viết của bạn:
                                </span>
                            </div>

                            <div className="flex">
                                <div className="size-10 p-2 rounded-sm hover:bg-muted cursor-pointer flex items-center justify-center">
                                    <Images className="size-6" color="#00a90b" />
                                </div>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="text-white px-9 w-full"
                        >
                            Lưu
                        </Button>
                    </div>
                </DialogFooter>
            </div>

            {/* Step 2: Privacy settings */}
            {/* <div className="w-1/2 flex flex-col max-h-[70vh]"> */}
            <div className={cn(
                "w-full flex flex-col max-h-[85vh] transition-all duration-300 ease-in-out",
                step === "PRIVACY"
                    ? "relative translate-x-0 opacity-100" // Hiện: Chiếm không gian
                    : "absolute top-0 left-0 translate-x-full opacity-0 pointer-events-none" // Ẩn: Trở thành bóng ma trượt sang phải
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
            {/* </div> */}
        </form>)
}

export default PostCreationForm;
