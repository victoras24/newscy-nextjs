import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

export const AvatarComponent: React.FC<{image: string, fallback: string}> = ({image, fallback}) => {
	return (
		<Avatar>
  			<AvatarImage src={image} />
  			<AvatarFallback>{fallback}</AvatarFallback>
		</Avatar>
	)
}
