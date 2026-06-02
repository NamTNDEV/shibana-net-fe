'use client'

import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';

export const renderTextWithHashtags = (content: string, isEnableLink: boolean = true) => {
    if (!content) { return null; }
    const regex = /(#[\p{L}\p{N}_]+)/gu;

    const matches = content.split(regex);

    return matches.map((match, index) => {
        if (match.match(regex)) {
            if (isEnableLink) {
                return (
                    <Link
                        key={index}
                        href={ROUTES.POST.HASHTAG.replace(":hashtag", match.toLowerCase().replace("#", ""))}
                        className="text-yellow-500 cursor-pointer hover:underline font-bold"
                    >
                        {match}
                    </Link>
                )
            } else {
                return (
                    <span key={index} className="bg-yellow-200 font-semibold">
                        {match}
                    </span>
                )
            }
        }
        return match;
    })
}

type PostBodyProps = {
    content: string;
}

const TRUNCATE_LIMIT = 100;

export default function PostBody({ content }: PostBodyProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const isLongContent = content.length > TRUNCATE_LIMIT;

    const displayedContent = isLongContent && !isExpanded ? content.slice(0, TRUNCATE_LIMIT) + "..." : content;

    return (
        <div className="px-3">
            <p className={cn(
                "text-sm whitespace-pre-wrap",
                content.length < 100 && "text-2xl",
            )}>
                {renderTextWithHashtags(displayedContent)}{' '}
                {isLongContent && !isExpanded && (
                    <span className="cursor-pointer hover:underline font-bold" onClick={() => setIsExpanded(true)}>
                        Xem thêm
                    </span>
                )}
            </p>
        </div>
    )
}
