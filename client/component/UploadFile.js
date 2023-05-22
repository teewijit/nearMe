import React, { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadFile() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  }, []);

  useEffect(() => {
    console.log(file);
  }, [file]);

  const removeImage = () => {
    setFile(null);
    setPreview(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return ;
}
