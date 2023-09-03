import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useSelector } from 'react-redux';
import { useTruncate } from '@/components/custom-hooks';

function TitleSection({ isLoading }) {
  const { data } = useSelector((state: any) => state.factcheck);

  // Check if data.url exists
  const title = data.url ? data.url : "No Title";

  // Use useTruncate to truncate the title
  const truncatedTitle = useTruncate(title, 65);

  return (
    <div className="mx-5 md:w-full ">
      <p className="text-gray-500">
        {isLoading ? <Skeleton width={50} /> : 'Title'}
      </p>
      <h1 className="text-black text-3xl">
        {isLoading ? <Skeleton /> : truncatedTitle}
      </h1>
    </div>
  );
}

export default TitleSection;
