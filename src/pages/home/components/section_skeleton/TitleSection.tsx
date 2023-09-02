import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function TitleSection({ isLoading }) {
  return (
    <div className="mx-5">
      <p className="text-gray-500">
        {isLoading ? <Skeleton width={50} /> : "Title"}
      </p>
      <h1 className="text-black text-3xl">
        {isLoading ? <Skeleton /> : "I don tire"}
      </h1>
    </div>
  );
}
export default TitleSection;
