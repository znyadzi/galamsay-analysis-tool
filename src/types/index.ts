export interface AnalysisResult {
  id: string;
  filename: string;
  totalGalamseySites: number;
  regionWithHighestGalamseySites: string;
  citiesExceedingThreshold: string[];
  regionalSiteAverages: RegionalSiteAverage[];
  threshold: number;
  createdAt: string;
}

export interface RegionalSiteAverage {
  region: string;
  averageGalamseySiteCount: number;
}
