import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { cn } from "../lib/utils";

const barVariants = cva("flex justify-between items-center md:my-4 py-1 px-3", {
	variants: {
		variant: {
			primary: "bg-foreground text-background",
			secondary: "bg-background text-foreground",
			outline: "border-border bg-background border-y-4",
		},
	},
	defaultVariants: {
		variant: "primary",
	},
});

export const Bar: React.FC<{
	variant: VariantProps<typeof barVariants>["variant"];
	children?: ReactNode;
	className?: string;
}> = ({ children, className, variant }) => {
	return (
		<div className={cn(barVariants({ variant, className }))}>{children}</div>
	);
};
