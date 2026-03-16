'use client'

import ProfileFieldPrivacyModalList from "./list";
import { usePrivacyListQuery } from "@/queries/use-privacy-query";
import { toast } from "sonner";
import { HttpError } from "@/lib/http-errors";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { useEffect } from "react";

type ProfileFieldPrivacyModalContentProps = {
    isOpen: boolean;
}

export default function ProfileFieldPrivacyModalContent({ isOpen }: ProfileFieldPrivacyModalContentProps) {
    const router = useRouter();
    const { data, error, isLoading, isError, refetch } = usePrivacyListQuery();

    useEffect(() => {
        if (!isError && !error) return;

        if (error instanceof HttpError) {
            toast.error(error.payload.message, {
                position: "bottom-right",
                richColors: true,
                duration: 2000
            });

            if (error.payload.code === 401) router.push(ROUTES.AUTH.LOGIN);

        } else {
            toast.error("Lỗi hệ thống, vui lòng thử lại sau.", {
                position: "bottom-right",
                richColors: true,
                duration: 2000
            });
        }
    }, [isError, error, router])

    return (
        <div className="bg-white py-3 px-2">
            <ProfileFieldPrivacyModalList />
        </div>
    )
}
