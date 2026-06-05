'use client';

import { useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { PrivacyType } from "../../../profile/about/profile-about-item.type";
import PostFormMainStep from "./post-form-main-step";
import PostFormPrivacyStep from "./post-form-privacy-step";
import { useCreatePostMutation, useEditPostMutation } from "@/hooks/tanstacks/mutations/use-post-mutation";
import { CreatePostRequestBodyType, EditPostRequestBodyType } from "@/types/post.type";

export type StepTypes = "MAIN" | "PRIVACY"
type PostMutationFormProps = {
    postId?: string;
    mode?: "CREATE" | "EDIT";
    initialData?: string;
    initialPrivacy?: PrivacyType;
    onModalClose: () => void;
    onContentChange?: (content: string) => void;
}

export const BOLD_TEXT_LENGTH_BOUNDARY = 84;

function PostMutationForm({ postId, mode = 'CREATE', initialData, initialPrivacy, onContentChange, onModalClose }: PostMutationFormProps) {
    const [content, setContent] = useState(initialData || "");
    const [selectedPrivacy, setSelectedPrivacy] = useState<PrivacyType>(initialPrivacy || "PUBLIC");

    const { authUser: user } = useAuthStore()
    const [step, setStep] = useState<StepTypes>("MAIN");

    const handleMutationSuccess = () => {
        onContentChange?.("");
        onModalClose();
    }

    const {
        mutate: createPost,
        isPending: isCreatingPost,
    } = useCreatePostMutation(handleMutationSuccess)

    const {
        mutate: editPost,
        isPending: isEditingPost,
    } = useEditPostMutation(handleMutationSuccess)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!content.trim()) return;


        if (mode === "CREATE") {
            const body: CreatePostRequestBodyType = {
                content,
                privacy: selectedPrivacy,
            }
            createPost(body);
        } else {
            if (!postId) {
                console.error("Post ID is required for editing a post.");
                return;
            }
            const body: EditPostRequestBodyType = {
                id: postId,
                content,
                privacy: selectedPrivacy,
            }
            editPost(body);
        }
    }

    if (!user) return null
    const isProcessing = mode === "CREATE" ? isCreatingPost : isEditingPost;
    return (
        <form onSubmit={handleSubmit} className="w-full relative overflow-hidden">
            <PostFormMainStep
                mode={mode}
                user={user}
                step={step}
                content={content}
                setContent={setContent}
                onContentChange={onContentChange}
                onModalClose={onModalClose}
                selectedPrivacy={selectedPrivacy}
                setStep={setStep}
                isProcessing={isProcessing}
            />

            <PostFormPrivacyStep
                selectedPrivacy={selectedPrivacy}
                setSelectedPrivacy={setSelectedPrivacy}
                step={step}
                setStep={setStep}
            />
        </form>)
}

export default PostMutationForm;