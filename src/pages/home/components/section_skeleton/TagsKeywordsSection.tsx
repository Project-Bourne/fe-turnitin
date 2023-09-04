import { useTruncate } from "@/components/custom-hooks";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";

function TagsKeywordsSection({ isLoading }) {
  const { data } = useSelector((state: any) => state.factcheck);

  // Check if data.url exists using optional chaining
  const source = data?.url ? data.url : "No Title";

  return (
    <div className="w-[25rem]">
      <p className="text-gray-500">
        {isLoading ? <Skeleton width={50} /> : "Source"}
      </p>
      <div className="flex gap-3 items-center mt-3">
        <div>
          <a href={source} target="_blank" rel="noopener noreferrer">
            {source}
          </a>
        </div>
      </div>
    </div>
  );
}

export default TagsKeywordsSection;
