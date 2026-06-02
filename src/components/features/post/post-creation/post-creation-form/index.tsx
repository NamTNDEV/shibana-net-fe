'use client';

import { useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { PrivacyType } from "../../../profile/about/profile-about-item.type";
import PostFormMainStep from "./post-form-main-step";
import PostFormPrivacyStep from "./post-form-privacy-step";

export type StepTypes = "MAIN" | "PRIVACY"
type PostCreationFormProps = {
    mode: "CREATE" | "EDIT";
    initialData?: string;
    onModalClose: () => void;
    onContentChange?: (content: string) => void;
}

export const BOLD_TEXT_LENGTH_BOUNDARY = 84;

function PostCreationForm({ mode, initialData, onContentChange, onModalClose }: PostCreationFormProps) {
    const [content, setContent] = useState(initialData || "");
    const [selectedPrivacy, setSelectedPrivacy] = useState<PrivacyType>("PUBLIC");

    const { authUser: user } = useAuthStore()
    const [step, setStep] = useState<StepTypes>("MAIN");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("📝 Submitted content ~~ ", content);
        console.log("🛡️ Selected privacy ~~ ", selectedPrivacy);
    }

    if (!user) return null
    return (
        <form onSubmit={handleSubmit} className="w-full relative overflow-hidden">
            <PostFormMainStep
                user={user}
                step={step}
                content={content}
                setContent={setContent}
                onContentChange={onContentChange}
                onModalClose={onModalClose}
                selectedPrivacy={selectedPrivacy}
                setStep={setStep}
            />

            <PostFormPrivacyStep
                selectedPrivacy={selectedPrivacy}
                setSelectedPrivacy={setSelectedPrivacy}
                step={step}
                setStep={setStep}
            />
        </form>)
}

export default PostCreationForm;




