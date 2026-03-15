import { RadioGroup } from "@/components/ui/radio-group";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@/components/ui/field";

type ProfileFieldPrivacyModalListProps = {

}

export default function ProfileFieldPrivacyModalList({ }: ProfileFieldPrivacyModalListProps) {
    return (
        <RadioGroup defaultValue="public" className="bg-white">
            <FieldLabel htmlFor="public">
                <Field orientation="horizontal" className="flex flex-row items-center! cursor-pointer">
                    <FieldContent className="flex flex-row items-center gap-3">
                        <div className="size-[60px] rounded-full bg-gray-200 flex items-center justify-center">
                            <div className="size-6 rounded-full bg-gray-500"></div>
                        </div>
                        <div>
                            <FieldTitle>Công khai</FieldTitle>
                            <FieldDescription>
                                Bất kỳ ai ở trên hoặc ngoài Facebook
                            </FieldDescription>
                        </div>
                    </FieldContent>
                    <RadioGroupItem value="public" id="public" className="border-gray-400 size-5 p-0.5 cursor-pointer data-[state=checked]:border-primary" />
                </Field>
            </FieldLabel>
            <FieldLabel htmlFor="private">
                <Field orientation="horizontal" className="flex flex-row items-center! cursor-pointer">
                    <FieldContent className="flex flex-row items-center gap-3">
                        <div className="size-[60px] rounded-full bg-gray-200 flex items-center justify-center">
                            <div className="size-6 rounded-full bg-gray-500"></div>
                        </div>
                        <div>
                            <FieldTitle>Riêng tư</FieldTitle>
                            <FieldDescription>
                                Chỉ bạn có thể xem.
                            </FieldDescription>
                        </div>
                    </FieldContent>
                    <RadioGroupItem value="private" id="private" className="border-gray-400 size-5 p-0.5 cursor-pointer data-[state=checked]:border-primary" />
                </Field>
            </FieldLabel>
        </RadioGroup>
    )
}
