"use client"
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import supabaseClient from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

interface BookmarkProps {
    userId: string;
    articleId: string;
}

export const BookmarkComponent: React.FC<BookmarkProps> = ({userId, articleId}) => {
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
        {isSaved ? <Bookmark onClick={() => saveArticle(userId, articleId)} className="hover:cursor-pointer" fill="white"/> : <Bookmark onClick={() => saveArticle(userId, articleId)} className="hover:cursor-pointer"/>}
    </div>
}