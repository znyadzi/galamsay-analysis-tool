"use client";

import { ColumnDef } from "@tanstack/react-table";

import Header from "../../header";
import { RegionalSiteAverage } from "@/types";

export const columns: ColumnDef<RegionalSiteAverage>[] = [
  {
    accessorKey: "region",
    header: ({ column }) => <Header column={column} title="Region" />,
  },
  {
    accessorKey: "averageGalamseySiteCount",
    header: ({ column }) => <Header column={column} title="Average" />,
  },
];
