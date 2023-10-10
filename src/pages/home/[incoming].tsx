import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import LoadingModal from './components/FileUpload/LoadingModal';
import FactcheckService from '@/services/factcheck.service';
import { setData } from '@/redux/reducer/factcheckSlice';
import NotificationService from '@/services/notification.service';
import { useRouter } from 'next/router';
import { Cookies } from 'react-cookie';
import { useTruncate } from '@/components/custom-hooks';
import { Tooltip } from '@mui/material';
import CustomModal from '@/components/ui/CustomModal';
import Loader from '../history/conponents/Loader';

function FileUploadSection() {
  const [isLoading, setIsLoading] = useState(false);
  const factcheckService = new FactcheckService();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadText, setUploadText] = useState('');
  const { incoming } = router.query;
  const cookies = new Cookies();
  const token = cookies.get('deep-access');
  const headers = {
    'deep-token': token
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (typeof incoming === 'string') {
        try {
          const [routeId, routeName] = incoming.split('&');
          let url;

          switch (routeName) {
            case 'summarizer':
              url = `http://192.81.213.226:81/82/summary/${routeId}`;
              break;
            case 'translator':
              url = `http://192.81.213.226:81/83/translation/${routeId}`;
              break;
            case 'factcheck':
              url = `http://192.81.213.226:81/84/fact/${routeId}`;
              break;
            case 'irp':
              url = `http://192.81.213.226:81/84/fact/${routeId}`;
              break;
            case 'deepchat':
              url = `http://192.81.213.226:81/85/deepchat/${routeId}`;
              break;
            case 'analyzer':
              url = `http://192.81.213.226:81/81/analysis/${routeId}`;
              break;
            case 'interrogator':
              url = `http://196700:h/${routeId}`;
              break;
            case 'collab':
              url = `http://192.81.213.226:81/86/api/v1/${routeId}`;
              break;
            default:
              throw new Error('Invalid routeName');
          }

          const response = await fetch(url, {
            method: 'GET',
            headers: headers
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          switch (routeName) {
            case 'translator':
              setUploadText(data?.data?.textTranslation);
              break;
            case 'factcheck':
              setUploadText(data?.data?.confidence?.content5wh);
              break;
            case 'irp':
              setUploadText(data?.data?.confidence?.content5wh);
              break;
            case 'summarizer':
              setUploadText(data?.data?.summaryArray[0].summary);
              break;
            case 'analyzer':
              setUploadText(data?.data?.text);
            case 'interrogator':
            case 'collab':
            case 'deepchat':
              break;
            default:
              break;
          }
          setLoading(false);
        } catch (error: any) {
          console.error('Error:', error);
          NotificationService?.error({
            message: 'Error!',
            addedText: <p>{`${error?.message}, please try again`}</p>,
            position: 'top-center'
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [incoming]);

  const truncatedTitle = useTruncate(uploadText, 40);

  const handleFactUpload = async () => {
    try {
      setIsLoading(true);
      const dataObj = {
        text: uploadText,
        // uri: ''
      };
      const response = await factcheckService.factcheckUpload(dataObj);
      if (response?.status) {
        dispatch(setData(response.data));
        NotificationService.success({
          message: 'Success!',
          addedText: <p>{response?.message}</p>,
          position: 'top-right'
        });
      } else {
        NotificationService.error({
          message: 'Error!',
          addedText: <p>Something went wrong. Please try again.</p>
        });
        router?.push(`/home`);
      }
    } catch (error) {
      NotificationService.error({
        message: 'Error!',
        addedText: <p>Something went wrong. Please try again.</p>
      });
      router.push(`/home`);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsLoading(false);
  };
  return (
    <div>
      <div className="p-10 flex align-middle items-center w-full flex-col justify-center">
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
        {/* File Information */}
        <div className="p-5 flex md:w-[50%] w-[100%] align-middle justify-between bg-[#F3F5F6] border-2 border-[E8EAEC] rounded-[15px]">
          <div className="flex align-middle items-center justify-center">
            <span className="rounded-full bg-[#E8F8FD] flex align-middle justify-center w-[40px] h-[40px]">
              <Image
                src={require(`../../../public/icons/file.svg`)}
                alt="upload image"
                width={20}
                height={20}
                priority
              />
            </span>
            <div className="mx-4">
              <span>{truncatedTitle}</span>
              <div>
                <span className="text-xs text-[#6B7280]">
                  Exported to factcheck{' '}
                </span>
                <span className="text-xs text-[#6B7280]">100% uploaded</span>
              </div>
            </div>
          </div>
          <Tooltip title="Delete">
            <span className="rounded-full bg-[#FEE2E2] flex align-middle justify-center w-[70px] h-[40px] cursor-pointer">
              <Image
                src={require(`../../../public/icons/red-delete.svg`)}
                alt="upload image"
                width={18}
                height={18}
                priority
                onClick={() => router.push(`/home`)}
              />
            </span>
          </Tooltip>
        </div>
        {/* Summarize Button */}
        <div className="flex md:w-[50%] w-[100%] align-middle justify-end mt-4">
          <div
            className="p-5 cursor-pointer flex md:w-[30%] w-[50%] align-middle justify-center bg-[#4582C4] border-2 text-white rounded-[15px] font-extrabold"
            onClick={handleFactUpload}
          >
            <span>Factchecker</span>
          </div>
        </div>
      </div>
      {isLoading && <LoadingModal closeModal={closeModal} />}
    </div>
  );
}

export default FileUploadSection;
