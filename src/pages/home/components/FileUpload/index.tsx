import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import FactcheckService from '@/services/factcheck.service';
import FileUploadSection from './FileUploadSection';
import { setFileName } from '@/redux/reducer/factcheckSlice';

import LoadingModal from './LoadingModal';

const FileUpload = () => {
  const [formData, setFormData] = useState('');
  const [file, setFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const factcheckService = new FactcheckService();

  const handleSubmit = async e => {
    e.preventDefault();
    // console.log('Form submitted:', formData);
    try {
      setIsLoading(true);
      const dataObj = { url: formData };
      const response = await factcheckService.factcheckUrl(dataObj);
      // console.log(response.data.uuid, 'response');
    
      router.push(`/home/${response.data.uuid}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setFormData('');
    }
  };

  const handleDeleteFile = () => {
    setFile(null);
    setIsFileUploaded(false);
  };

  const handleFileUpload = async event => {
    event.preventDefault();
   dispatch(setFileName((event.target.files[0].name)));
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setIsFileUploaded(true);
      const formData = new FormData();
      formData.append('files', selectedFile);

      try {
        const response = await fetch(
          'http://192.81.213.226:89/api/v1/uploads',
          {
            method: 'POST',
            body: formData
          }
        );

        if (response.status) {
          const responseData = await response.json();
          // Dispatch actions if needed
        } else {
          console.error('File upload failed.');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const closeModal = () => {
    setIsLoading(false);
  };

  return (
    <div className="m-5">
      {isFileUploaded ? (
        <FileUploadSection file={file} handleDeleteFile={handleDeleteFile} />
      ) : (
        <div>
          {/* Text Summary Form */}
          <form
            onSubmit={handleSubmit}
            className="flex align-middle w-full border-2 rounded-full border-[#E5E7EB]-500 border-dotted"
          >
            <span className="flex align-middle justify-center mx-3">
              <Image
                src={require('../../../../../public/icons/link.svg')}
                alt="upload image"
                width={20}
                height={20}
                priority
              />
            </span>
            <input
              type="text"
              placeholder="Copy and paste content text here"
              className="w-[95%] h-[4rem] outline-none focus:ring-0"
              onChange={e => setFormData(e.target.value)}
              value={formData}
            />
            <span className="flex align-middle justify-center mx-3">
              <Image
                className="flex align-middle justify-center font-light text-[#A1ADB5] cursor-pointer"
                src={require('../../../../../public/icons/x.svg')}
                alt="upload image"
                width={20}
                height={20}
                onClick={() => setFormData('')}
              />
            </span>
          </form>
          {/* File Upload */}
          <div className="h-[30vh] mt-5 flex align-middle w-full justify-center border rounded-[30px] border-[#E5E7EB]">
            <div className="flex flex-col align-middle justify-center">
              <span className="flex align-middle justify-center mx-3">
                <Image
                  className="flex align-middle justify-center"
                  src={require('../../../../../public/icons/cloud.svg')}
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
                  accept=".txt,.rtf,.doc,.docx,.pdf,.ppt,.pptx"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <label
                  className="text-blue-400 cursor-pointer"
                  htmlFor="file-upload"
                >
                  Upload a file
                </label>
                <span> </span>or drag and drop
              </span>
              <span className="font-light text-[#383E42]">
                TXT, RFT, DOC, PDF up to 5MB
              </span>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
       
          <LoadingModal closeModal={closeModal} />
      
      )}
    </div>
  );
};

export default FileUpload;
