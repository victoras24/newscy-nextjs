"use client"
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import supabaseClient from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

interface BookmarkProps {
    userId: string;
    articleId: string;
    isArticleSaved: boolean;
}

export const BookmarkComponent: React.FC<BookmarkProps> = ({userId, articleId, isArticleSaved}) => {
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const router = useRouter()
    
        async function saveArticle(userId: string, articleId: string) {
			const data = await supabaseClient
						.from("saved")
						.insert({
							userId,
							articleId
						})
                        
            if (data.status === 201) {
                setIsSaved(true)
                router.refresh()
            }
		}

        async function unsaveArticle(userId: string, articleId: string) {
        const { data, error } = await supabaseClient
            .from("saved")
            .delete()
            .eq("userId", userId)
            .eq("articleId", articleId);

        if (error) {
            console.error("Failed to delete:", error);
        } else {
            router.refresh()
            console.log("Deleted successfully:", data);
        }

        };

    return <div>
        {isArticleSaved ? <Bookmark onClick={() => unsaveArticle(userId, articleId)} className="hover:cursor-pointer" fill="white"/> : <Bookmark onClick={() => saveArticle(userId, articleId)} className="hover:cursor-pointer"/>}
    </div>
}