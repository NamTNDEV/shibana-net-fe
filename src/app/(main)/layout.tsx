import { userService } from "@/services/user.service";

export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // const user = await userService.getMe();
    // console.log("User:: ", user);

    return (
        <div>
            <h1>MainLayout</h1>
            {children}
        </div>
    )
}
