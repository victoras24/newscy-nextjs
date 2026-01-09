"use client";

import { Article } from "@/app/types/db";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { DataTable } from "./data-table";

interface DataTableProps {
  data: Article[];
}

export const ArticlesTable: React.FC<DataTableProps> = ({ data }) => {
  const router = useRouter();

  const columns: ColumnDef<Article>[] = [
    {
      accessorKey: "rewritten_title",
      header: "Rewritten Title",
      cell: ({ row }) => (
        <div
          className="cursor-pointer hover:underline text-blue-600"
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
  ];

  return (
    <div className="space-y-2">
	  <h2 className="text-2xl font-semibold">Saved Articles</h2>
      <p className="text-sm text-gray-500">Click a title to view the full article</p>
      <DataTable columns={columns} data={data} />
    </div>
  );
};
