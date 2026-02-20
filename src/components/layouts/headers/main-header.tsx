import { SearchInput } from '@/components/shared/search-input'
import HeaderAction from './header-action';
import Logo from '@/components/shared/logo';
import { MyAccountMetadataResponseDataType } from '@/types/user.type';

type MainHeaderPropsType = {
    user: MyAccountMetadataResponseDataType | null;
}

export default async function MainHeader({ user }: MainHeaderPropsType) {
    return (
        <div className="sticky top-0 z-50 flex h-14 w-full items-center justify-between bg-white px-4 shadow-sm sm:px-6">
            <div className="flex items-center gap-2 lg:w-[280px]">
                <Logo />
                <div className="block lg:hidden size-10 bg-red-500">
                </div>
            </div>

            <div className="hidden lg:block">
                {user && <SearchInput />}
            </div>

            <div className="w-[280px]">
                <HeaderAction user={user} />
            </div>
        </div>
    )
}
