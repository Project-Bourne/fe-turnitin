import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HomeService from '@/services/factcheck.service';
import {
  setSummaryLength,
  setSummaryContentType,
  setSummaryLengthRange,
  setSummarizeSettingUpload,
  setShowLoaderUpload
} from '@/redux/reducer/summarySlice';
import { useTruncate } from '@/components/custom-hooks';
import { useRouter } from 'next/router';

function SummarizeCopyPasteSetting() {
  const {
    summaryLength,
    summaryContentType,
    fileName,
    uploloadedUri,
    uploadedText,
    summaryLengthRange,
  } = useSelector((store: any) => store.summary);

  const route = useRouter();
  const dispatch = useDispatch();
  const homeService = new HomeService();
  const summaryNumber = `${summaryLength} ${summaryContentType}`;

  const handleContentTypeChange = ({ target: { value: newContentType } }) => {
    dispatch(setSummaryContentType(newContentType));

    const newSummaryLength = newContentType === 'paragraph' ? '3' : '5';
    const newSummaryLengthRange =
      newContentType === 'paragraph'
        ? ['1', '2', '3']
        : ['1', '2', '3', '4', '5'];

    dispatch(setSummaryLength(newSummaryLength));
    dispatch(setSummaryLengthRange(newSummaryLengthRange));
  };

  const handleDocumentSummary = async (event) => {
    event.preventDefault();
    dispatch(setShowLoaderUpload(true));
    dispatch(setSummarizeSettingUpload(false));

    try {
      const uploadData = {
        text: uploadedText,
        uri: uploloadedUri,
        number: summaryNumber
      };
      const response = await homeService.summarizeUpload(uploadData);
      dispatch(setShowLoaderUpload(false));
      route.push(`/home/${response.data.uuid}`);
    } catch (error) {
      dispatch(setShowLoaderUpload(false));
      console.error(error);
    }
  };

  return (
    <div>
      <div className="my-5">
        <h1 className="text-3xl font-bold ml-5 text-black">Summary Settings</h1>
        <div className="flex gap-5 mt-5 mx-5 items-center">
          <small className="text-sm text-gray-500 mb-5">Title:</small>
          <p className="text-[14px] font-sm pb-[1.4rem]">
            {useTruncate(fileName, 35)}
          </p>
        </div>
        <form onSubmit={handleDocumentSummary} className="flex flex-col mx-5">
          <label htmlFor="content-type" className="text-sm text-gray-500">
            Content Type
          </label>
          <select
            name="content-type"
            id="content-type"
            value={summaryContentType}
            onChange={handleContentTypeChange}
            className="border p-2 my-3 rounded-[.3rem]"
          >
            <option value="sentence">Sentence(s)</option>
            <option value="paragraph">Paragraph(s)</option>
          </select>
          <label htmlFor="length" className="text-sm text-gray-500">
            Length
          </label>
          <select
            name="length"
            id="length"
            value={summaryLength}
            className="border p-2 my-3 rounded-[.3rem]"
            onChange={e => dispatch(setSummaryLength(e.target.value))}
          >
            {summaryLengthRange?.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <div>
            <button className="p-4 cursor-pointer flex w-[100%] align-middle justify-center bg-sirp-primary text-white rounded-[1rem] text-[15px]">
              Summarize Content
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SummarizeCopyPasteSetting;
