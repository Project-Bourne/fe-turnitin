import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTruncate } from '@/components/custom-hooks';
import Image from 'next/image';
import ListItemModels from '../../../../utils/model/home.models';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import HomeService from '@/services/factcheck.service';
// import { fetchData } from '@/hooks/FetchData';
import NotificationService from '@/services/notification.service';


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


  const handleHover = () => {
    setShowAction(1);
    console.log(factLevel, 'factLevel')
  };

  const handleHoverOut = () => {  // Handle the hover out event
    setShowAction(0);
  };

  const handleItemClick = () => {  // Handle the item click event to
    router.push(`/home/${factUuid}`);
  };

  const handleBookMark = async (e, uuid) => {
    e.stopPropagation();
   HomeService.bookMarkSummary(uuid)
   .then((res: any) => {
    // fetchData(dispatch); // Pass the fetch the updated data
   })
   .catch((err) => {
      NotificationService.error({
        message: "Error!",
        addedText: <p>{err?.message}. Please try again</p> // Add a closing </p> tag
      });
   })
      
  };
  
  const handleDelete = async (e, uuid) => {
    e.stopPropagation();
    HomeService.deleteSummary(uuid)
   .then((res: any) => {
    // fetchData(dispatch); // Pass the fetch the updated data
    NotificationService.success({
      message: "success!",
      addedText: <p>{res?.message} History deleted</p> // Add a closing </p> tag
    });
   })
   .catch((err) => {
      NotificationService.error({
        message: "Error!",
        addedText: <p>{err?.message} Please try again</p> // Add a closing </p> tag
      });
   })
  }


  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get user's time zone
  const parsedDate = DateTime.fromISO(time, { zone: userTimeZone }); // Convert UTC date to user's local time zone
  const formattedDate = parsedDate.toFormat('yyyy-MM-dd HH:mm'); // Format the parsed date

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
        <Image
          src={
            isBookmarked
              ? require(`../../../../assets/icons/on.saved.svg`)
              : require(`../../../../assets/icons/saved.svg`)
          }
          alt="documents"
          className="cursor-pointer w-4 h-4"
          width={30}
          height={30}
          onClick={e => handleBookMark(e, uuid)}
        />
        {/* title */}
        <p className="text-sirp-black-500 ml-2 md:w-[40rem] hover:text-gray-400">
          {useTruncate(title, 90)}
        </p>
      </div>
    
      {/* confidence level */}
      {showaction === 0 ? (
        <div className="md:w-[15%] hidden md:block">
          <p className="text-gray-400 border-l-2 pl-2 ">{factLevel}</p>
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
    </div>
  );
}

export default ListItem;
