import { Tooltip } from '@mui/material';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useSelector } from 'react-redux';

function TagsKeywordsSection({ isLoading }) {
  const { data } = useSelector((state: any) => state?.factcheck);
  const source = data?.url;
  let domain = '';

  // Check if data.url exists and is a valid URL using a try-catch block
  try {
    if (source) {
      const urlObject = new URL(source);
      domain = urlObject.hostname;
    }
  } catch (error) {
    // Handle the error here, e.g., set domain to a default value
    domain = 'Uploaded File';
  }

  return (
    <div className="w-[25rem]">
      <p className="text-gray-500">
        {isLoading ? <Skeleton width={50} /> : 'Source'}
      </p>
      <Tooltip title={source} placement="bottom">
        <div className="flex gap-3 items-center mt-3 p-2 overflow-hidden">
          {source && domain !== 'Uploaded File' ? (
            <a
              href={source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400"
            >
              {domain}
            </a>
          ) : (
            <span>{domain}</span>
          )}
        </div>
      </Tooltip>
    </div>
  );
}

export default TagsKeywordsSection;
