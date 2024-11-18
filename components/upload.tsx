"use client";
import React, { useState, useRef } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { Loader2 } from "lucide-react";

export default function Upload() {
  const [predictions, setPredictions] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const fileUploadRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = async (uploadedFiles: File[]) => {
    if (uploadedFiles.length === 0) return;

    const formData = new FormData();
    formData.append("file", uploadedFiles[0]);

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result);
      setPredictions(result.prediction as string);

      // Clear the file input after the prediction result is received
      if (fileUploadRef.current) {
        fileUploadRef.current.value = ""; // Clear the file input
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      <div className="w-[500px] min-h-96 border border-dashed bg-black border-neutral-800 rounded-lg">
        <FileUpload
          onChange={handleFileUpload}
          fileInputRef={fileUploadRef} // Add ref to access and reset file input
        />
      </div>

      {!isLoading ?
        <div>
          <TextGenerateEffect
            words={
              (!predictions &&
                "Upload your MRI scan to get a detailed analysis of your brain tumor and classification of the type of tumor.") ||
              ""
            }
          />
          {predictions && <TextGenerateEffect words={predictions} />}
        </div>
        : <Loader2 size={48} className="mx-auto animate-spin" />
      }
    </div>
  );
}
