import { SearchInput } from '@/components/shared/search-input'
import HeaderAction from './header-action';
import Logo from '@/components/shared/logo';
import { MyAccountMetadataResponseDataType } from '@/types/user.type';

type MainHeaderPropsType = {
    user: MyAccountMetadataResponseDataType | null;
}

export default async function MainHeader({ user }: MainHeaderPropsType) {
    return (
        <div className="sticky top-0 z-50 flex h-14 w-full items-center justify-between bg-white px-4 shadow-sm">
            <div className="flex items-center gap-2 min-w-[100px] lg:min-w-[340px]">
                <Logo />
                <div className="block md:hidden size-10 bg-red-500">
                </div>
            </div>

            <div className="hidden md:block flex-1">{user && <SearchInput />}</div>

            <div className="min-w-[200px] lg:min-w-[340px]">
                <HeaderAction user={user} />
            </div>
        </div>
    )
}
