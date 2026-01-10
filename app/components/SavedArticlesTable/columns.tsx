"use client";

import { Article } from "@/app/types/db";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { DataTable } from "./data-table";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { ActionDropdown } from "../actionDropdown";

interface DataTableProps {
  data: Article[];
}

export const ArticlesTable: React.FC<DataTableProps> = ({ data }) => {
  const [isActionOpen, setIsActionOpen] = useState<boolean>(false);
  const router = useRouter();

  const columns: ColumnDef<Article>[] = [
    {
      accessorKey: "rewritten_title",
      header: "Title",
      cell: ({ row }) => (
        <div
          className="cursor-pointer hover:underline"
          onClick={() => router.push(`/article/${row.original.id}`)}
        >
          {row.original.rewritten_title}
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
    },
	{
		accessorKey: "actions",
		header: "Actions",
		cell: () => 
			<div className="flex items-center justify-center hover: cursor-pointer">
				<Ellipsis onClick={() => setIsActionOpen(prev => !prev)}/>
        {isActionOpen && <ActionDropdown />}
			</div>
		
	}
  ];

  return (
    <div className="space-y-2">
	  <h2 className="text-2xl font-semibold">Saved Articles</h2>
      <p className="text-sm text-gray-500">Click a title to view the full article</p>
      <DataTable columns={columns} data={data} />
    </div>
  );
};
