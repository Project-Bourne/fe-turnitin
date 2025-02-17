import React, { useState, useEffect } from 'react';
import ActionIcons from './actionIcons/ActionIcon';
import MinAndMaxIcon from './Min_Max_icon';
import MetaData from './MetaData';
import { useSelector } from 'react-redux';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Tooltip } from '@mui/material';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import NotificationService from '@/services/notification.service';
import Loader from '../../history/conponents/Loader';

/**
 * Crawled component displays the content of a crawled document with metadata and actions
 * @returns {JSX.Element} The rendered Crawled component
 */
function Crawled() {
  const router = useRouter();
  const { data } = useSelector((state: any) => state.factcheck);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('No Title');
  const [content, setContent] = useState('No Content');
  const [id, setId] = useState('No ID');
  const [hideMeta, setHideMeta] = useState(true);

  useEffect(() => {
    if (data) {
      try {
        setLoading(true);
        setTitle(data?.confidence?.title || 'No Title');
        setContent(data?.confidence?.content5wh || 'No Content');
        setId(data?.uuid || 'No ID');
        setError(null);
      } catch (err: any) {
        setError(err?.message || 'An error occurred while processing the data');
        NotificationService.error({
          message: 'Error!',
          addedText: <p>Failed to process data. Please try again.</p>,
          position: 'top-center'
        });
      } finally {
        setLoading(false);
      }
    }
  }, [data]);

  const handleMax = () => {
    setHideMeta(true);
  };

  const handleMin = () => {
    setHideMeta(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => router.back()}
          className="bg-sirp-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No content available</p>
      </div>
    );
  }

  return (
    <div className="bg-sirp-lightGrey h-[100%] mt-[3rem] mx-5 rounded-[1rem]">
      <div className="flex md:justify-between flex-wrap md:px-5 md:py-5">
        <div className="flex flex-row justify-between items-center w-full">
          <Tooltip title="Back" placement="top">
            <KeyboardBackspaceIcon 
              onClick={() => router.back()} 
              className="cursor-pointer hover:text-sirp-primary"
            />
          </Tooltip>
          <ActionIcons docId={id} />
        </div>
        <div className="bg-white my-[3rem] mx-5 rounded-[1rem] w-[100%]">
          <MinAndMaxIcon maxOnClick={handleMax} minOnClick={handleMin} />
          {hideMeta ? (
            <MetaData />
          ) : (
            <h1 className="md:text-lg font-bold pl-5 pb-2">{title}</h1>
          )}
        </div>
        <div className="bg-white border mx-5 p-10 py-5 text-justify text-[1rem] leading-8 mb-10 rounded-[1rem] w-[100%]">
          <ReactMarkdown
            className="first-letter:capitalize text-justify leading-6 text-[1rem] mb-10"
            components={{
              p: ({ children }) => (
                <div className="mb-4">
                  {children}
                </div>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default Crawled;
