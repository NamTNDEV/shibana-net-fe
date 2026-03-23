'use client'
import { Ban } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react';
import { toast } from 'sonner';
import { blockUserAction } from '@/actions/connect.action';

type BlockUserButtonPropsType = {
    blockeeId: string;
}

export default function BlockUserButton({ blockeeId }: BlockUserButtonPropsType) {
    const [isPending, startTransition] = useTransition();

    const handleBlockUser = async () => {
        if (isPending) return;
        startTransition(async () => {
            const response = await blockUserAction(blockeeId);
            if (!response.success) {
                toast.error(response.message, {
                    position: "bottom-right",
                    richColors: true,
                    duration: 1000,
                });
                return;
            }
            toast.success(response.message, {
                position: "bottom-right",
                richColors: true,
                duration: 3000,
            });
        });
    }

    return (
        <Button
            className="w-full h-8 flex items-center justify-start gap-1 bg-white rounded-sm"
            onClick={handleBlockUser}
            disabled={isPending}
            isLoading={isPending}
        >
            <Ban className="size-5" />
            <span className="text-base">Chặn</span>
        </Button>
    )
}
