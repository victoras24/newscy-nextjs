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
                        console.log("data", data)
            if (data.status === 201) {
                setIsSaved(true)
                router.refresh()
            }
		}

    return <div>
        {isArticleSaved ? <Bookmark onClick={() => saveArticle(userId, articleId)} className="hover:cursor-pointer" fill="white"/> : <Bookmark onClick={() => saveArticle(userId, articleId)} className="hover:cursor-pointer"/>}
    </div>
}