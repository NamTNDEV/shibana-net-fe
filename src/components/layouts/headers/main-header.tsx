import { SearchInput } from '@/components/shared/search-input'
import { userService } from '@/services/user.service';
import HeaderAction from './header-action';
import Logo from '@/components/shared/logo';

export default async function MainHeader() {
    const user = await userService.getMe();
    return (
        <div className="sticky top-0 z-50 flex h-14 w-full items-center justify-between bg-white px-4 shadow-sm sm:px-6">
            <div className="w-[280px] shrink-0">
                <Logo />
            </div>

            <div className="flex flex-1 justify-center px-4">
                {user && <SearchInput />}
            </div>

            <div className="w-[280px] shrink-0">
                <HeaderAction user={user} />
            </div>
        </div>
    )
}
