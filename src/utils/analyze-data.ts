import { DataFrame } from "danfojs";

/**
 * Performs data analysis on the cleaned DataFrame.
 */
export async function analyzeData(df: DataFrame, threshold: number) {
  // Compute total number of galamsey sites
  const totalSites = df["numofsites"].sum();

  // Find the region with the highest number of galamsey sites
  const regionSummary = df.groupby(["region"]).col(["numofsites"]).sum();
  const highestRegion = regionSummary
    .sortValues("numofsites_sum", { ascending: false })
    .iloc({ rows: [0] }).region[0];

  // Find cities where the number of sites exceeds the threshold
  const highCityDf = df.loc(df.column("numofsites").gt(threshold));
  const highCities = highCityDf["city"].values;

  // Compute average number of sites per region
  const avgSitesPerRegion = regionSummary["numofsites_sum"].div(
    regionSummary["region"].count()
  );

  return {
    totalSites,
    highestRegion,
    highCities,
    avgSitesPerRegion,
  };
}
