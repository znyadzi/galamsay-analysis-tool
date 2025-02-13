export interface AnalysisResult {
  id: string;
  totalGalamseySites: number;
  regionWithMostSites: string;
  citiesExceedingThreshold: string[];
  regionalSiteAverages: RegionalSiteAverage[];
}

export interface DataPoint {
  city: string;
  region: string;
  galamseySiteCount: number;
}

export interface RegionalSiteAverage {
  region: string;
  averageGalamseySiteCount: number;
}
