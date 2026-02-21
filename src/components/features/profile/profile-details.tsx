'use client'
import Link from "next/link"
import ProfileActions from "./profile-actions";
import { useAuthStore } from "@/stores/auth.store";

export type ProfileDetailsPropsType = {
    userId: string;
    firstName: string;
    lastName: string;
}
export default function ProfileDetails({ firstName, lastName, userId }: ProfileDetailsPropsType) {
    const { authUser } = useAuthStore();

    return (
        <div className="flex flex-col items-center justify-between lg:flex-row lg:items-start">
            <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold">{firstName} {lastName}</h1>
                <div className="pt-1 font-semibold">
                    <Link className="hover:underline" href="#!">
                        0 Người theo dõi
                    </Link>
                    <span className="mx-1">•</span>
                    <Link className="hover:underline" href="#!">
                        0 Người đang theo dõi
                    </Link>
                </div>
            </div>

            <ProfileActions isOwner={userId === authUser?.userId} />
        </div>
    )
}
