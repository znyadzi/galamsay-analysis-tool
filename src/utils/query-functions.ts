import axios from "./axios-instance";

export const createAnalysisResult = async (file: File, threshold: number) => {
  try {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("threshold", threshold.toString());

    const res = await axios.post("/analysis-results", formData, {
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
    const res = await axios.get("/", {
      params: {
        key: "74256270",
      },
    });

    return res.data;
  } catch (err) {
    console.error("Error from `readAnalysisResults` function:", err);
    throw err;
  }
};

// export const readAnalysisResult = async (id: string) => {
//   try {
//     const res = await axios.get(`/analysis-results/${id}`);

//     return res.data.analysisResult;
//   } catch (err) {
//     console.error("Error from `readAnalysisResult` function:", err);

//     throw err;
//   }
// };
