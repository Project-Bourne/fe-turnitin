import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from '@/hooks/FetchData';
import HistoryContent from './HistroyContent';

function History() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData(dispatch); // Pass the dispatch function
  }, [dispatch]);

  return (
    <div className="bg-sirp-listBg border h-[100%] w-100full my-2 md:mx-5 mx-2 pt-5 pb-5 rounded-[1rem]">
      <HistoryContent />
    </div>
  );
}

export default History;
