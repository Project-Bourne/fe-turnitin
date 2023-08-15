import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import CustomModal from "@/components/ui/CustomModal";
import SummarizeSettings from "../ModalPopUp/summarizeSettings";

const FileUploadSection = ({ file, handleDeleteFile, isLoading }) => {
  const router = useRouter();

  const [SummarizeSetting, setSummarizeSetting] = useState(false);

  return (
    <>
      <div className="p-10 flex align-middle items-center border-red-500 w-full flex-col justify-center">
        <div className="p-5 flex md:w-[50%] w-[100%] align-middle justify-between bg-sirp-lightGrey border-2 border-sirp-dashbordb1 rounded-[15px]">
          <div className="flex align-middle items-center justify-center">
            <span className="rounded-full bg-sirp-primaryLess2 flex align-middle justify-center w-[40px] h-[40px]">
              <Image
                src={require(`../../../../assets/icons/file.svg`)}
                alt="upload image"
                width={20}
                height={20}
                priority
              />
            </span>
            <div className="mx-4">
              <span>{file?.name}</span>
              <div>
                <span className="text-xs text-[#6B7280]">{file?.size}KB .</span>
                <span className="text-xs text-[#6B7280]">100% uploaded</span>
              </div>
            </div>
          </div>
          <span
            className="rounded-full bg-[#FEE2E2] flex align-middle justify-center w-[40px] h-[40px]"
            onClick={handleDeleteFile}
          >
            <Image
              src={require(`../../../../assets/icons/red-x.svg`)}
              alt="upload image"
              width={15}
              height={15}
              priority
            />
          </span>
        </div>
        {!isLoading && (
          <div
            className="flex md:w-[50%] w-[100%] align-middle justify-end  mt-4"
            onClick={() => router.push(`/home/${'chisom'}`)} //navigate to Analyezed_content page
            style={{ cursor: "pointer" }}
          >
            <div className="p-5 cursor-pointer flex md:w-[35%] w-[70%] align-middle justify-center bg-sirp-primary text-white rounded-[15px] font-extrabold">
              <span className="ml-3">Run Fact Checker</span>
            </div>
          </div>
        )}
      </div>
      {SummarizeSetting && (
        <CustomModal
          style="bg-white md:w-[30%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setSummarizeSetting(false)}
        >
          <SummarizeSettings />
        </CustomModal>
      )}
    </>
  );
};

export default FileUploadSection;
