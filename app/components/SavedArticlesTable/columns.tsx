"use client";

import { Article } from "@/app/types/db";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { DataTable } from "./data-table";
import { Ellipsis } from "lucide-react";

interface DataTableProps {
  data: Article[];
}

export const ArticlesTable: React.FC<DataTableProps> = ({ data }) => {
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
		cell: ({row}) => 
			<div className="flex items-center justify-center hover: cursor-pointer">
				<Ellipsis onClick={() => console.log("dropdown with actions")}/>
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
