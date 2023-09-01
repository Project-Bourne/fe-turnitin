import React from 'react';
import Left from './components/LeftCompt';
import Right from './components/RightCompt';
import Card from './components/Card';

const index = () => {
  return (
    <div className="h-full overflow-y-scroll mt-[10rem]">
      <h1 className="text-black text-2xl pl-10 font-bold">
        Welcome Oluanrawaju
      </h1>

      {/* the yellow navigation at the top of the dashboard page */}
      <div className="grid grid-cols-1 px-[5px] md:px-0 md:grid-cols-2 md:items-center w-full md:gap-x-[20px] gap-y-[20px] mt-5">
        <Left />
        <Right />
      </div>
      {/* <dashboard cards /> */}
      <div className="mt-5 mb-5 mx-5 px-1 flex justify-start items-start md:justify-evenly md:flex-row flex-wrap gap-x-5 md:gap-x-0">
        <Card />
      </div>
    </div>
  );
};

export default index;
