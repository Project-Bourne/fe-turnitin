import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import FactcheckService from '@/services/factcheck.service';
import FileUploadSection from './FileUploadSection';
import {
  setData,
  setFileName,
  setUploadText,
  setUploadUri
} from '@/redux/reducer/factcheckSlice';
import HomeContent from '../[homecontent]';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { Tooltip } from '@mui/material';
import LoadingModal from './LoadingModal';
import NotificationService from '@/services/notification.service';

//if you have any problem understanding this file/application please reachout to me on +2348100915641 or email me on christopherabraham8@gmail.com

const FileUpload = () => {
  const { data } = useSelector((state: any) => state.factcheck);
  const { userInfo } = useSelector((state: any) => state?.auth);
  const fullName = `${userInfo?.firstName} ${userInfo?.lastName}`;
  const userId = userInfo?.uuid

  const [formData, setFormData] = useState('');
  const [file, setFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const factcheckService = new FactcheckService();
  const [uploadDisabled, setUploadDisabled] = useState(true);

  const handleTextareaChange = e => {
    setFormData(e.target.value);
    // Automatically adjust the textarea's height
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Validation: Check if formData is empty or has less than five characters
    if (formData.trim() === '' || formData.length < 5) {
      // Notify the user of the validation error, and don't proceed with the submission.
      NotificationService.error({
        message: 'Error!',
        addedText: <p>Something happend. Please try again</p>, // Add a closing </p> tag
        position: 'top-center'
      });
      return;
    }

    try {
      setIsLoading(true);
      const dataObj = {
        url: formData
      };
      const response = await factcheckService.factcheckUrl(dataObj);
      if (response.status) {
        dispatch(setData(response.data));
        NotificationService.success({
          message: 'Success!',
          addedText: <p>{response.message}</p>,
          position: 'top-center'
        });
      } else {
        NotificationService.error({
          message: 'Error!',
          addedText: <p>{`${response?.message}, please try again`}</p>,
          position: 'top-center'
        });
        router.push(`/home`);
      }
    } catch (error: any) {
      NotificationService.error({
        message: 'Error!',
        addedText: <p>{`${error?.message}, please try again`}</p>,
        position: 'top-center'
      });
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
    dispatch(setFileName(event.target.files[0].name));
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setIsFileUploaded(true);
      const formData = new FormData();
      formData.append('files', selectedFile);
      formData.append("userId", userId);
      formData.append("userName", fullName);
      console.log(formData);

      try {
        const response = await fetch(
          'http://192.81.213.226:81/89/api/v1/uploads',
          {
            method: 'POST',
            body: formData
          }
        );

        if (response.status) {
          const responseData = await response.json();
          const fileText = responseData.data[0].text;
          const fileUri = responseData.data[0].uri;
          setUploadDisabled(false);
          dispatch(setUploadText(fileText));
          dispatch(setUploadUri(fileUri));
          NotificationService.success({
            message: 'Success!',
            addedText: <p>{responseData?.message}</p>,
            position: 'top-center'
          });
        } else {
          NotificationService.error({
            message: 'Error!',
            addedText: <p>fail to upload. Please try again.</p>,
            position: 'top-center'
          });
        }
      } catch (error: any) {
        NotificationService.error({
          message: 'Error!',
          addedText: <p>{`${error?.message}, please try again`}</p>,
          position: 'top-center'
        });
      }
    }
  };

  const closeModal = () => {
    setIsLoading(false);
  };

  return (
    <div className="m-5">
      {isFileUploaded ? (
        <FileUploadSection file={file} handleDeleteFile={handleDeleteFile} uploadDisabled={uploadDisabled}  />
      ) : (
        <div>
          {formData?.length == 0 ? (
            <div className="flex items-center w-[100%] justify-end pr-[2rem] pb-[1rem]">
              <label
                htmlFor="file-input"
                className="px-4 py-1 rounded-lg"
                style={{
                  cursor: 'pointer',
                  color: '#4582C4',
                  backgroundColor: 'white',
                  border: '1px solid #4582C4'
                }}
              >
                <DriveFolderUploadIcon
                  style={{ color: '#4582C4', cursor: 'pointer' }}
                />
                Upload File
              </label>

              <input
                type="file"
                id="file-input"
                style={{ display: 'none' }}
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                onClick={() => {setUploadDisabled(true);
                }}
              />
            </div>
          ) : (
            <div
              className="flex items-center w-[100%] justify-end pr-[2rem] pb-[1rem]"
              onClick={handleSubmit}
            >
              <label
                htmlFor="file-input"
                className="px-4 py-1 rounded-lg"
                style={{
                  cursor: 'pointer',
                  color: '#4582C4',
                  backgroundColor: 'white',
                  border: '1px solid #4582C4'
                }}
              >
                Run factcheck
              </label>
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex align-middle w-full border-2 rounded-[1rem] border-[#E5E7EB]-500 border-dotted"
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
            <textarea
              placeholder="Copy and paste content text here"
              className={`w-[95%] outline-none text-justify focus:ring-0 pt-[0.5rem] my-[2rem] resize-y min-h-[2rem] max-h-[15rem] overflow-auto`}
              value={formData}
              onChange={handleTextareaChange}
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
        </div>
      )}

      {data?.length == 0 ? (
        <main className="flex items-center justify-center flex-col gap-4 mt-[5rem]">
          <div className="flex items-center justify-centery w-[50%] font-bold flex-col p-3 rounded-[1rem] gap-3 text-xl ">
            <span>
              {' '}
              <Image
                src={require(`../../../../../public/icons/no_history.svg`)}
                alt="upload image"
                width={150}
                height={150}
                priority
              />
            </span>
            <h1 className="font-[700] text-2xl">No factcheck yet</h1>
            <span className="text-gray-400">
              Your recent factcheck will appear here
            </span>
          </div>
        </main>
      ) : (
        <div>
          <HomeContent />
        </div>
      )}
      {isLoading && <LoadingModal closeModal={closeModal} />}
    </div>
  );
};

export default FileUpload;
