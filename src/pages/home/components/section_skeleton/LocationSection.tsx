import React from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function LocationSection({ isLoading, location }) {
  return (
    <div className="w-[25rem]">
      <p className="text-gray-500">
        {isLoading ? <Skeleton width={50} /> : "Location"}
      </p>
      <div className="flex gap-3 items-center mt-3">
        {isLoading ? (
          <Skeleton width={50} height={50} circle />
        ) : (
          <Image
            src={require("../../../../assets/icons/map.svg")}
            alt="documents"
            className="cursor-pointer"
            width={50}
          />
        )}

        <div>
          <p className="font-bold">
            {isLoading ? <Skeleton width={150} /> : location.country}
          </p>
          <p className="text-gray-500 text-sm">
            {isLoading ? <Skeleton width={150} /> : location.city}
          </p>
        </div>
      </div>
    </div>
  );
}
export default LocationSection;
