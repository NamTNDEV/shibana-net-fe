'use client';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ROUTES } from "@/constants/routes";
import { getHandledFromPathname } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const profileAboutTabs = [
    {
        label: "Giới thiệu",
        value: "directory_intro",
    },
    {
        label: "Thông tin cá nhân",
        value: "directory_personal_details",
    },
    {
        label: "Thông tin liên hệ",
        value: "directory_contact_info",
    },
]

const getCurrentTabFromPathname = (pathname: string) => {
    const pathnameSegments = pathname.split("/").filter(Boolean);
    return pathnameSegments.length <= 2 || pathnameSegments[2] === profileAboutTabs[0].value ? profileAboutTabs[0].value : pathnameSegments[2];
}

export default function ProfileAboutTabs() {
    const router = useRouter();
    const pathname = usePathname();
    const [currentTab, setCurrentTab] = useState(getCurrentTabFromPathname(pathname));

    useEffect(() => {
        setCurrentTab(getCurrentTabFromPathname(pathname));
    }, [pathname]);

    const handleChangeTab = (tabValue: string) => {
        const handledUsername = getHandledFromPathname(pathname);
        const newPathname = `${ROUTES.USER.EDIT}/${tabValue}`.replace("@:handle", handledUsername);
        router.push(newPathname);
    }
    return (
        <Tabs value={currentTab} orientation="vertical" className="min-h-[280px]">
            <TabsList variant="line" className="w-full p-0 gap-2" >
                {
                    profileAboutTabs.map(tab => (
                        <TabsTrigger
                            key={tab.value}
                            className="
                    data-[state=active]:bg-primary/10! data-[state=active]:after:hidden
                    data-[state=active]:text-primary! 
                    hover:cursor-pointer hover:bg-foreground/5 hover:text-gray-600
                    text-base! font-semibold! px-[10px] py-[12px] max-h-9
                    "
                            value={tab.value}
                            onClick={() => handleChangeTab(tab.value)}
                        >
                            {tab.label}
                        </TabsTrigger>
                    ))
                }
            </TabsList >
        </Tabs >
    )
}
