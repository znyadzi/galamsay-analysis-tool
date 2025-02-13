"use client";

import { SendHorizontal, LoaderCircle, File } from "lucide-react";
import { useState } from "react";

import useAnalysisResult from "@/hooks/use-analysis-result";
import { useToast } from "@/hooks/use-toast";
import { getFileType, getFileSize } from "@/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const FilePreviewer = ({
  open,
  selectedFile,
  fileUrl,
  onOpenChange,
  setFile,
  setFileUrl,
}: {
  open: boolean;
  selectedFile: File | null;
  fileUrl: string | null;
  onOpenChange: (open: boolean) => void;
  setFile: (file: File | null) => void;
  setFileUrl: (fileUrl: string | null) => void;
}) => {
  const { mutation } = useAnalysisResult();
  const { toast } = useToast();

  const [threshold, setThreshold] = useState(50);

  const handleAnalyzeData = () => {
    if (!selectedFile) {
      toast({
        description: "Please select a file",
        variant: "destructive",
      });
      return;
    } else if (!threshold) {
      toast({
        description: "Please set a threshold (1-100)",
        variant: "destructive",
      });
      return;
    }

    if (selectedFile && threshold) {
      mutation.mutate({
        file: selectedFile,
        threshold,
        fileUrl,
        setFile,
        setFileUrl,
        setIsFilePreviewerOpen: onOpenChange,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>File Preview</DialogTitle>
          <DialogDescription>
            Review your file details and set the analysis threshold.
          </DialogDescription>
        </DialogHeader>
        <div className="relative">
          <div className="flex flex-col items-center mb-6">
            <p className="text-sm text-center max-w-96 truncate font-medium">
              {selectedFile?.name}
            </p>
            <div className="flex flex-col items-center mt-4 px-8 py-6 space-y-4 rounded-lg bg-muted w-full">
              <File className="w-16 h-16 text-primary" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{getFileSize(selectedFile?.size || 0)}</span>
                <span>•</span>
                <span>{getFileType(selectedFile?.name || "")}</span>
              </div>
            </div>
          </div>
          {mutation.isPending && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center">
              <LoaderCircle className="w-8 h-8 text-primary animate-spin mb-2" />
              <p className="text-sm font-medium">Analyzing...</p>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="threshold"
              className="flex items-center justify-between"
            >
              Threshold:{" "}
              <Input
                type="number"
                className="w-16 text-center"
                min={1}
                max={100}
                step={1}
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
              />
            </Label>
            <Slider
              id="threshold"
              min={1}
              max={100}
              step={1}
              value={[threshold]}
              onValueChange={(values: number[]) => setThreshold(values[0])}
              disabled={mutation.isPending}
            />
          </div>
          <Button
            className="w-full"
            onClick={handleAnalyzeData}
            disabled={mutation.isPending}
          >
            <SendHorizontal className="w-4 h-4 mr-2" />
            Analyze Data
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilePreviewer;
