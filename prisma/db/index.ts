import { PrismaClient } from "@prisma/client";

import { RegionalSiteAverage } from "@/types";

const prismaClient = new PrismaClient();

export const createAnalysisResult = async (
  filename: string,
  totalGalamseySites: number,
  regionWithHighestGalamseySites: string,
  citiesExceedingThreshold: string[],
  regionalSiteAverages: RegionalSiteAverage[],
  threshold: number
) => {
  try {
    const analysisResult = await prismaClient.analysisResult.create({
      data: {
        filename,
        totalGalamseySites,
        regionWithHighestGalamseySites,
        citiesExceedingThreshold,
        regionalSiteAverages: JSON.stringify(regionalSiteAverages),
        threshold,
      },
    });

    return analysisResult;
  } catch (err) {
    console.error("Error from `createGroup` function:", err);

    throw err;
  }
};

export const readAnalysisResults = async () => {
  try {
    const analysisResults = await prismaClient.analysisResult.findMany();

    const parsedAnalysisResults = analysisResults.map((analysisResult) => ({
      ...analysisResult,
      regionalSiteAverages: JSON.parse(
        analysisResult.regionalSiteAverages as string
      ),
    }));

    return parsedAnalysisResults;
  } catch (err) {
    console.error("Error from `readAnalysisResults` function:", err);

    throw err;
  }
};
