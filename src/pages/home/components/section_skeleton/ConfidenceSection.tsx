import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ProgressBar from '../ProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import NotificationService from '@/services/notification.service';
import FactcheckService from '@/services/factcheck.service';
import CustomModal from '@/components/ui/CustomModal';
import Loader from '@/pages/history/conponents/Loader';
import { setData } from '@/redux/reducer/factcheckSlice';

function ConfidenceSection({ isLoading }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { data } = useSelector((state: any) => state?.factcheck);
  const confidencePercent = data?.confidence?.level
    ? Math.ceil(parseFloat(data?.confidence?.level))
    : 0;
  const source = data?.url ? data?.url : '';

  const factUuid = (data?.uuid);

  /**
   * Validates if a given string is a valid URL
   * @param {string} url - The URL string to validate
   * @returns {boolean} - Returns true if the URL is valid, false otherwise
   */
  const isURL = (url: string): boolean => {
    if (!url || typeof url !== 'string') return false;
    
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      // If the URL is not properly formatted, try adding https:// and validate again
      try {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          const urlObj = new URL(`https://${url}`);
          return true;
        }
        return false;
      } catch {
        return false;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isURL(source)) {
        const dataObj = {
          url: source,
        };
        const response = await FactcheckService.reviewFactcheckUrl(dataObj);
        if (response.status) {
          NotificationService.success({
            message: 'Success!',
            addedText: <p>Review confidence successful</p>,
            position: 'top-center',
          });
  
          // Trigger handleUpdateFact after a successful review
          handleUpdateFact();
        } else {
          NotificationService.error({
            message: 'Error!',
            addedText: <p>{`${response?.message}, please try again`}</p>,
            position: 'top-center',
          });
        }
      } else {
        NotificationService.error({
          message: 'Error!',
          addedText: <p>Invalid URL. Please enter a valid URL.</p>,
          position: 'top-center',
        });
      }
    } catch (error: any) {
      NotificationService.error({
        message: 'Error!',
        addedText: <p>{`${error?.message}, please try again`}</p>,
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };
  

  const handleUpdateFact = () => {
    // Handle the item click event to
    async function fetchSummary() {
      const factService = new FactcheckService();
      if (factUuid) {
        try {
          setLoading(true);
          const response = await factService.getFact(factUuid);
          if (response.status) {
            dispatch(setData(response.data));
            setLoading(false);
          } else {
            setLoading(false);
           
          }
        } catch (err:any) {
          setLoading(false);
        }
      }
    }

    fetchSummary();
  };

  return (
    <div className="mt-3 w-[25rem]">
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
      <p className="text-gray-500 mt-3 pl-10">
        {isLoading ? <Skeleton width={150} /> : 'Confidence'}
      </p>
      <div className="flex gap-3 border-l-2 border-sirp-keynotebg pl-10 items-center my-5">
        <div className="w-12">
          {isLoading ? (
            <Skeleton width={50} height={50} circle />
          ) : (
            <ProgressBar />
          )}
        </div>
        <div>
          <p className="font-bold">
            {isLoading ? (
              <Skeleton width={150} />
            ) : (
              `${!Number.isNaN(confidencePercent) ? confidencePercent : 0}% Confidence Level`
            )}
          </p>
          {isURL(source) && !isLoading && (
            <p
              className="text-red-500 text-xs rounded-[1rem] border text-center w-[8rem] cursor-pointer"
              onClick={handleSubmit}
            >
              Review confidence
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConfidenceSection;
