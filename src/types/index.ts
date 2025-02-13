export interface AnalysisResult {
  id: string;
  totalGalamseySites: number;
  regionWithHighestGalamseySites: string;
  citiesExceedingThreshold: string[];
  regionalSiteAverages: RegionalSiteAverage[];
  threshold: number;
}

export interface RegionalSiteAverage {
  region: string;
  averageGalamseySiteCount: number;
}
