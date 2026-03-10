import { ROUTES } from "@/constants/routes";
import { redirect } from "next/navigation";

export default async function IntroPage({
    params
}: Readonly<{ params: Promise<{ handle: string }> }>) {
    const handle = decodeURIComponent((await params).handle);
    const redirectUrl = `${ROUTES.USER.PROFILE}/about`.replace("@:handle", handle);
    redirect(redirectUrl);
}
