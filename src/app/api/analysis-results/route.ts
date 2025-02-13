import { NextRequest, NextResponse } from "next/server";

import {
  createAnalysisResult,
  readAnalysisResults,
} from "../../../../prisma/db";

import { cleanData } from "@/utils/clean-data";
import { analyzeData } from "@/utils/analyze-data";

/**
 * GET handler to fetch all previous analysis results.
 */
export async function GET() {
  try {
    const analysisResults = await readAnalysisResults();

    return NextResponse.json({ analysisResults });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { errMsg: "Error reading analysis results." },
      { status: 500 }
    );
  }
}

/**
 * POST handler to upload CSV, clean data, and perform analysis.
 */
export async function POST(req: NextRequest) {
  try {
    // Parse form data
    const formData = await req.formData();
    const file = formData.get("file");
    const threshold = Number(formData.get("threshold"));

    if (!file || isNaN(threshold)) {
      return NextResponse.json(
        { error: "Missing file or invalid threshold" },
        { status: 400 }
      );
    }

    // Convert file to text
    const fileText = await (file as File).text();

    // Clean the data
    const cleanedDf = await cleanData(fileText);

    // Perform analysis
    const analysisResult = await analyzeData(cleanedDf, threshold);

    // Save result to database
    const savedResult = await createAnalysisResult(
      (file as File).name,
      analysisResult.totalSites,
      analysisResult.highestRegion,
      analysisResult.highCities,
      analysisResult.avgSitesPerRegion,
      threshold
    );

    return NextResponse.json({ message: "Analysis completed", savedResult });
  } catch (err) {
    console.error("Error processing file:", err);
    return NextResponse.json(
      { error: "Something went wrong while processing the file." },
      { status: 500 }
    );
  }
}
