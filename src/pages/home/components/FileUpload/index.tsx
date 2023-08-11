import Image from "next/image";
import React, { useState } from "react";
import FileUploadSection from "./FileUploadSection";

const FileUpload = () => {
  const [formData, setFormData] = useState("");
  const [file, setFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showReader, setShowReader] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData(value);
    console.log("Form Data:", value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting via default behavior
    setFormData("");
    console.log("Form submitted:", formData); // Do whatever you want with the form data here
  };

  const handleDeleteFile = () => {
    setFile(null);
    setIsFileUploaded(false);
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0]; // Get the first file from the array
    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log(formData, "formdata");
    setFile(selectedFile);
    if (selectedFile) {
      setIsFileUploaded(true);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    if (droppedFile) {
      setIsFileUploaded(true);
    }
  };

  const handleClearInput = () => {
    setFormData("");
  };

  return (
    <div className="m-5">
      {isFileUploaded && !showReader ? (
        <FileUploadSection
          file={file}
          handleDeleteFile={handleDeleteFile}
          isLoading={isLoading}
        />
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <div className="flex align-middle w-full border-2 rounded-full border-[#E5E7EB]-500  border-dotted">
              <span className="flex align-middle justify-center mx-3">
                <Image
                  src={require(`../../../../assets/icons/link.svg`)}
                  alt="upload image"
                  width={20}
                  height={20}
                  priority
                />
              </span>
              <input
                placeholder="Copy and paste link here"
                className="py-5 w-[95%] bg-sirp-secondary2 outline-none focus:ring-0"
                value={formData}
                onChange={handleChange}
              />
              <span className="flex align-middle justify-center mx-3">
                <Image
                  className="flex align-middle justify-center font-light text-[#A1ADB5] cursor-pointer"
                  src={require(`../../../../assets/icons/x.svg`)}
                  alt="upload image"
                  width={20}
                  height={20}
                  onClick={handleClearInput}
                />
              </span>
            </div>
          </form>

          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="h-[30vh] mt-5 flex align-middle w-full justify-center border rounded-[30px] border-[#E5E7EB]"
          >
            <div className="flex flex-col align-middle justify-center">
              <span className="flex align-middle justify-center mx-3">
                <Image
                  className="flex align-middle justify-center"
                  src={require(`../../../../assets/icons/cloud.svg`)}
                  alt="upload image"
                  width={25}
                  height={25}
                  priority
                />
              </span>
              <span className="font-normal text-[#383E42]">
                <input
                  id="file-upload"
                  type="file"
                  accept=".txt,.rtf,.doc,.pdf,.jpeg,"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <label
                  className="text-blue-400 cursor-pointer"
                  htmlFor="file-upload"
                >
                  Upload a file
                </label>{" "}
                or drag and drop
              </span>
              <span className="font-light  text-[#383E42]">
                TXT, RFT, DOC, PDF upto 5MB
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUpload;
