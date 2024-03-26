import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTruncate } from '@/components/custom-hooks';
import Image from 'next/image';
import ListItemModels from '../../../../utils/model/home.models';
import { useDispatch } from 'react-redux';
import { DateTime } from 'luxon';
import FactcheckService from '@/services/factcheck.service';
import { fetchData } from '@/hooks/FetchData';
import NotificationService from '@/services/notification.service';
import { setData } from '@/redux/reducer/factcheckSlice';
import { Tooltip } from '@mui/material';
import CustomModal from '@/components/ui/CustomModal';
import Loader from '../Loader';

//Need any help with  this fact checker? Contact me on 08100915641 or email me at christopherabraham8@gmail.com

function ListItem({
  uuid,
  factUuid,
  title,
  factLevel,
  time,
  actionButtons,
  isBookmarked
}: ListItemModels) {
  const [showaction, setShowAction] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // First, extract the numeric value from the string
const numericValue = parseFloat(factLevel);

// Then, apply Math.ceil to round it up to the nearest integer
const roundedValue = Math.ceil(numericValue);

  const handleHover = () => {
    setShowAction(1);
    // console.log(factLevel, 'factLevel')
  };

  const handleHoverOut = () => {
    // Handle the hover out event
    setShowAction(0);
  };

  const handleItemClick = () => {
    // Handle the item click event to
    async function fetchSummary() {
      const factService = new FactcheckService();
      if (factUuid) {
        try {
          setLoading(true);
          const response = await factService.getFact(factUuid);
          if (response.status) {
            dispatch(setData(response?.data));
            setLoading(false);
          } else {
            NotificationService.error({
              message: 'Error!',
              addedText: <p>Something happend. Please try again</p> ,// Add a closing </p> tag
              position: "top-center",

            });
            setLoading(false);
          }
        } catch (err) {
          NotificationService.error({
            message: 'Error!',
            addedText: <p>Something happend. Please try again</p> ,
            position: "top-center",
          });
          setLoading(false);
        }
      }
    }

    fetchSummary();
    router.push(`/history/${factUuid}`);
  };

  const handleBookMark = async (e, uuid) => {
    e.stopPropagation();
    FactcheckService?.bookMarkFact(uuid)
      .then((res: any) => {
        fetchData(dispatch); // Pass the fetch the updated data
      })
      .catch(err => {
        NotificationService.error({
          message: 'Error!',
          addedText: <p>{err?.message}. Please try again</p> // Add a closing </p> tag
        });
      });
  };

  const handleDelete = async (e, uuid) => {
    e.stopPropagation();
    FactcheckService.deleteFact(uuid)
      .then((res: any) => {
        fetchData(dispatch); // Pass the fetch the updated data
        NotificationService.success({
          message: 'success!',
          addedText: <p>{res?.message} History deleted</p>, // Add a closing </p> tag
          position: "top-center",

        });
      })
      .catch(err => {
        NotificationService.error({
          message: 'Error!',
          addedText: <p>{err?.message} Please try again</p>, // Add a closing </p> tag
          position: "top-center",

        });
      });
  };

  const userTimeZone = Intl?.DateTimeFormat().resolvedOptions().timeZone; // Get user's time zone
  const parsedDate = DateTime?.fromISO(time, { zone: userTimeZone }); // Convert UTC date to user's local time zone
  const formattedDate = parsedDate?.toFormat('yyyy-MM-dd HH:mm'); // Format the parsed date

  return (
    <div
      onClick={handleItemClick}
      onMouseOut={handleHoverOut}
      onMouseOver={handleHover}
      className={
        'text-[14px] flex items-center hover:text-gray-400 hover:bg-sirp-primaryLess2 p-2 cursor-pointer rounded-lg hover:rounded-none hover:shadow justify-between'
      }
    >
      <div className="flex gap-3 items-center  hover:text-gray-400">
        {/* Save icon */}
        <Tooltip title="Remove from Bookmark">
          <Image
            src={
              isBookmarked
                ? require(`../../../../../public/icons/on.saved.svg`)
                : require(`../../../../../public/icons/saved.svg`)
            }
            alt="documents"
            className="cursor-pointer w-4 h-4"
            width={30}
            height={30}
            onClick={e => handleBookMark(e, uuid)}
          />
        </Tooltip>
        {/* title */}
        <p className="text-sirp-black-500 ml-2 md:w-[40rem] hover:text-gray-400">
          {useTruncate(title, 87)}
        </p>
      </div>

      {/* confidence level */}
      {showaction === 0 ? (
        <div className="md:w-[15%] hidden md:block">
          <p className="text-gray-400 border-l-2 pl-2 ">{roundedValue}%</p>
        </div>
      ) : null}
      {/* time */}
      <div className="flex w-[8rem] mr-[3rem] md:mr-[5rem]">
        <p>{formattedDate}</p>
      </div>
      {/* overflow buttons */}
      {showaction === 1 && (
        <div className="border-l-2" onClick={e => handleDelete(e, uuid)}>
          {actionButtons}
        </div>
      )}
      {loading && (
        <CustomModal
          style="md:w-[30%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setLoading(false)}
        >
          <div className="flex justify-center items-center mt-[10rem]">
            <Loader />
          </div>
        </CustomModal>
      )}
    </div>
  );
}

export default ListItem;
