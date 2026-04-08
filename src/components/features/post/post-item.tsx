'use client';

import { Button } from "@/components/ui/button";
import { PrivacyType } from "../profile/about/profile-about-item.type";
import ProfileAvatarContainer from "../profile/header/avatar/profile-avatar-container";
import { getPrivacyIconByType } from "../profile/about/about.utils";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { MessageCircle, ThumbsUp } from "lucide-react";

export type DisplayMode = "NEWSFEED" | "PREVIEW" | "DETAIL";

export type Post = {
    id: string;
    content: string;
    author: {
        userId: string;
        username: string;
        displayName: string;
        avatarMediaName: string | null;
        avatarScale: number | null;
        avatarPositionX: number | null;
        avatarPositionY: number | null;
    };
    privacy: PrivacyType;
    createdAt: string;
    commentCount: number;
}

type PostItemProps = {
    post: Post;
    displayMode: DisplayMode;
}

export default function PostItem({ displayMode, post }: PostItemProps) {
    return (
        <div className="w-full bg-white rounded-lg shadow-sm flex flex-col">
            <PostHeader author={post.author} createdAt={post.createdAt} privacy={post.privacy} />

            <PostBody content={post.content} />
            {/* <MediaGrid mediaList={[]} /> */}

            <PostActions commentCount={post.commentCount} />
        </div>
    )
}

type PostHeaderProps = {
    author: Post['author'];
    createdAt: string;
    privacy: PrivacyType;
}

export function PostHeader({ author, createdAt, privacy }: PostHeaderProps) {
    const router = useRouter();

    const handleProfileAvatarClick = () => {
        router.push(ROUTES.USER.PROFILE.replace(":handle", author.username));
    }

    return (
        <div className="px-3 pt-3 flex items-center gap-2 mb-2">
            <Button
                variant="ghost"
                size="icon-lg"
                className="hover:bg-transparent hover:opacity-90"
                onClick={handleProfileAvatarClick}
            >
                <ProfileAvatarContainer
                    avatar={author.avatarMediaName}
                    initialName={author.displayName}
                    avatarScale={author.avatarScale || 1}
                    avatarPositionX={author.avatarPositionX || 0}
                    avatarPositionY={author.avatarPositionY || 0}
                    containerSize={40}
                />
            </Button>

            <div className="flex flex-col">
                <span className="text-[15px] font-semibold cursor-pointer hover:underline" onClick={handleProfileAvatarClick}>{author.displayName}</span>
                <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500 hover:cursor-pointer hover:underline">{createdAt}</span>
                    <span className="text-[10px] text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{getPrivacyIconByType(privacy, "size-3")}</span>
                </div>
            </div>
        </div>
    )
}

type PostBodyProps = {
    content: string;
}

export function PostBody({ content }: PostBodyProps) {
    return (
        <div className="px-3">
            <p className={cn(
                "text-sm",
                content.length < 100 && "text-2xl",
            )}>{content}</p>
        </div>
    )
}

type PostActionsProps = {
    commentCount: number;
}

export function PostActions({ commentCount }: PostActionsProps) {
    return (
        <div className="h-11 flex items-center">
            <div className="flex items-center gap-2 h-full px-3 rounded-bl-lg hover:bg-muted cursor-pointer">
                <ThumbsUp className="size-5" />
                {commentCount ? commentCount : ""}
            </div>
            <div className="flex items-center gap-2 h-full px-3 hover:bg-muted cursor-pointer">
                <MessageCircle className="size-5" />
                {commentCount ? commentCount : ""}
            </div>
        </div>
    )
}

type MediaGridProps = {
    mediaList: string[];
}

export function MediaGrid({ mediaList }: MediaGridProps) {
    return (
        <div>
            <p>MediaGrid</p>
        </div>
    )
}