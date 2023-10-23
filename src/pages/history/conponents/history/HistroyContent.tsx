import React, { useState } from 'react';
import DeleteIcon from './deleteIcon';
import ListItem from './HistoryListItem';
import NoHistory from './NoHistroy';
import { useDispatch, useSelector } from 'react-redux';
import HistoryTableHeader from './HistoryTableHeader';
import { Pagination } from '@mui/material';
import { setHistory, updatePagination } from '@/redux/reducer/factcheckSlice';
import FactcheckService from '@/services/factcheck.service';
import CustomModal from '@/components/ui/CustomModal';
import Loader from '../Loader';

function HistoryContent() {
  const { history } = useSelector((store: any) => store?.factcheck); // Get the data from Redux store
  const itemsPerPage = history?.itemsPerPage || 10;
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(history?.currentPage || 1);
  const dispatch = useDispatch();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = async (event, page) => {
    setLoading(true);
    setCurrentPage(page);
    const factService = new FactcheckService();
    try {
      dispatch(updatePagination({ currentPage: page }));
      const Data = await factService.getFactHistory(page);
      dispatch(setHistory(Data?.data));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
     {loading && (
        <CustomModal
          style="md:w-[30%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setLoading(false)}
        >
          <div className="flex justify-center items-center mt-[10rem]">
            <Loader />
          </div>
        </CustomModal>
      )}
      {history?.facts?.length > 0 ? (
        <>
          <HistoryTableHeader />
          {history?.facts?.map(item => {
            return (
              <div key={item?.uuid}>
                <ListItem
                  uuid={item?.uuid}
                  factUuid={item?.fact?.uuid}
                  title={item?.fact?.confidence?.title}
                  factLevel={item?.fact?.confidence?.level}
                  time={item?.createdAt}
                  isBookmarked={item?.bookmark}
                  buttonType="action"
                  actionButtons={<DeleteIcon doc={item?.fact?.url} />}
                />
              </div>
            );
          })}
          <div className="me:w-[100%] m-5 flex justify-end items-center ">
            <Pagination
              count={Math.ceil(history.totalItems / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              color="primary"
            />
          </div>
        </>
      ) : (
        <NoHistory />
      )}
    </>
  );
}

export default HistoryContent;
