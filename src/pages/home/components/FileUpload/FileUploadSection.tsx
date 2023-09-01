import React from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
// import LoadingModal from './LoadingModalUpload';

function FileUploadSection({ file, handleDeleteFile }) {
  const { fileName } = useSelector((store: any) => store.factcheck);
  const handleModal = event => {
    event.stopPropagation();
  };
  return (
    <div>
      <div className="p-10 flex align-middle items-center w-full flex-col justify-center">
        {/* File Information */}
        <div className="p-5 flex md:w-[50%] w-[100%] align-middle justify-between bg-[#F3F5F6] border-2 border-[E8EAEC] rounded-[15px]">
          <div className="flex align-middle items-center justify-center">
            <span className="rounded-full bg-[#E8F8FD] flex align-middle justify-center w-[40px] h-[40px]">
              <Image
                src={require(`../../../../assets/icons/file.svg`)}
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
              src={require(`../../../../assets/icons/red-delete.svg`)}
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
          <div className="p-5 cursor-pointer flex md:w-[30%] w-[50%] align-middle justify-center bg-[#4582C4] border-2 text-white rounded-[15px] font-extrabold">
            <span className="" onClick={handleModal}>
              Summarize
            </span>
          </div>
        </div>
      </div>
      {/* Loading Modal */}
      {/* {showLoaderUpload && (
        <LoadingModal
          closeModal={() => dispatch(setShowLoader(false))}
          formData={fileName}
        />
      )} */}
    </div>
  );
}

export default FileUploadSection;
