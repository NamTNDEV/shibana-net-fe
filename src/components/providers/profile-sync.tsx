'use client';

import { NEXT_SERVER_ROUTES } from "@/constants/api-route";
import { useAuthStore } from "@/stores/auth.store";
import { useEffect, useRef } from "react";

const MAX_RETRIES = 100;
const ORIGINAL_DELAY = 5000;

function ProfileBackgroundSync() {
    const authUser = useAuthStore((state) => state.authUser);
    const setAuthUser = useAuthStore((state) => state.setAuthUser);
    let retryCount = useRef(0);
    let syncInterval = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!authUser || authUser?.profileReady) return;

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
                window.location.reload();
                return;
            } else {
                console.error("⏳ Profile chưa sẵn sàng, tiếp tục đồng bộ...");
                retryCount.current++;
                const nextDelay = retryCount.current * ORIGINAL_DELAY;
                syncInterval.current = setTimeout(syncProfile, nextDelay);
            }
        }

        syncInterval.current = setTimeout(syncProfile, ORIGINAL_DELAY);
        return () => {
            if (syncInterval.current) {
                clearTimeout(syncInterval.current);
            }
        }
    }, [authUser?.userId, authUser?.profileReady, setAuthUser]);

    return null;
}

export default ProfileBackgroundSync;
