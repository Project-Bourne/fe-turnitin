import React from "react";
import { useTruncate } from "@/components/custom-hooks";
import { ListItemModels } from "../model/home.model";

function ListItem({ name, desc, message, time }: ListItemModels) {
  return (
    <div className="grid md:flex justify-between items-center text-[14px] hover:text-gray-400 hover:bg-sirp-primaryLess2 hover:rounded-none hover:shadow border-b-2 py-5 pl-10 cursor-pointer hover:translate-x-2">
      <div className="flex gap-3 items-center hover:text-gray-400">
        <p className="text-sirp-black-500 ml-2 md:w-[12rem] hover:text-gray-400 text-[1rem]">
          {name}
        </p>
      </div>
      <div className="hover:text-gray-400">
        <p className="text-black-100 md:w-[25rem] text-[1rem]">
          {useTruncate(desc, 47)}
        </p>
      </div>
      <div className="md:w-[15%]">
        <p className="text-gray-400 border-l-2 pl-2 ">
          {useTruncate(message, 15)}
        </p>
      </div>
      <div className="flex w-[5%] md:mr-[5rem]">
        <p>{time}</p>
      </div>
    </div>
  );
}

export default ListItem;
