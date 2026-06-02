'use client'

import { usePrivacyListQuery } from "@/queries/use-privacy-query";
import { Skeleton } from "@/components/ui/skeleton";
import { PrivacyType } from "../../about/profile-about-item.type";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@/components/ui/field";
import { getPrivacyDescriptionByType, getPrivacyIconByType, getPrivacyTitleByType } from "../../about/about.utils";
import { cn } from "@/lib/utils";

type ProfileFieldPrivacyModalContentProps = {
    selectedPrivacy: PrivacyType;
    setSelectedPrivacy: (privacy: PrivacyType) => void;
}

export default function ProfileFieldPrivacyModalContent({ selectedPrivacy, setSelectedPrivacy }: ProfileFieldPrivacyModalContentProps) {
    const { data, isLoading } = usePrivacyListQuery();
    return (
        <div className="bg-white py-3 px-2">
            {
                isLoading ? (
                    <ProfileFieldPrivacyModalContentLoading />
                ) : !data || data.length === 0 ? (
                    <ProfileFieldPrivacyModalContentEmpty />
                ) : (
                    <RadioGroup
                        className="bg-white"
                        value={selectedPrivacy}
                        onValueChange={(value) => {
                            setSelectedPrivacy(value as PrivacyType);
                        }}
                    >
                        {data.map((item) => (
                            <FieldLabel
                                key={item}
                                htmlFor={item.toString()}
                            >
                                <Field orientation="horizontal" className="flex flex-row items-center! cursor-pointer">
                                    <FieldContent className="flex flex-row items-center gap-3">
                                        <div className={cn(
                                            "size-15 rounded-full flex items-center justify-center",
                                            selectedPrivacy === item ? "bg-primary" : "bg-gray-200"
                                        )}>
                                            {getPrivacyIconByType(item)}
                                        </div>
                                        <div>
                                            <FieldTitle>{getPrivacyTitleByType(item)}</FieldTitle>
                                            <FieldDescription>
                                                {getPrivacyDescriptionByType(item)}
                                            </FieldDescription>
                                        </div>
                                    </FieldContent>
                                    <RadioGroupItem value={item} id={item} className="border-gray-400 size-5 p-0.5 cursor-pointer data-[state=checked]:border-primary" />
                                </Field>
                            </FieldLabel>
                        ))}
                    </RadioGroup>
                )
            }
        </div>
    )
}

function ProfileFieldPrivacyModalContentLoading() {
    return (
        <ul className="flex flex-col gap-3">
            <li>
                <Skeleton className="h-10 w-full bg-gray-200" />
            </li>
            <li>
                <Skeleton className="h-10 w-full bg-gray-200" />
            </li>
        </ul>
    )
}

function ProfileFieldPrivacyModalContentEmpty() {
    return (
        <p className="text-center text-gray-500">Không có quyền riêng tư nào.</p>
    )
}