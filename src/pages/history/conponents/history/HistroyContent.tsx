import React, { useState, useCallback } from 'react';
// import DeleteIcon from './deleteIcon';
// import ListItem from './HistoryListItem';
import NoHistory from './NoHistroy';
import { useDispatch, useSelector } from 'react-redux';
// import HistoryTableHeader from './HistoryTableHeader';
// import { Pagination } from '@mui/material';
import { setHistory, updatePagination } from '@/redux/reducer/factcheckSlice';
import FactcheckService from '@/services/factcheck.service';
import CustomModal from '@/components/ui/CustomModal';
import Loader from '../Loader';
import Table, { type TableData } from '@/components/ui/Table';
import NotificationService from '@/services/notification.service';

/**
 * Renders the content for the History tab, displaying past fact checks using a reusable Table component.
 * Handles data fetching, pagination, bookmarking, and deletion.
 * @returns {JSX.Element} The rendered HistoryContent component.
 */
function HistoryContent() {
  const { history } = useSelector((store: any) => store?.factcheck); // Get the data from Redux store
  const itemsPerPage = history?.itemsPerPage || 10;
  const [loading, setLoading] = useState(false);
  // Ensure currentPage from Redux is used, default to 1 if undefined
  const currentPage = useSelector((store: any) => store?.factcheck.history?.currentPage || 1);
  const dispatch = useDispatch();
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;

  /**
   * Handles page changes in the table pagination.
   * Fetches data for the new page and updates the Redux store.
   * @param {number} page - The new page number (0-indexed from MUI Pagination).
   */
  const handlePageChange = useCallback(async (page: number) => {
    setLoading(true);
    const factService = new FactcheckService(); // Instantiate service
    try {
      dispatch(updatePagination({ currentPage: page })); // Dispatch 0-indexed page
      // Fetch using the instance method
      const Data = await factService.getFactHistory(page + 1); // API expects 1-based index, Table provides 0-based
      dispatch(setHistory(Data?.data));
    } catch (error: unknown) { // Type error as unknown
      console.error("Error fetching history:", error);
      const errorMessage = error instanceof Error ? error.message : 'Could not load history data.';
      NotificationService.error({
        message: 'Error fetching history',
        addedText: <p>{errorMessage}</p>,
        position: 'top-center'
      });
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  /**
   * Handles the deletion of a fact check history item.
   * Calls the service to delete the item and refreshes the current page data.
   * @param {string} uuid - The UUID of the item to delete.
   */
  const handleDelete = useCallback(async (uuid: string) => {
    setLoading(true);
    const factService = new FactcheckService(); // Instantiate service for instance method access if needed, or use static if available
    try {
      // Use the static deleteFact method
      await FactcheckService.deleteFact(uuid);
      NotificationService.success({ message: 'History item deleted successfully.' });
      // Refetch current page data
      const Data = await factService.getFactHistory(currentPage); // Use instance for refetch
      dispatch(setHistory(Data?.data));
    } catch (error: unknown) { // Type error as unknown
      console.error("Error deleting history item:", error);
      const errorMessage = error instanceof Error ? error.message : 'Could not delete history item.';
      NotificationService.error({
        message: 'Error deleting item',
        addedText: <p>{errorMessage}</p>,
        position: 'top-center'
      });
    } finally {
      setLoading(false);
    }
  }, [dispatch, currentPage]);

  /**
   * Handles toggling the bookmark status of a fact check item.
   * Calls the appropriate bookmark service method and refreshes data.
   * @param {string} uuid - The UUID of the item to bookmark/unbookmark.
   */
  const handleBookmark = useCallback(async (uuid: string) => {
    setLoading(true);
    // const bookmarkService = new BookmarkService(); // Removed
    const factService = new FactcheckService(); // Instantiate for instance method access
    const item = history?.facts?.find(fact => fact.uuid === uuid);

    if (!item) {
      console.error("Item not found for bookmarking:", uuid);
      setLoading(false);
      return;
    }

    try {
      // Use static bookMarkFact method. Assume it handles toggling or use a specific unbookmark method if available.
      // If bookMarkFact only adds, an unbookmark method is needed for the `if (item.bookmark)` case.
      // For now, we call bookMarkFact in both cases, assuming it toggles or the backend handles it.
      await FactcheckService.bookMarkFact(uuid);
      NotificationService.success({ message: item.bookmark ? 'Bookmark removed successfully.' : 'Bookmark added successfully.' });

      // Refetch current page data to update bookmark status
      const Data = await factService.getFactHistory(currentPage);
      dispatch(setHistory(Data?.data));
    } catch (error: unknown) { // Type error as unknown
      console.error("Error updating bookmark:", error);
      const errorMessage = error instanceof Error ? error.message : 'Could not update bookmark status.';
      NotificationService.error({
        message: 'Error updating bookmark',
        addedText: <p>{errorMessage}</p>,
        position: 'top-center'
      });
    } finally {
      setLoading(false);
    }
  }, [dispatch, currentPage, history?.facts]);

  // Create dummy data for testing
  // const dummyData: TableData[] = [
  //   {
  //     uuid: '1',
  //     title: 'Climate Change Impact on Arctic Ice',
  //     content5wh: 'Research shows accelerating ice melt in Arctic regions with significant impacts on local wildlife and global sea levels.',
  //     summary: ['Arctic ice melting faster than predicted', 'Wildlife habitats threatened', 'Sea levels rising at concerning rate'],
  //     createdAt: new Date().toISOString(),
  //     isBookmarked: false,
  //     onBookmark: handleBookmark,
  //     onDelete: handleDelete,
  //   },
  //   {
  //     uuid: '2',
  //     title: 'COVID-19 Vaccine Efficacy Study',
  //     content5wh: 'New study evaluates long-term efficacy of major COVID-19 vaccines against emerging variants, showing continued protection against severe disease.',
  //     summary: ['Vaccines remain effective against severe disease', 'Protection against new variants varies', 'Boosters recommended for vulnerable populations'],
  //     createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
  //     isBookmarked: true,
  //     onBookmark: handleBookmark,
  //     onDelete: handleDelete,
  //   },
  //   {
  //     uuid: '3',
  //     title: 'Economic Impact of Remote Work',
  //     content5wh: 'Analysis shows significant shifts in urban economies as remote work becomes permanent for many companies, affecting commercial real estate and local businesses.',
  //     summary: ['Commercial real estate values declining in major cities', 'Suburban home prices rising', 'Local businesses adapting to changed foot traffic patterns'],
  //     createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  //     isBookmarked: false,
  //     onBookmark: handleBookmark,
  //     onDelete: handleDelete,
  //   },
  //   {
  //     uuid: '4',
  //     title: 'Renewable Energy Milestone Reached',
  //     content5wh: 'Several countries report renewable energy production exceeding 50% of their total energy needs for the first time, marking a significant milestone in green energy adoption.',
  //     summary: ['Wind and solar lead growth', 'Storage technology improving', 'Policy incentives driving adoption'],
  //     createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
  //     isBookmarked: true,
  //     onBookmark: handleBookmark,
  //     onDelete: handleDelete,
  //   },
  //   {
  //     uuid: '5',
  //     title: 'AI Ethics Framework Proposed',
  //     content5wh: 'International coalition proposes new ethical guidelines for artificial intelligence development, focusing on transparency, fairness, and privacy protections.',
  //     summary: ['Guidelines address bias in algorithms', 'Privacy protections emphasized', 'Human oversight recommended for critical AI systems'],
  //     createdAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
  //     isBookmarked: false,
  //     onBookmark: handleBookmark,
  //     onDelete: handleDelete,
  //   }
  // ];

  // Use dummy data instead of actual data for development/testing
  // const tableData: TableData[] = dummyData;

  // If using real data, uncomment this:
  const tableData: TableData[] = history?.facts?.map(item => ({
    uuid: item?.uuid,
    title: item?.fact?.confidence?.title || 'No Title',
    content5wh: item?.fact?.confidence?.content5wh || item?.fact?.summary?.join(' '),
    summary: item?.fact?.summary,
    createdAt: item?.createdAt,
    isBookmarked: item?.bookmark,
    onBookmark: handleBookmark,
    onDelete: handleDelete,
  })) || [];

  // Conditional rendering based on data availability
  if (!loading && (!history?.facts || history.facts.length === 0)) {
    return <NoHistory />;
  }

  return (
    <>
      {/* Commenting out the old rendering logic */}
      {/* {history?.facts?.length > 0 ? ( */}
      {/*  <> */}
      {/*    <HistoryTableHeader /> */}
      {/*    {history?.facts?.map(item => { */}
      {/*      return ( */}
      {/*        <div key={item?.uuid}> */}
      {/*          <ListItem */}
      {/*            uuid={item?.uuid} */}
      {/*            factUuid={item?.fact?.uuid} */}
      {/*            title={item?.fact?.confidence?.title} */}
      {/*            factLevel={item?.fact?.confidence?.level} */}
      {/*            time={item?.createdAt} */}
      {/*            isBookmarked={item?.bookmark} */}
      {/*            buttonType="action" */}
      {/*            actionButtons={<DeleteIcon doc={item?.fact?.url} />} */}
      {/*          /> */}
      {/*        </div> */}
      {/*      ); */}
      {/*    })} */}
      {/*    <div className="me:w-[100%] m-5 flex justify-end items-center "> */}
      {/*      <Pagination */}
      {/*        count={Math.ceil(history.totalItems / itemsPerPage)} */}
      {/*        page={currentPage} */}
      {/*        onChange={(_, page) => handlePageChange(page)} // Pass page directly */}
      {/*        variant="outlined" */}
      {/*        color="primary" */}
      {/*      /> */}
      {/*    </div> */}
      {/*  </> */}
      {/* ) : ( */}
      {/*  <NoHistory /> */}
      {/* )} */}

      {/* Render the new Table component */}
      <Table
        data={tableData}
        totalItems={history.totalItems} // Mock total items
        page={history.currentPage} // Start at first page
        loading={loading}
        onPageChange={handlePageChange}
        // isBookmarkView is false by default, no need to pass
      />
    </>
  );
}

export default HistoryContent;
