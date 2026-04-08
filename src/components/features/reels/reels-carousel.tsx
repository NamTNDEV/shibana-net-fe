'use client';

import { CardContent } from "@/components/ui/card";

import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, useCarousel } from "@/components/ui/carousel";
import { CarouselPrevious } from "@/components/ui/carousel";
import { CarouselNext } from "@/components/ui/carousel";
import { useState } from "react";

export default function ReelsCarousel() {
    const [page, setPage] = useState(0);
    const [hasNext, setHasNext] = useState(true);

    return (
        <div className="bg-transparent my-1">
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-2">
                    {Array.from({ length: 50 }).map((_, index) => <ReelItem key={index} index={index} />)}
                </CarouselContent>
                {page > 0 && <div onClick={() => setPage(page - 1)}>
                    <CarouselPrevious className="left-4 size-12 hover:bg-gray-200 bg-white" />
                </div>}
                {hasNext && <div onClick={() => setPage(page + 1)}>
                    <CarouselNext className="right-4 size-12 hover:bg-gray-200 bg-white" />
                </div>}
            </Carousel>
        </div>
    )
}

export function ReelItem({ index }: { index: number }) {
    return (
        <CarouselItem key={index} className="pl-2 basis-[17.5%]">
            <div className="bg-secondary h-[200px] rounded-lg">
            </div>
        </CarouselItem>
    )
}
