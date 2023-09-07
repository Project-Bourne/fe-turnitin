import React from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PlaceIcon from '@mui/icons-material/Place';

function LocationSection({ isLoading }) {
  return (
    <div className="w-[25rem]">
      <p className="text-gray-500">
        {isLoading ? <Skeleton width={50} /> : "Location"}
      </p>
      <div className="flex gap-3 items-center mt-3">
        {isLoading ? (
          <Skeleton width={50} height={50} circle />
        ) : (
          <PlaceIcon/>
        )}

        <div>
          <p className="font-bold">
            {isLoading ? <Skeleton width={150} /> : "Nigeria"}
          </p>
          <p className="text-gray-500 text-sm">
            {isLoading ? <Skeleton width={150} /> : "Abuja"}
          </p>
        </div>
      </div>
    </div>
  );
}
export default LocationSection;
