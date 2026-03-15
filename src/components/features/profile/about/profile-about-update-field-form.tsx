'use client'

import { ABOUT_ITEM_TYPES, PRIVACY_TYPES } from "@/constants/profile-about";
import { AboutItemType, PrivacyType } from "./profile-about-item.type";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getPrivacyIconByType, getPrivacyTitleByType } from "./about.utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import ProfileFieldPrivacyModal from "../profile-field-privacy/modal";

type ProfileAboutUpdateFieldFormProps = {
    type: AboutItemType;
    content: string | null;
    privacy: PrivacyType;
    desc?: string;
    onSave: () => void;
    onCancel: () => void;
}

export default function ProfileAboutUpdateFieldForm({
    type,
    content,
    privacy,
    desc,
    onSave,
    onCancel,
}: ProfileAboutUpdateFieldFormProps) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [privacyState, setPrivacyState] = useState<PrivacyType>(privacy);
    const [updateFieldValue, setUpdateFieldValue] = useState<string>(content || "");

    return (
        <>
            <Button
                variant="outline"
                className="flex items-center gap-1 py-2 px-3 h-9 rounded-sm hover:bg-secondary/80"
                disabled={type === ABOUT_ITEM_TYPES.BIO}
            >
                {getPrivacyIconByType(privacyState, "size-4")}
                <span className="text-md">{getPrivacyTitleByType(privacyState)}</span>
            </Button>
            <div className="flex flex-col gap-5 mt-3">
                <span className="text-md font-semibold">{desc}</span>
                <div>
                    <Textarea
                        value={updateFieldValue}
                        onChange={(e) => setUpdateFieldValue(e.target.value)}
                        placeholder={desc}
                        maxLength={101}
                        className="w-full resize-none h-16"
                    />
                    <span className="text-xs text-gray-500 text-start mt-1">
                        {updateFieldValue.length}/101
                    </span>
                    <Separator className="w-full bg-[#ced1d5] h-0.5 my-3" />
                    <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" className="h-9 px-3 py-0 hover:bg-secondary" onClick={onCancel}>Huỷ</Button>
                        <Button className="h-9 px-3 py-0 text-white" onClick={onSave}>Lưu</Button>
                    </div>
                </div>
            </div>
            <ProfileFieldPrivacyModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
        </>
    )
}
