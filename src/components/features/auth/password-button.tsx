import { EyeIcon, EyeOffIcon } from 'lucide-react'

type PasswordButtonProps = {
    isPasswordVisible: boolean
    setIsPasswordVisible: (isPasswordVisible: boolean) => void
}

export default function PasswordButton({
    isPasswordVisible,
    setIsPasswordVisible
}: PasswordButtonProps) {

    return (
        <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground cursor-pointer p-2"
            aria-label={
                isPasswordVisible
                    ? "Ẩn mật khẩu"
                    : "Hiển thị mật khẩu"
            }
        >
            {isPasswordVisible ? (
                <EyeOffIcon className="size-6 hover:opacity-70 text-muted-foreground" />
            ) : (
                <EyeIcon className="size-6 hover:opacity-70 text-muted-foreground" />
            )}
        </button>
    )
}
