import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { useEffect } from "react";
import {
  createAnalysisResult,
  readAnalysisResults,
} from "@/utils/query-functions";
import { AnalysisResult } from "@/types";

const useAnalysisResult = () => {
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const mutation = useMutation<
    AnalysisResult,
    AxiosError,
    {
      file: File;
      threshold: number;
      fileUrl: string | null;
      setFile: (file: File | null) => void;
      setFileUrl: (fileUrl: string | null) => void;
      setIsFilePreviewerOpen: (isFilePreviewerOpen: boolean) => void;
    }
  >({
    mutationFn: ({ file, threshold }) => {
      return createAnalysisResult(file, threshold);
    },
    onError: (
      err,
      { fileUrl, setFile, setFileUrl, setIsFilePreviewerOpen }
    ) => {
      const description =
        (err?.response?.data as { errMsg: string })?.errMsg ||
        "Something went wrong";

      toast({
        description,
        variant: "destructive",
      });

      // Close the file previewer and remove the file preview if the analysis fails
      if (fileUrl) {
        setIsFilePreviewerOpen(false);
        setFile(null);
        setFileUrl(null);

        URL.revokeObjectURL(fileUrl);
      }
    },
    onSuccess: (
      newAnalysisResult,
      { fileUrl, setFile, setFileUrl, setIsFilePreviewerOpen }
    ) => {
      toast({
        description: "Analysis successful",
      });

      queryClient.setQueryData<AnalysisResult[]>(
        ["analysis-results"],
        (prevAnalysisResults) => [
          ...(prevAnalysisResults ?? []),
          newAnalysisResult,
        ]
      );

      // Close the file previewer and remove the file preview after the analysis is successful
      if (fileUrl) {
        setIsFilePreviewerOpen(false);
        setFile(null);
        setFileUrl(null);

        URL.revokeObjectURL(fileUrl);
      }
    },
  });
  const analysisResultsQuery = useQuery<AnalysisResult[], AxiosError>({
    queryKey: ["analysis-results"],
    queryFn: () => readAnalysisResults(),
  });

  // Error handling effect
  useEffect(() => {
    if (analysisResultsQuery.status === "error") {
      const description =
        (analysisResultsQuery.error?.response?.data as { errMsg: string })
          ?.errMsg || "Something went wrong";

      toast({
        description,
        variant: "destructive",
      });
    }
  }, [
    analysisResultsQuery.error?.response?.data,
    analysisResultsQuery.status,
    toast,
  ]);

  return {
    mutation,
    analysisResultsQuery,
  };
};

export default useAnalysisResult;
