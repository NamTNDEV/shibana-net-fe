'use client';

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";

const profileTabs = [
    {
        label: "Tất cả",
        value: "all",
    },
    {
        label: "Giới thiệu",
        value: "about",
    },
    {
        label: "Ảnh",
        value: "photos",
    },
    {
        label: "Bạn bè",
        value: "friends",
    },
    {
        label: "Reels",
        value: "reels",
    },
]

const getCurrentTabFromPathname = (pathname: string) => {
    return pathname.split("/").length == 2 ? "all" : pathname.split("/").pop();
}

export default function ProfileTabs() {
    const router = useRouter();
    const pathname = usePathname();
    const currentTab = getCurrentTabFromPathname(pathname);

    const handleChangeTab = (tabValue: string) => {
        const originPathname = pathname.split("/").slice(0, 2).join("/");
        const newPathname = `${originPathname}/${tabValue === "all" ? "" : tabValue}`;
        router.push(newPathname);
    }
    return (
        <Tabs defaultValue={currentTab} className="h-[60px] flex justify-center">
            <TabsList variant="line">
                {
                    profileTabs.map(
                        tab => (
                            <TabsTrigger
                                key={tab.value}
                                className="h-[60px] py-0 px-4 text-base font-semibold 
                    group-data-[orientation=horizontal]/tabs:after:h-[3px] 
                    group-data-[orientation=horizontal]/tabs:after:-bottom-px
                    hover:cursor-pointer hover:bg-foreground/5"
                                value={tab.value}
                                onClick={() => handleChangeTab(tab.value)}
                            >
                                {tab.label}
                            </TabsTrigger>
                        )
                    )
                }
            </TabsList>
        </Tabs>
    )
}
