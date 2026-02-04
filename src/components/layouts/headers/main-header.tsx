import Logo from '@/components/shared/logo'

export default function MainHeader() {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-10 h-14">
            <div className="mx-auto px-4 py-2 h-full flex items-center">
                <Logo />
            </div>
        </header>
    )
}
