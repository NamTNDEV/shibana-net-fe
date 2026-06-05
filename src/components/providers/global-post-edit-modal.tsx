'use client';

import { Dialog, DialogContent } from "@/components/ui/dialog";
import PostMutationForm from "../features/post/post-creation/post-mutation-form";
import { usePostModalStore } from "@/stores/post-edit-modal.store";
import { useGetPostFromCache } from "@/hooks/use-get-post-from-cache";

function GlobalPostEditModal() {
    const { editingPostId, closeModal } = usePostModalStore();
    const postToEdit = useGetPostFromCache(editingPostId);
    return (
        <Dialog open={!!editingPostId} onOpenChange={(open) => !open && closeModal()}>
            <DialogContent className="p-0 gap-0 bg-white max-w-125 overflow-hidden" showCloseButton={false}>
                {editingPostId && postToEdit && (
                    <PostMutationForm
                        postId={editingPostId}
                        mode="EDIT"
                        onModalClose={closeModal}
                        initialData={postToEdit.content}
                        initialPrivacy={postToEdit.privacy as any}
                    />
                )}
            </DialogContent>
        </Dialog>
    )
}

export default GlobalPostEditModal;
