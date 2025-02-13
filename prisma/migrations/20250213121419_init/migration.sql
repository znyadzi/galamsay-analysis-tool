-- CreateTable
CREATE TABLE "AnalysisResult" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "totalGalamseySites" INTEGER NOT NULL,
    "regionWithHighestGalamseySites" TEXT NOT NULL,
    "citiesExceedingThreshold" TEXT[],
    "regionalSiteAverages" JSONB NOT NULL,
    "threshold" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnalysisResult_pkey" PRIMARY KEY ("id")
);
