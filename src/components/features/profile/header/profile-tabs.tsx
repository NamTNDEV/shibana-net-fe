'use client';

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

const getCurrentMainSubTabFromPathname = (pathname: string) => {
    const pathnameSegments = pathname.split("/").filter(Boolean);
    if (pathnameSegments.length <= 1) return "all";
    const mainSubPathname = pathnameSegments[1];
    return mainSubPathname;
}

export default function ProfileTabs() {
    const router = useRouter();
    const pathname = usePathname();
    const [currentTab, setCurrentTab] = useState(getCurrentMainSubTabFromPathname(pathname));

    useEffect(() => {
        setCurrentTab(getCurrentMainSubTabFromPathname(pathname));
    }, [pathname]);

    const handleChangeTab = (tabValue: string) => {
        const originPathname = pathname.split("/").filter(Boolean)[0];
        const newPathname = `/${originPathname}/${tabValue === "all" ? "" : tabValue}`;
        router.push(newPathname);
    }
    return (
        <Tabs value={currentTab} className="h-[60px] flex justify-center">
            <TabsList variant="line" >
                {
                    profileTabs.map(
                        tab => (
                            <TabsTrigger
                                key={tab.value}
                                className="h-[60px] py-0 px-4 text-base font-semibold 
                    group-data-[orientation=horizontal]/tabs:after:h-[3px] 
                    group-data-[orientation=horizontal]/tabs:after:-bottom-px
                    hover:cursor-pointer hover:bg-foreground/5
                    data-[state=active]:after:bg-primary data-[state=active]:text-primary
                    "
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
