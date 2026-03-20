'use client'
import { Button } from "@/components/ui/button";
import { ABOUT_ITEM_TYPES } from "@/constants/profile-about";
import { cn } from "@/lib/utils";
import { getIconByType, getPrivacyIconByType, getTitleWhenContentIsEmpty } from "./about.utils";
import { Pencil } from "lucide-react";
import { AboutItemPropType, PrivacyType } from "./profile-about-item.type";
import { useState } from "react";
import ProfileAboutUpdateFieldForm from "./profile-about-update-field-form";
import ProfileFieldPrivacyModal from "../profile-field-privacy/modal";
import { ProfileUpdateRequestBodyType } from "@/types/profile.type";
import { updateProfileAction } from "@/actions/profile.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const AboutItem = ({ type, title, subtitle, content, privacy, viewerContext }: AboutItemPropType) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleCancelEdit = () => {
        setIsEditing(false);
    }
    const handleUpdateProfileField = async (selectedPrivacy: PrivacyType, newContent?: string): Promise<void> => {
        try {
            const body: ProfileUpdateRequestBodyType = {
                privacyLevel: selectedPrivacy,
                fieldKey: type,
                content: newContent ?? content,
            }

            const response = await updateProfileAction(body);
            if (!response.success) {
                toast.error(response.message, { position: "bottom-right", richColors: true, duration: 2000 });
                return;
            }
            toast.success(response.message, { position: "bottom-right", richColors: true, duration: 2000 });
            router.refresh();
        } catch (error) {
            console.log("error:: ", error);
            toast.error("Lỗi hệ thống, vui lòng thử lại sau.", { position: "bottom-right", richColors: true, duration: 2000 });
        } finally {
            setIsOpenModal(false);
        }
    }

    if (!content && !viewerContext.isOwner) return <></>;
    return (
        <>
            <li className="group">
                <h2 className="text-lg font-bold mb-4">{title}</h2>
                {
                    !isEditing ? (
                        <div className={cn(
                            "flex items-start justify-between pl-4",
                            !content && "pl-0"
                        )}>
                            <div className={cn(
                                "flex items-start gap-3",
                                content && "flex-1",
                                !content && "hover:cursor-pointer hover:opacity-60 hover:bg-secondary/50 rounded-md py-2 px-3"
                            )}
                                onClick={() => !content && setIsEditing(true)}
                            >
                                {getIconByType(type)}
                                <div className={
                                    cn(
                                        "w-full",
                                        content && "px-3",
                                    )
                                }>
                                    <p className={cn(
                                        "text-base",
                                        !content && "text-gray-500"
                                    )}>
                                        {content ? content : getTitleWhenContentIsEmpty(type)}
                                    </p>
                                    {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
                                </div>
                            </div>
                            {
                                content && viewerContext.isOwner && (
                                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Button
                                            className="p-0 size-5 bg-outline hover:opacity-60"
                                            disabled={type === ABOUT_ITEM_TYPES.BIO}
                                            onClick={() => setIsOpenModal(true)}
                                        >
                                            {getPrivacyIconByType(privacy)}
                                        </Button>
                                        <Button
                                            className="size-9 bg-outline hover:bg-secondary/50 rounded-full"
                                            onClick={() => setIsEditing(true)}
                                            disabled={type === ABOUT_ITEM_TYPES.EMAIL}
                                        >
                                            <Pencil className="size-5 text-gray-600"
                                            />
                                        </Button>
                                    </div>
                                )
                            }
                        </div>
                    ) : (
                        <ProfileAboutUpdateFieldForm
                            type={type}
                            content={content}
                            privacy={privacy}
                            desc={getTitleWhenContentIsEmpty(type)}
                            onCancel={handleCancelEdit}
                            onUpdateProfileField={handleUpdateProfileField}
                            setIsEditing={setIsEditing}
                        />
                    )
                }
            </li>
            <ProfileFieldPrivacyModal
                isOpen={isOpenModal}
                setIsOpen={setIsOpenModal}
                onUpdatePrivacy={handleUpdateProfileField}
                defaultPrivacy={privacy} />
        </>
    )
}