import React, { useState } from 'react';
import ActionIcons from '../home/components/actionIcons/ActionIcon';
import MinAndMaxIcon from '../home/components/Min_Max_icon';
import MetaData from '../home/components/MetaData';
import { useSelector } from 'react-redux';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useRouter } from 'next/router';
import { Tooltip } from '@mui/material';

function Crawled() {
  const router = useRouter();
  const { data } = useSelector((state: any) => state.factcheck);

  const title = data?.confidence?.title || 'No Title';
  const content = data?.confidence?.content5wh || 'No Content';
  const id = data?.uuid || 'No ID';

  const [hideMeta, setHideMeta] = useState(true);

  const handleMax = () => {
    setHideMeta(true);
  };

  const handleMin = () => {
    setHideMeta(false);
  };

  // Split content into paragraphs based on newlines
  const paragraphs = content.split('\n');

  return (
    <div className="bg-sirp-lightGrey h-[100%] mt-[3rem] mx-5 rounded-[1rem]">
      <div className="flex md:justify-between flex-wrap md:px-5 md:py-5">
      <div className="flex flex-row justify-between items-center w-full">
          <Tooltip title="Back" placement="top">
            <KeyboardBackspaceIcon onClick={() => router.back()} />
          </Tooltip>
          <ActionIcons docId={id} />
        </div>
        <div className="bg-white my-[3rem] mx-5 rounded-[1rem] w-[100%]">
          <MinAndMaxIcon maxOnClick={handleMax} minOnClick={handleMin} />
          {hideMeta ? <MetaData /> : <h1 className="md:text-lg font-bold pl-5 pb-2">{title}</h1>}
        </div>
        <div className="bg-white border mx-5 p-10 py-5 text-justify text-[1rem] leading-8 mb-10 rounded-[1rem] w-[100%]">
          {/* Map each paragraph to a <p> element */}
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Crawled;
