import React from 'react';

function HistoryTableHeader() {
  return (
    <div className="flex items-center md:justify-start justify-between bg-gray-200 w-full p-2 rounded-t-lg">
      <div className="md:pl-9 md:pr-[44rem]">
        <p className="font-bold">Title</p>
      </div>
      <div className="hidden md:block md:pr-[10.5rem]">
        <p className="font-bold">Confidence Level</p>
      </div>
      <div className="">
        <p className="font-bold mr-[5rem] md:mr-0">Time Stamp</p>
      </div>
    </div>
  );
}

export default HistoryTableHeader;
