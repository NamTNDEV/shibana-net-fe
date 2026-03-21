import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function MessageButton() {
    return (
        <Button
            className="flex items-center justify-center gap-1 px-3 h-9 text-white"
        >
            <MessageCircle className="size-4" />
            Nhắn tin
        </Button>
    )
}
