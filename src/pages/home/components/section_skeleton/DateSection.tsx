import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

function DateSection({ isLoading }) {
  const { data } = useSelector((state: any) => state?.factcheck);
  const time = data?.createdAt ? data?.createdAt : 'No Date';

  const userTimeZone = Intl?.DateTimeFormat()?.resolvedOptions().timeZone; // Get user's time zone
  const parsedDate = DateTime?.fromISO(time, { zone: userTimeZone }); // Convert UTC date to user's local time zone
  const formattedDate = parsedDate?.toFormat('yyyy-MM-dd'); // Format the parsed date
  const formattedTime = parsedDate?.toFormat('HH:mm'); // Format the parsed date

  return (
    <div className="w-[25rem]">
      <p className="text-gray-500 pl-10">
        {isLoading ? <Skeleton width={50} /> : 'Date'}
      </p>
      <div className="flex gap-3 border-l-2 border-sirp-keynotebg pl-10 items-center my-5">
        {isLoading ? (
          <Skeleton width={50} height={50} circle />
        ) : (
          <CalendarTodayIcon/>
        )}

        <div>
          <p className="font-bold">
            {isLoading ? <Skeleton width={150} /> :  formattedDate }
          </p>
          <p className="text-gray-500 text-sm">
            {isLoading ? <Skeleton width={150} /> : formattedTime}
          </p>
        </div>
      </div>
    </div>
  );
}
export default DateSection;
