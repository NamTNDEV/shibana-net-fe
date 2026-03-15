'use client'

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import ProfileFieldPrivacyModalContent from "./content"

type ProfileFieldPrivacyModalProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function ProfileFieldPrivacyModal({ isOpen, setIsOpen }: ProfileFieldPrivacyModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="p-0 min-w-screen sm:min-w-[548px] gap-0" showCloseButton={false}>
                <DialogHeader className="relative flex items-center justify-center px-[60px] h-[60px] bg-white rounded-t-lg">
                    <DialogTitle className="px-4 text-xl font-bold">Chọn đối tượng hiển thị</DialogTitle>
                    <div
                        className={
                            cn(
                                "absolute w-9 h-9 flex items-center justify-center bg-secondary rounded-full hover:cursor-pointer hover:opacity-80 top-1/2 -translate-y-1/2 right-4",
                                isLoading && "pointer-events-none opacity-30"
                            )
                        }
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="size-5" />
                    </div>
                    <DialogDescription className="hidden" />
                </DialogHeader>
                <Separator className="w-full bg-[#ced1d5] h-0.5" />
                <ProfileFieldPrivacyModalContent isOpen={isOpen} />
                <Separator className="w-full bg-[#ced1d5] h-0.5" />
                <DialogFooter className="p-4 flex justify-end bg-white rounded-b-lg">
                    <DialogClose asChild>
                        <Button type="button" className="bg-transparent text-primary hover:bg-secondary p-3">Huỷ</Button>
                    </DialogClose>
                    <Button type="button" className="text-white px-9 min-w-10" isLoading={isLoading}>Lưu</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
