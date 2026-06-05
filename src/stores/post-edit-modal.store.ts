import { create } from 'zustand';

type PostModalState = {
    editingPostId: string | null;
    openEditModal: (postId: string) => void;
    closeModal: () => void;
}

export const usePostModalStore = create<PostModalState>((set) => ({
    editingPostId: null,
    openEditModal: (postId) => set({ editingPostId: postId }),
    closeModal: () => set({ editingPostId: null }),
}));