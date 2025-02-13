"use client";

import useAnalysisResult from "@/hooks/use-analysis-result";
import DataTable from "@/components/app/data-tables/analysis-results/data-table";
import { columns } from "@/components/app/data-tables/analysis-results/columns";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Page = () => {
  const { analysisResultsQuery } = useAnalysisResult();

  if (analysisResultsQuery.isLoading) {
    return (
      <Table className="border">
        <TableCaption>A list of analysis results</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Filename</TableHead>
            <TableHead>Date created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-8" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  const { data: analysisResults } = analysisResultsQuery;

  if (!analysisResults) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">No analysis results found</p>
      </div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={analysisResults.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )}
    />
  );
};

export default Page;
