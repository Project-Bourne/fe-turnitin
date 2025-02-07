import React from 'react';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useSelector } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';

/**
 * Formats and cleans up the author name
 * @param {string} authorName - The raw author name
 * @returns {string} - The cleaned and formatted author name
 */
const formatAuthorName = (authorName: string): string => {
  if (!authorName) return '';
  
  // Remove duplicates by splitting on spaces and filtering unique words
  const words = authorName.split(' ');
  const uniqueWords = Array.from(new Set(words));
  return uniqueWords.join(' ').trim();
};

function AuthorSection({ isLoading }) {
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
    domain = 'Uploaded file';
  }

  let author = data?.confidence?.author;

  // Check if author is an array and not empty
  if (Array.isArray(author) && author.length > 0) {
    author = author[0]; // Take the first element from the array
  } else {
    // Format the author name to remove duplications
    author = formatAuthorName(author);
  }

  // If author is still an empty string, use the domain
  if (typeof author !== 'string' || author.trim() === '') {
    author = domain;
  } else {
    // Format the author name to remove duplications
    author = formatAuthorName(author);
  }

  return (
    <div className="mt-3 w-[25rem]">
      <p className="text-gray-500 mt-3">
        {isLoading ? <Skeleton width={50} /> : 'Author'}
      </p>
      <div className="flex gap-3 items-center my-5">
        {isLoading ? (
          <Skeleton circle width={50} height={50} />
        ) : (
          <PersonIcon />
        )}
        <div>
          <p className="font-bold">
            {isLoading ? 
              <Skeleton width={150} /> : 
              author || domain  // Fallback to domain if author is empty after formatting
            }
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthorSection;
