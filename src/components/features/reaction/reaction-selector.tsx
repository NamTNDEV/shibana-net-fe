'use client'

import { REACTION_TYPES, ReactionType } from "@/constants/reaction-type";
import ReactionIcon from "./reaction-icon";

const REACTION_TYPES_LIST = Array.from(Object.values(REACTION_TYPES));

export type ReactionSelectorProps = {
    onSelectAction: (type: ReactionType) => void;
}

export function ReactionSelector({ onSelectAction }: ReactionSelectorProps) {
    return (
        <div className="absolute bottom-10 left-1 z-50 flex items-center gap-2 rounded-full
         bg-white px-3 py-1.5 shadow-lg ring-1 ring-black/5 animate-in slide-in-from-bottom-4 fade-in zoom-in-95 duration-200">
            {REACTION_TYPES_LIST.map((type) => (
                <div
                    key={type}
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelectAction(type);
                    }}
                    className="group/icon cursor-pointer transition-transform hover:scale-125 origin-bottom"
                >
                    <ReactionIcon
                        type={type}
                        variant="animated"
                        className="size-10 pointer-events-none"
                    />
                </div>
            ))}
        </div>
    )
}