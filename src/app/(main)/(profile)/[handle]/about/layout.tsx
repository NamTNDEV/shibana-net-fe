import ProfileAboutTabs from "@/components/features/profile/about/profile-about-tabs"

export default function AboutLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <section className="w-full p-4 flex justify-center">
            <div className="bg-white w-full lg:max-w-[1218px] lg:w-[73%] rounded-sm shadow-md flex flex-col md:flex-row">
                <div className="w-[35%] px-2 py-4">
                    <h2 className="px-2 pb-4 font-bold text-xl">
                        Giới thiệu
                    </h2>
                    <ProfileAboutTabs />
                </div>
                <div className="w-full h-px md:w-px md:h-full bg-[#ced1d5]"></div>
                <div className="flex-1 p-4">{children}</div>
            </div>
        </section>
    )
}