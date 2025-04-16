import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from '@/hooks/FetchData';
import HistoryContent from './HistroyContent';
import FactcheckService from '@/services/factcheck.service';

function History() {
  const dispatch = useDispatch();

  // const fetchData = async () => {
  //   const factcheckService = new FactcheckService()

  //   const response = await factcheckService.getFactHistory();
  //   console.log('Fact Response:', response)
  //   dispatch(setHistory(response.data))
  // }

  useEffect(() => {
    // fetchData();
    fetchData(dispatch); // Pass the dispatch function
  }, [dispatch]);

  return (
    <div className="bg-sirp-listBg border h-[100%] w-100full my-2 md:mx-5 mx-2 pt-5 pb-5 rounded-[1rem]">
      <HistoryContent />
    </div>
  );
}

export default History;
