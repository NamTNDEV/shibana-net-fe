'use client';

import { Button } from "@/components/ui/button";
import { NEXT_SERVER_ROUTES } from "@/constants/api-route";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";

export default function ProfileItem() {
    const { authUser: user } = useAuthStore();
    const router = useRouter();
    console.log("User:: ", user);
    const handleGetMe = async () => {
        const response = await fetch(NEXT_SERVER_ROUTES.USER.ME);
        if (response.status === 401) {
            router.push(ROUTES.AUTH.LOGIN);
            return;
        }
        const { data } = await response.json();
        console.log(data);
    }
    return (
        <div>
            <h3>ProfileItem</h3>
            <Button onClick={handleGetMe}>Get Me</Button>
        </div>
    )
}
