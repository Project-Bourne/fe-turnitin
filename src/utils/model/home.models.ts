import React from 'react';
interface ListItemModels {
  uuid?: string | number;
  factUuid?: string | number;
  isBookmarked?: any;
  summaryUuid?:any;
  summary?:any;
  title?: string;
  factLevel?: any;
  time?: string;
  actionButtons?: React.ReactNode;
  viewDeleteButtons?: React.ReactNode;
  buttonType?: string;
}
export default ListItemModels;
