"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import { format } from "date-fns";
import { LoaderCircle } from "lucide-react";

import useAnalysisResult from "@/hooks/use-analysis-result";
import DataTable from "@/components/app/data-tables/analysis-results/analysis-result/data-table";
import { columns } from "@/components/app/data-tables/analysis-results/analysis-result/columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Page = () => {
  const { id } = useParams();
  const { analysisResultsQuery } = useAnalysisResult();
  const { data: analysisResults } = analysisResultsQuery;

  const analysisResult = useMemo(
    () => analysisResults?.find((analysisResult) => analysisResult.id === id),
    [analysisResults, id]
  );

  if (analysisResultsQuery.isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoaderCircle className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  if (!analysisResults) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">No analysis results found</p>
      </div>
    );
  }

  if (!analysisResult) {
    return (
      <div className="flex items-center justify-center h-96">
        No analysis result found with id: {id}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold">Analysis Result</h1>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">{analysisResult.filename}</h3>
        <p className="text-muted-foreground text-sm">
          {format(analysisResult.createdAt, "PPPPp")}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Galamsey Sites</CardTitle>
            <CardDescription>
              Total number of Galamsay sites across all cities.{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h1 className="text-4xl font-black">
              {analysisResult.totalGalamseySites}
            </h1>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Region with highest Galamsey Sites</CardTitle>
            <CardDescription>
              Region with the highest number of Galamsay sites.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h1 className="text-4xl font-black">
              {analysisResult.regionWithHighestGalamseySites}
            </h1>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Cities Exceeding Threshold</CardTitle>
          <CardDescription>
            List of cities where the galamsay sites exceed the threshold of{" "}
            {analysisResult.threshold}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside">
            {analysisResult.citiesExceedingThreshold.map((city, index) => (
              <li key={index}>{city}</li>
            ))}
          </ol>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Average Galamsey Sites per Region</CardTitle>
          <CardDescription>
            Average number of Galamsay sites per region.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={analysisResult.regionalSiteAverages}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
