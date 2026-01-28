import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { cn } from "@/lib/utils";

type SocialLoginButtonProps = {
    isLoading: boolean
    className?: string
}

export default function SocialLoginButton({ isLoading, className }: SocialLoginButtonProps) {
    return (
        <Button
            type="button"
            variant="outline"
            className={cn("w-full h-12 rounded-xl hover:bg-secondary", className)}
            isLoading={isLoading}
            isShowSpinner={false}
        >
            <FcGoogle className="mr-2 h-5 w-5" />
            Tiếp tục với Google
        </Button>
    )
}
