import { Button } from "@/components/ui/button";
import { ABOUT_ITEM_TYPES } from "@/constants/profile-about";
import { cn } from "@/lib/utils";
import { getIconByType, getPrivacyIconByType, getTitleWhenContentIsEmpty } from "./about.utils";
import { Pencil } from "lucide-react";
import { AboutItemPropType } from "./profile-about-item.type";

export const AboutItem = ({ type, title, subtitle, content, privacy, isOwner = false }: AboutItemPropType) => {
    return (
        <li className="group">
            <h2 className="text-lg font-bold mb-4">{title}</h2>
            <div className={cn(
                "flex items-start justify-between pl-4",
                !content && "pl-0"
            )}>
                <div className={cn(
                    "flex items-start gap-3",
                    content && "flex-1",
                    !content && "hover:cursor-pointer hover:opacity-60 hover:bg-secondary/50 rounded-md py-2 px-3"
                )}>
                    {getIconByType(type)}
                    <div className={
                        cn(
                            "w-full",
                            content && "px-3",
                        )
                    }>
                        <p className="text-base">{content ? content : getTitleWhenContentIsEmpty(type)}</p>
                        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
                    </div>
                </div>
                {
                    content && isOwner && (
                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button className="p-0 size-5 bg-outline hover:opacity-60" disabled={type === ABOUT_ITEM_TYPES.BIO}>
                                {getPrivacyIconByType(privacy)}
                            </Button>
                            <Button className="size-9 bg-outline hover:bg-secondary/50 rounded-full">
                                <Pencil className="size-5 text-gray-600" />
                            </Button>
                        </div>
                    )
                }
            </div>
        </li>
    )
}