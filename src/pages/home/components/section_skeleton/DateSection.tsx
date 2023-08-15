import React, { useEffect, useState } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function DateSection({ isLoading, date }) {
  return (
    <div className="w-[25rem]">
      <p className="text-gray-500 pl-10">
        {isLoading ? <Skeleton width={50} /> : "Date"}
      </p>
      <div className="flex gap-3 border-l-2 border-sirp-keynotebg pl-10 items-center my-5">
        {isLoading ? (
          <Skeleton width={50} height={50} circle />
        ) : (
          <Image
            src={require("../../../../assets/icons/date.svg")}
            alt="documents"
            className="cursor-pointer"
            width={50}
          />
        )}

        <div>
          <p className="font-bold">
            {isLoading ? <Skeleton width={150} /> : date.date}
          </p>
          <p className="text-gray-500 text-sm">
            {isLoading ? <Skeleton width={150} /> : date.time}
          </p>
        </div>
      </div>
    </div>
  );
}
export default DateSection;
