'use client';

import { Button } from "@/components/ui/button";

export default function PostItem() {
    return (
        <div className="w-full h-[60px] bg-white rounded-lg shadow-sm p-4 px-6 flex items-center justify-between">
            <p>PostItem</p>
            <div>
                <Button onClick={() => {
                    console.log("Anie click");
                }}>
                    Anie
                </Button>
            </div>
        </div>
    )
}
