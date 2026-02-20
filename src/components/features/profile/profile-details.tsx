import Link from "next/link"
import { Button } from "@/components/ui/button"

export type ProfileDetailsPropsType = {
    firstName: string;
    lastName: string;
}
export default function ProfileDetails({ firstName, lastName }: ProfileDetailsPropsType) {
    return (
        <div className="flex flex-col items-center justify-between lg:flex-row lg:items-start">
            <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold">{firstName} {lastName}</h1>
                <div className="pt-1 font-semibold">
                    <Link className="hover:underline" href="#!">
                        0 Người theo dõi
                    </Link>
                    <span className="mx-1">•</span>
                    <Link className="hover:underline" href="#!">
                        0 Người đang theo dõi
                    </Link>
                </div>
            </div>

            <div className="flex gap-2 md:pt-3 lg:pt-0">
                <Button>
                    Theo dõi
                </Button>
                <Button variant="outline">
                    Tin nhắn
                </Button>
            </div>
        </div>
    )
}
