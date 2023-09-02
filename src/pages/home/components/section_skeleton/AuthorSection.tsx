import React from 'react';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useSelector } from 'react-redux';

function AuthorSection({ isLoading }) {
  const { data } = useSelector((state: any) => state.factcheck);
  const author = data.confidence.author ? data.confidence.author : 'Author not found';
  const authorLocation = data.confidence.authorLocation ? data.confidence.authorLocation : 'Location not Found';
  return (
    <div className="mt-3 w-[25rem]">
      <p className="text-gray-500 mt-3">
        {isLoading ? <Skeleton width={50} /> : 'Author'}
      </p>
      <div className="flex gap-3 items-center my-5 cursor-pointer">
        {isLoading ? (
          <Skeleton circle width={50} height={50} />
        ) : (
          <Image
            src={require('../../../../../public/icons/Avatarmeta.svg')}
            alt="documents"
            className="cursor-pointer"
            width={50}
          />
        )}
        <div>
          <p className="font-bold">
            {isLoading ? <Skeleton width={150} /> : author}
          </p>
        </div>
      </div>
    </div>
  );
}
export default AuthorSection;
