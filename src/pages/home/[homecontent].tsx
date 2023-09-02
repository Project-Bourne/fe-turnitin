import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ActionIcons from './components/actionIcons/ActionIcon';
import Min_and_Max_icon from './components/Min_Max_icon';
import MetaData from './components/MetaData';
import { setData } from '@/redux/reducer/factcheckSlice';
import FactcheckService from '@/services/factcheck.service';
import { useDispatch, useSelector } from 'react-redux';

function Crawled() {
  const router = useRouter();
  const [hideMeta, setHideMeta] = useState(true); // Hide and show meta data
  const dispatch = useDispatch();

  const id = router.query.homecontent;

  useEffect(() => {
    // Update homeRoute with the current URL when the component mounts
    async function fetchSummary() {
      const factService = new FactcheckService();
      if (id) {
        try {
          const response = await factService.getFact(id);
          if (response.status) {
            // console.log(response.data);
            dispatch(setData(response.data)); 
          } else {
            // Handle error
          }
        } catch (err) {
          console.error(err);
        }
      }
    
    }

    fetchSummary();
  }, [id]);

  const handleMax = () => {
    setHideMeta(true);
  };

  const handleMin = () => {
    setHideMeta(false);
  };

  return (
    <div className="bg-sirp-lightGrey h-[100%] mt-[8rem] mx-5 rounded-[1rem]">
      <div className="flex md:justify-between  flex-wrap md:px-5 md:py-5 ">
        <div className="flex justify-end w-full">
          <ActionIcons />
        </div>
        <div className="bg-white border my-[3rem] mx-5 rounded-[1rem] w-[100%]">
          <Min_and_Max_icon maxOnClick={handleMax} minOnClick={handleMin} />
          {hideMeta === true && <MetaData />}
          {hideMeta === false && (
            <h1 className="md:text-lg font-bold pl-5 pb-2">
              22 Insightful quotes from our speakers (link to recording at the
              end)
            </h1>
          )}
        </div>
        <div className="bg-white border mx-5 p-10 rounded-[1rem] w-[100%]">
          <h1>hello people</h1>
        </div>
      </div>
    </div>
  );
}

export default Crawled;
