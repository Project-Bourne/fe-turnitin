import React, { useState } from 'react';
import ActionIcons from './actionIcons/ActionIcon';
import Min_and_Max_icon from './Min_Max_icon';
import MetaData from './MetaData';
import { useDispatch, useSelector } from 'react-redux';

function Crawled() {
  // Check if data.url exists
  const { data } = useSelector((state: any) => state.factcheck);

  const title = data?.confidence?.title ? data?.confidence?.title : "No Title";
  const content = data?.confidence?.content ? data?.confidence?.content : 'No Content';
  const id = data?.uuid ? data?.uuid : 'No ID';

  const [hideMeta, setHideMeta] = useState(true); // Hide and show meta data

  const handleMax = () => {
    setHideMeta(true);
  };

  const handleMin = () => {
    setHideMeta(false);
  };

  return (
    <div className="bg-sirp-lightGrey h-[100%] mt-[3rem] mx-5 rounded-[1rem]">
      <div className="flex md:justify-between  flex-wrap md:px-5 md:py-5 ">
        <div className="flex justify-end w-full">
          <ActionIcons docId={id} />
        </div>
        <div className="bg-white my-[3rem] mx-5 rounded-[1rem] w-[100%]">
          <Min_and_Max_icon maxOnClick={handleMax} minOnClick={handleMin} />
          {hideMeta === true && (
            <div>
              <MetaData />
            </div>
          )}
          {hideMeta === false && (
            <h1 className="md:text-lg font-bold pl-5 pb-2">{title}</h1>
          )}
        </div>
        <div className="bg-white border mx-5 p-10 py-5 text-justify text-[1rem] leading-8 mb-10 rounded-[1rem] w-[100%]">
          <h1>{content}</h1>
        </div>
      </div>
    </div>
  );
}

export default Crawled;
