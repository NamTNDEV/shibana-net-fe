'use client';

import { useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { PrivacyType } from "../../../profile/about/profile-about-item.type";
import PostFormMainStep from "./post-form-main-step";
import PostFormPrivacyStep from "./post-form-privacy-step";
import { useCreatePostMutation } from "@/hooks/mutations/use-create-post-mutation";
import { CreatePostRequestBodyType } from "@/types/post.type";

export type StepTypes = "MAIN" | "PRIVACY"
type PostCreationFormProps = {
    mode: "CREATE" | "EDIT";
    initialData?: string;
    initialPrivacy?: PrivacyType;
    onModalClose: () => void;
    onContentChange?: (content: string) => void;
}

export const BOLD_TEXT_LENGTH_BOUNDARY = 84;

function PostCreationForm({ mode, initialData, initialPrivacy, onContentChange, onModalClose }: PostCreationFormProps) {
    const [content, setContent] = useState(initialData || "");
    const [selectedPrivacy, setSelectedPrivacy] = useState<PrivacyType>(initialPrivacy || "PUBLIC");

    const { authUser: user } = useAuthStore()
    const [step, setStep] = useState<StepTypes>("MAIN");

    const handleCreateSuccess = () => {
        setContent("");
        onContentChange?.("");
        onModalClose();
    }

    const {
        mutate: createPost,
        isPending: isCreatingPost,
    } = useCreatePostMutation(handleCreateSuccess)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!content.trim()) return;

        const body: CreatePostRequestBodyType = {
            content,
            privacy: selectedPrivacy,
        }
        createPost(body)
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
                isCreatingPost={isCreatingPost}
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