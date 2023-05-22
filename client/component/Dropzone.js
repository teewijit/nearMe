import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import Button from "./Button";
import { setData, setLoading, setError } from "../store/slices/storesSlice";
import { useDispatch } from "react-redux";

const StyleDropzone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #ccc;
  border-radius: 4px;
  padding: 20px;
  font-size: 18px;
  color: #666;
  height: 100px;
  width: 100%;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const Dropzone = () => {
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImages(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const selected_images = selectedImages?.map((file, index) => (
    <div className="container" key={file.preview}>
      <div className="row justify-content-center text-center">
        <div className="m-2">
          <Button
            label={"ลบ"}
            variant={"danger"}
            onClick={() => removeImage(index)}
          />
        </div>
        <div className="col-md-6">
          <img src={file.preview} style={{ width: "100%" }} alt="" />
          <label className="mt-2">{file.path}</label>
        </div>
      </div>
    </div>
  ));

  const removeImage = (index) => {
    const newSelectedImages = [...selectedImages];
    newSelectedImages.splice(index, 1);
    setSelectedImages(newSelectedImages);
  };

  return (
    <>
      <StyleDropzone>
        <div {...getRootProps({ className: "dropzone" })}>
          <input name="file" type="file" {...getInputProps()}/>
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </StyleDropzone>
      {selected_images}
    </>
  );
};

export default Dropzone;
