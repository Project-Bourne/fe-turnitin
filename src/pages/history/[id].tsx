import React, { useState } from 'react';
import ActionIcons from '../home/components/actionIcons/ActionIcon';
import Min_and_Max_icon from '../home/components/Min_Max_icon';
import MetaData from '../home/components/MetaData';
import { useDispatch, useSelector } from 'react-redux';

function Crawled() {
  // Check if data.url exists
  const { data } = useSelector((state: any) => state.factcheck);

  const title = data.confidence.title ? data.confidence.title : 'No Title';
  const content = data.confidence.content
    ? data.confidence.content
    : 'No Content';

  const [hideMeta, setHideMeta] = useState(true); // Hide and show meta data
  const dispatch = useDispatch();

  //   // Update homeRoute with the current URL when the component mounts
  //   async function fetchSummary() {
  //     const factService = new FactcheckService();
  //     if (id) {
  //       try {
  //         const response = await factService.getFact(id);
  //         if (response.status) {
  //           console.log(response.data);
  //           dispatch(setData(response.data));
  //         } else {
  //           NotificationService.error({
  //             message: 'Error!',
  //             addedText: <p>Something happend. Please try again</p> // Add a closing </p> tag
  //           });
  //         }
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     }
  //   }

  //   fetchSummary();
  // }, [id, dispatch]);
  const handleMax = () => {
    setHideMeta(true);
  };

  const handleMin = () => {
    setHideMeta(false);
  };

  return (
    <div className="bg-sirp-lightGrey h-[100%] mt-[3rem] mx-5 rounded-[1rem]">
      <div className="flex md:justify-between  flex-wrap md:px-5 md:py-5 ">
        <div className="flex justify-end w-full mr-[2rem]">
          <ActionIcons />
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
