"use client"

import { Bookmark } from "lucide-react";
import supabaseClient from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

interface BookmarkProps {
    userId?: string;
    articleId: string;
    isArticleSaved: boolean;
}

export const BookmarkComponent: React.FC<BookmarkProps> = ({userId, articleId, isArticleSaved}) => {
    const router = useRouter()
    
        async function saveArticle(articleId: string) {
            if (!userId) {
                router.push("/login")
                return
            }

			const { error } = await supabaseClient
						.from("saved")
						.insert({
							userId,
							articleId
						})

            if (error) {
                console.error("Failed to save:", error);
            } else {
                router.refresh()
            }
		}

        async function unsaveArticle(articleId: string) {
        if (!userId) return

        const { error } = await supabaseClient
            .from("saved")
            .delete()
            .eq("userId", userId)
            .eq("articleId", articleId);

        if (error) {
            console.error("Failed to delete:", error);
        } else {
            router.refresh()
        }

        };

    return ( 
    <div>
        {
            isArticleSaved ? 
            <Bookmark onClick={() => unsaveArticle(articleId)} className="hover:cursor-pointer" fill="#16A34A"/> : 
            <Bookmark onClick={() => saveArticle(articleId)} className="hover:cursor-pointer"/>
        }
    </div>
    )
}