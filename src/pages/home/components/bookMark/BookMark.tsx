import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { setBookMark } from '@/redux/reducer/factcheckSlice';
import BookMarkContent from './BookMarkContent';

function BookMark() {
  // const { history } = useSelector((store: any) => store.summary); // Get the data from Redux store
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(setBookMark(history));
  // }, [history]);

  return (
    <div className="bg-sirp-listBg border h-[100%] w-100full my-2 md:mx-5 mx-2 pt-5 pb-5 rounded-[1rem]">
      <BookMarkContent />
    </div>
  );
}

export default BookMark;
