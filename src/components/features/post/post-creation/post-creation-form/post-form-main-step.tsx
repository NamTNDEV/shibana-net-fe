'use client'

import { PrivacyType } from "@/components/features/profile/about/profile-about-item.type"
import { BOLD_TEXT_LENGTH_BOUNDARY, StepTypes } from "."
import { MyAccountMetadataResponseDataType } from "@/types/user.type"
import { DialogFooter, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Images, X } from "lucide-react"
import { cn, getInitialName } from "@/lib/utils"
import ProfileAvatarContainer from "@/components/features/profile/header/avatar/profile-avatar-container"
import { getPrivacyIconByType, getPrivacyTitleByType } from "@/components/features/profile/about/about.utils"
import { renderTextWithHashtags } from "../../post-item/post-item-body"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

type PostFormMainStepProps = {
    content: string
    step: StepTypes
    selectedPrivacy: PrivacyType
    user: MyAccountMetadataResponseDataType
    onModalClose: () => void
    setStep: (step: StepTypes) => void
    setContent: (content: string) => void
    onContentChange?: (content: string) => void
    isCreatingPost: boolean
}

const PostFormMainStep = ({
    user,
    step,
    content,
    setStep,
    setContent,
    onModalClose,
    selectedPrivacy,
    onContentChange,
    isCreatingPost,
}: PostFormMainStepProps) => {
    return (
        <div className={cn(
            "w-full flex flex-col max-h-[85vh] transition-all duration-300 ease-in-out",
            step === "MAIN"
                ? "relative translate-x-0 opacity-100"
                : "absolute top-0 left-0 -translate-x-full opacity-0 pointer-events-none"
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
                            type="button"
                            disabled={isCreatingPost}
                        >
                            <span className="flex items-center gap-1">
                                {getPrivacyIconByType(selectedPrivacy, "size-3")} {getPrivacyTitleByType(selectedPrivacy)} ⏷
                            </span>
                        </Button>
                    </div>
                </div>

                <div className="grid w-full flex-1 mx-4 mt-2 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300">
                    <div
                        aria-hidden="true"
                        className={cn(
                            "col-start-1 row-start-1 w-full h-full p-0 m-0 pointer-events-none break-all whitespace-pre-wrap text-left font-sans leading-normal",
                            "text-2xl!",
                            content.length > BOLD_TEXT_LENGTH_BOUNDARY && "text-base!"
                        )}
                    >
                        {renderTextWithHashtags(content, false)}
                        {content.endsWith('\n') && <br />}
                    </div>

                    <Textarea
                        placeholder="__ ơi, bạn đang nghĩ gì thế?"
                        className={cn(
                            "col-start-1 row-start-1 w-full h-full p-0 m-0 resize-none outline-none bg-transparent border-none overflow-hidden break-all whitespace-pre-wrap text-left rounded-none font-sans leading-normal",
                            "text-2xl! text-transparent caret-black",
                            "placeholder:text-gray-600 focus:ring-0 border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus:border",
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
                        isLoading={isCreatingPost}
                        disabled={content.trim().length === 0}
                    >
                        Lưu
                    </Button>
                </div>
            </DialogFooter>
        </div>
    )
}

export default PostFormMainStep;
