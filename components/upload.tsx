"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";

export default function Upload() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = async (uploadedFiles: File[]) => {
    if (uploadedFiles.length === 0) return;
  
    const formData = new FormData();
    formData.append("file", uploadedFiles[0]); // Assuming you only want to upload one file
  
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Prediction:', result.prediction);
      // You can update the UI to show the prediction result here
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-black border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
}
