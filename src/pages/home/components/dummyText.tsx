import React from 'react';

function dummyText(props) {
  console.log('here is the second line ', props.summaryText); 
  return (
    <div className='text-justify pr-10'>
      <p className="text-md text-gray-500 py-5">Content</p>
      <p className="py-5 text-[14px]">
        {props.summaryText}
      </p>
 
    </div>
  );
}

export default dummyText;
