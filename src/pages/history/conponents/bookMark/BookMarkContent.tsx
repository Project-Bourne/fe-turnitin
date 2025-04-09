import React, { useCallback, useState } from 'react';
// import DeleteIcon from './deleteIcon';
// import ListItem from './BookMarkListItem';
import NoBookMark from './NoBookMark';
import { useDispatch, useSelector } from 'react-redux';
// import HistoryTableHeader from '../history/HistoryTableHeader';
import Table, { type TableData } from '@/components/ui/Table'; // Import Table and TableData
import FactcheckService from '@/services/factcheck.service'; // Import FactcheckService for delete
import NotificationService from '@/services/notification.service'; // Import NotificationService
import { setBookMark, setHistory } from '@/redux/reducer/factcheckSlice'; // Import action to update bookmarks in store

/**
 * Renders the content for the Bookmark tab, displaying bookmarked fact checks.
 * Uses the reusable Table component and handles deletion.
 * @returns {JSX.Element} The rendered BookMarkContent component.
 */
function BookMarkContent() {
  // Get bookmark data and the original history data (needed for refetching potentially)
  const { bookMark, history } = useSelector((store: any) => store.factcheck);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  /**
   * Handles the deletion of a bookmarked item.
   * Calls the service to delete the item and updates the Redux store.
   * @param {string} uuid - The UUID of the item to delete.
   */
  const handleDelete = useCallback(async (uuid: string) => {
    setLoading(true);
    try {
      // Use the static deleteFact method from FactcheckService
      await FactcheckService.deleteFact(uuid);
      NotificationService.success({ message: 'Bookmark deleted successfully.' });

      // Update the bookmark list in the Redux store
      // Option 1: Filter out the deleted item locally
      // const updatedBookmarks = bookMark.filter(item => item.uuid !== uuid);
      // dispatch(setBookMark(updatedBookmarks));

      // Option 2: Refetch bookmarks (if an endpoint exists) or history
      // This depends on how bookmarks are initially fetched and stored.
      // If bookmarks are just filtered history, refetching history might be needed.
      const factService = new FactcheckService();
      const updatedHistory = await factService.getFactHistory(history?.currentPage || 1);
      dispatch(setHistory(updatedHistory?.data)); // This would implicitly update bookmarks via the useEffect in BookMark.tsx

    } catch (error: unknown) {
      console.error("Error deleting bookmark:", error);
      const errorMessage = error instanceof Error ? error.message : 'Could not delete bookmark.';
      NotificationService.error({
        message: 'Error deleting bookmark',
        addedText: <p>{errorMessage}</p>,
        position: 'top-center'
      });
    } finally {
      setLoading(false);
    }
  }, [dispatch, bookMark]); // Dependency on bookMark for filtering

  // Create dummy data for bookmarks testing (only bookmarked items)
  const dummyBookmarkData: TableData[] = [
    {
      uuid: '2',
      title: 'COVID-19 Vaccine Efficacy Study',
      content5wh: 'New study evaluates long-term efficacy of major COVID-19 vaccines against emerging variants, showing continued protection against severe disease.',
      summary: ['Vaccines remain effective against severe disease', 'Protection against new variants varies', 'Boosters recommended for vulnerable populations'],
      createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      isBookmarked: true,
      onDelete: handleDelete,
    },
    {
      uuid: '4',
      title: 'Renewable Energy Milestone Reached',
      content5wh: 'Several countries report renewable energy production exceeding 50% of their total energy needs for the first time, marking a significant milestone in green energy adoption.',
      summary: ['Wind and solar lead growth', 'Storage technology improving', 'Policy incentives driving adoption'],
      createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      isBookmarked: true,
      onDelete: handleDelete,
    },
    {
      uuid: '7',
      title: 'New Treatment for Alzheimer\'s Shows Promise',
      content5wh: 'Clinical trials for a new Alzheimer\'s treatment show significant reduction in cognitive decline among early-stage patients, offering hope for millions affected by the disease.',
      summary: ['Drug targets protein buildup in brain', 'Side effects minimal in most patients', 'FDA review expected by year end'],
      createdAt: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
      isBookmarked: true,
      onDelete: handleDelete,
    }
  ];

  // Use dummy data instead of actual data for development/testing
  // const tableData: TableData[] = dummyBookmarkData;

  // // If using real data, uncomment this:
  const tableData: TableData[] = bookMark?.map(item => ({
    uuid: item?.uuid,
    title: item?.fact?.confidence?.title || 'No Title',
    content5wh: item?.fact?.confidence?.content5wh || item?.fact?.summary?.join(' '),
    summary: item?.fact?.summary,
    createdAt: item?.createdAt,
    isBookmarked: true, // All items here are bookmarked
    // No onBookmark handler needed in this view
    onDelete: handleDelete,     // Pass the delete handler
  })) || [];

  // Show NoBookMark component if the list is empty
  if (!loading && (!bookMark || bookMark.length === 0)) {
    return <NoBookMark />;
  }

  return (
    <>
      {/* Commenting out the old rendering logic */}
      {/* {bookMark?.length > 0 ? ( */}
      {/*  <> */}
      {/*    <HistoryTableHeader /> */}
      {/*    {bookMark?.map(item => ( */}
      {/*      <div key={item?.uuid}> */}
      {/*        <ListItem */}
      {/*          uuid={item?.uuid} */}
      {/*          factUuid={item?.fact?.uuid} */}
      {/*          title={item.fact?.confidence?.title} */}
      {/*          factLevel={item?.fact?.confidence?.level} */}
      {/*          time={item?.createdAt} */}
      {/*          isBookmarked={item?.bookmark} // This was likely always true here */}
      {/*          buttonType="action" */}
      {/*          actionButtons={<DeleteIcon doc={item?.fact?.url} />} */}
      {/*        /> */}
      {/*      </div> */}
      {/*    ))} */}
      {/*  </> */}
      {/* ) : ( */}
      {/*  <NoBookMark /> */}
      {/* )} */}

      {/* Render the new Table component for bookmarks */}
      <Table
        data={tableData}
        totalItems={tableData.length} // Total items is just the current list length
        page={0} // Bookmarks likely don't paginate, start at page 0
        loading={loading}
        onPageChange={() => {}} // No pagination change handling needed
        isBookmarkView={true} // Indicate this is the bookmark view
      />
    </>
  );
}

// Rename component to follow PascalCase convention
export default BookMarkContent;
