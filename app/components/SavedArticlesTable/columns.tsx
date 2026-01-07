"use client";

import { SavedArticle } from "@/app/types/db";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<SavedArticle>[] = [
	{
		accessorKey: "rewritten_title",
		header: "Rewritten Title",
	},
	{
		accessorKey: "category",
		header: "Category",
	},
];
