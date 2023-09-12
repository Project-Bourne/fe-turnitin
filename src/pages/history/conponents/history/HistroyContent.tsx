import React from 'react';
import DeleteIcon from './deleteIcon';
import ListItem from './HistoryListItem';
import NoHistory from './NoHistroy';
import { useSelector } from 'react-redux';

function HistoryContent() {
  const { history } = useSelector((store:any) => store.factcheck); // Get the data from Redux store

  return (
    <>
      {history.length > 0 ? (
        <>
          {history.map((item) => {
            // console.log("URL:", item.fact.url); // Console log the URL
            return (
              <div key={item.uuid}>
                <ListItem
                  uuid={item.uuid}
                  factUuid={item.fact.uuid}
                  title={item.fact.confidence.title}
                  factLevel={item.fact.confidence.level}
                  time={item.createdAt}
                  isBookmarked={item.bookmark}
                  buttonType="action"
                  actionButtons={<DeleteIcon doc={item.fact.url} />}
                />
              </div>
            );
          })}
        </>
      ) : (
        <NoHistory />
      )}
    </>
  );
}

export default HistoryContent;
