import * as dfd from "danfojs";
import Papa from "papaparse";

/**
 * Cleans CSV data: Fixes headers, removes duplicates, and handles invalid values.
 */
interface CsvRow {
  City: string;
  Region: string;
  Number_of_Galamsey_Sites: string;
}

export async function cleanData(rawCSV: string) {
  const { data, errors } = Papa.parse<CsvRow>(rawCSV, {
    header: true,
    skipEmptyLines: true,
  });

  if (errors.length > 0) {
    throw new Error("CSV contains formatting errors.");
  }

  // Check if the first row is an actual header or a data row
  const firstRow = Object.keys(data[0]);
  const expectedHeaders = ["City", "Region", "Number_of_Galamsey_Sites"];

  const isHeaderInvalid = !expectedHeaders.every((header) =>
    firstRow.includes(header)
  );

  if (isHeaderInvalid) {
    // If the first row is invalid, replace it with correct headers
    data[0] = {
      City: "City",
      Region: "Region",
      Number_of_Galamsey_Sites: "Number_of_Galamsey_Sites",
    };
  }

  // Convert to DataFrame
  let df = new dfd.DataFrame(data);

  // Standardize column names
  const columnMappings = {
    City: "city",
    Region: "region",
    Number_of_Galamsey_Sites: "numofsites",
  };
  df = df.rename(columnMappings);

  // Ensure required columns exist
  const requiredColumns = ["city", "region", "numofsites"];
  for (const col of requiredColumns) {
    if (!df.columns.includes(col)) {
      throw new Error(`Missing required column: ${col}`);
    }
  }

  // Convert 'numofsites' to numeric and handle invalid values
  df["numofsites"] = df["numofsites"].map(
    (val: string | number): number | null => {
      const num = Number(val);
      return isNaN(num) || num < 0 || num > 500 ? null : num; // Remove unreasonable values (e.g., > 500)
    }
  );

  // Drop rows with null values
  df = df.dropNa({ axis: 1 });

  // Remove duplicates
  // ✅ Remove duplicates manually by keeping unique rows
  const jsonData = dfd.toJSON(df) as object[]; // Convert DataFrame to JSON array
  const uniqueData = Array.from(
    new Set(jsonData.map((row) => JSON.stringify(row)))
  ).map((str) => JSON.parse(str)); // Remove duplicates
  df = new dfd.DataFrame(uniqueData); // Convert back to DataFrame

  return df;
}
