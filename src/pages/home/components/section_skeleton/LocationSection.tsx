import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PublicIcon from "@mui/icons-material/Public";
import { useSelector } from "react-redux";

function LocationSection({ isLoading }) {
  const { data } = useSelector((state: any) => state?.factcheck);
  const locations = data?.countries || [];

  const locationText = locations?.length > 0 ? locations?.join(", ") : "Location not found";

  return (
    <div className="w-[25rem]">
      <p className="text-gray-500">
        {isLoading ? <Skeleton width={50} /> : "Location"}
      </p>
      {isLoading ? (
        <Skeleton width={50} height={50} circle />
      ) : (
        <PublicIcon />
      )}
      <div className="flex gap-3 items-center mt-3">
        <div>
          <span className="font-bold">
            {isLoading ? <Skeleton width={150} /> : locationText}
          </span>
        </div>
      </div>
    </div>
  );
}

export default LocationSection;
