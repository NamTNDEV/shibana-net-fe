'use client'

type AuthProvidersPropsType = {
    children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProvidersPropsType) {
    return (
        <>{children}</>
    )
}