import { ROLES } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

export default async function AdminMainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await userService.getMe();
    if (!user) {
        return redirect(ROUTES.AUTH.LOGIN);
    }

    const isAdmin = user.roles.some(role => role.name === ROLES.ADMIN);
    if (!isAdmin) {
        return redirect(ROUTES.FORBIDDEN);
    }
    return (
        <div>
            <h1>AdminMainLayout</h1>
            {children}
        </div>
    );
}
