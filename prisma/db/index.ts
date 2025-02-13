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

    return analysisResults;
  } catch (err) {
    console.error("Error from `readAnalysisResults` function:", err);

    throw err;
  }
};

export const readAnalysisResult = async (id: string) => {
  try {
    const analysisResult = await prismaClient.analysisResult.findUnique({
      where: { id },
    });

    return analysisResult;
  } catch (err) {
    console.error("Error from `readGroup` function:", err);

    throw err;
  }
};
