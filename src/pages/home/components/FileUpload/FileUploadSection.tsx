import React, { useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import LoadingModal from './LoadingModal';
import FactcheckService from '@/services/factcheck.service';
import { setData } from '@/redux/reducer/factcheckSlice';
import NotificationService from '@/services/notification.service';
import { useRouter } from 'next/router';

function FileUploadSection({ file, handleDeleteFile }) {
  const { fileName, uploadText, uploadUri } = useSelector(
    (store: any) => store.factcheck
  );
  const [isLoading, setIsLoading] = useState(false);
  const factcheckService = new FactcheckService();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleFactUpload = async () => {
    try {
      setIsLoading(true);
      const dataObj = {
        text: uploadText,
        uri: uploadUri
      };
      const response = await factcheckService.factcheckUpload(dataObj);
      if (response.status) {
        dispatch(setData(response.data));
        NotificationService.success({
          message: 'Success!',
          addedText: <p>{response.message}</p>,
          position: 'top-right'
        });
      } else {
        NotificationService.error({
          message: 'Error!',
          addedText: <p>Something went wrong. Please try again.</p>
        });
        router.push(`/home`);
      }
    } catch (error) {
      NotificationService.error({
        message: 'Error!',
        addedText: <p>Something went wrong. Please try again.</p>
      });
      router.push(`/home`);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsLoading(false);
  };
  return (
    <div>
      <div className="p-10 flex align-middle items-center w-full flex-col justify-center">
        {/* File Information */}
        <div className="p-5 flex md:w-[50%] w-[100%] align-middle justify-between bg-[#F3F5F6] border-2 border-[E8EAEC] rounded-[15px]">
          <div className="flex align-middle items-center justify-center">
            <span className="rounded-full bg-[#E8F8FD] flex align-middle justify-center w-[40px] h-[40px]">
              <Image
                src={require(`../../../../../public/icons/file.svg`)}
                alt="upload image"
                width={20}
                height={20}
                priority
              />
            </span>
            <div className="mx-4">
              <span>{fileName}</span>
              <div>
                <span className="text-xs text-[#6B7280]">{file?.size}KB .</span>
                <span className="text-xs text-[#6B7280]">100% uploaded</span>
              </div>
            </div>
          </div>
          <span className="rounded-full bg-[#FEE2E2] flex align-middle justify-center w-[70px] h-[40px] cursor-pointer">
            <Image
              src={require(`../../../../../public/icons/red-delete.svg`)}
              alt="upload image"
              width={18}
              height={18}
              priority
              onClick={handleDeleteFile}
            />
          </span>
        </div>
        {/* Summarize Button */}
        <div className="flex md:w-[50%] w-[100%] align-middle justify-end mt-4">
          <div
            className="p-5 cursor-pointer flex md:w-[30%] w-[50%] align-middle justify-center bg-[#4582C4] border-2 text-white rounded-[15px] font-extrabold"
            onClick={handleFactUpload}
          >
            <span>Summarize</span>
          </div>
        </div>
      </div>
      {isLoading && <LoadingModal closeModal={closeModal} />}
    </div>
  );
}

export default FileUploadSection;
