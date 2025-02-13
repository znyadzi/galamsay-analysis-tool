import axios from "./axios-instance";

export const createAnalysisResult = async (file: File, threshold: number) => {
  try {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("threshold", threshold.toString());

    const res = await axios.post("/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.analysisResult;
  } catch (err) {
    console.error("Error from `createAnalysisResult` function:", err);

    throw err;
  }
};

export const readAnalysisResults = async () => {
  try {
    const res = await axios.get("/");

    return res.data.analysisResults;
  } catch (err) {
    console.error("Error from `readAnalysisResults` function:", err);
    throw err;
  }
};
