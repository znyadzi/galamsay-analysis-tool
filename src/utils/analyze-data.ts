import { RegionalSiteAverage } from "@/types";
import { DataFrame } from "danfojs";

/**
 * Performs data analysis on the cleaned DataFrame.
 */
export async function analyzeData(df: DataFrame, threshold: number) {
  // 1. Calculate total number of sites
  const totalSites = df["numofsites"].sum();

  // 2. Find region with highest number of sites
  const regionSums = df.groupby(["region"]).agg({ numofsites: "sum" });
  const sortedRegions = regionSums.sortValues("numofsites_sum", {
    ascending: false,
  });
  const highestRegion = sortedRegions["region"].values[0];

  // 3. Find cities exceeding threshold
  const highSiteCities = df.query(df["numofsites"].gt(threshold));
  const citiesAboveThreshold = highSiteCities
    .column("city")
    .values.map((city) => city as string);

  // 4. Calculate average sites per region
  const regionAverages = df.groupby(["region"]).agg({ numofsites: "mean" });
  const averagesPerRegion: RegionalSiteAverage[] = [];

  regionAverages.column("region").values.forEach((region, index) => {
    averagesPerRegion.push({
      region: region as string,
      averageGalamseySiteCount: Number(
        regionAverages["numofsites_mean"].values[index].toFixed(1)
      ),
    });
  });

  return {
    totalSites,
    highestRegion,
    highCities: citiesAboveThreshold,
    avgSitesPerRegion: averagesPerRegion,
  };
}
