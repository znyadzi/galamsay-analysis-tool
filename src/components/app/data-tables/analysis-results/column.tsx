"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import Header from "../header";
import { AnalysisResult } from "@/types";

export const columns: ColumnDef<AnalysisResult>[] = [
  {
    accessorKey: "filename",
    header: ({ column }) => <Header column={column} title="Filename" />,
    cell: ({ row }) => {
      const analysisResult = row.original;

      return (
        <Link
          className="text-blue-600 hover:underline"
          href={`/dashboard/analysis-results/${analysisResult.id}`}
        >
          {analysisResult.filename}
        </Link>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <Header column={column} title="Date created" />,
    cell: ({ row }) => {
      const analysisResult = row.original;

      return format(new Date(analysisResult.createdAt), "PPPPp");
    },
  },
];
