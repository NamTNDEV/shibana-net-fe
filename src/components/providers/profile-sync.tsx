'use client';

import { NEXT_SERVER_ROUTES } from "@/constants/api-route";
import { useAuthStore } from "@/stores/auth.store";
import { useEffect, useRef } from "react";

const MAX_RETRIES = 100;
const ORIGINAL_DELAY = 5000;

function ProfileBackgroundSync() {
    const { authUser, setAuthUser } = useAuthStore();
    let retryCount = useRef(0);

    useEffect(() => {
        if (!authUser || authUser?.profileReady) return;

        let syncInterval: NodeJS.Timeout | null = null;

        const syncProfile = async () => {
            if (retryCount.current >= MAX_RETRIES) {
                console.warn("⚠️ Đã đạt giới hạn polling, dừng đồng bộ ngầm !!");
                return;
            }

            const url = NEXT_SERVER_ROUTES.USERS.MY_ACCOUNT;
            const res = await fetch(url);
            const parsedRes = await res.json().catch(() => null);

            if (res.ok && parsedRes.data && parsedRes.data.profileReady) {
                console.log("✅ Profile đã sẵn sàng, cập nhật thông tin người dùng.");
                setAuthUser(parsedRes.data);
                return;
            } else {
                console.error("⏳ Profile chưa sẵn sàng, tiếp tục đồng bộ...");
                retryCount.current++;
                const nextDelay = retryCount.current * ORIGINAL_DELAY;
                syncInterval = setTimeout(syncProfile, nextDelay);
            }
        }

        syncInterval = setTimeout(syncProfile, ORIGINAL_DELAY);
        return () => {
            if (syncInterval) {
                clearTimeout(syncInterval);
            }
        }
    }, [authUser, setAuthUser]);

    return null;
}

export default ProfileBackgroundSync;
