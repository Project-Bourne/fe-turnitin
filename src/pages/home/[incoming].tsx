import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import LoadingModal from './components/FileUpload/LoadingModal';
import FactcheckService from '@/services/factcheck.service';
import { setData } from '@/redux/reducer/factcheckSlice';
import NotificationService from '@/services/notification.service';
import { useRouter } from 'next/router';
import { Cookies } from 'react-cookie';
import Auth from '../../services/auth.service';
import CustomModal from '@/components/ui/CustomModal';
import Loader from '../history/conponents/Loader';
import { setUserInfo } from '@/redux/reducer/authReducer';
import HomeContent from './components/[homecontent]';

function FileUploadSection() {
  const [isLoading, setIsLoading] = useState(false);
  const factcheckService = new FactcheckService();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadText, setUploadText] = useState('');
  const { incoming } = router.query;
  const [imporData, setImportData] = useState([]);
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
          console.log('routeId', routeId);
          console.log('routeName', routeName);
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
            case 'analyser':
              url = `http://192.81.213.226:81/81/analysis/${routeId}`;
              break;
            case 'interrogator':
              url = `http://196700:h/${routeId}`;
              break;
            case 'collab':
              url = `http://192.81.213.226:81/86/api/v1/doc/${routeId}`;
              break;
            default:
              throw new Error('Invalid routeName');
          }

          const response = await fetch(url, {
            method: 'GET',
            headers: headers
          });

          if (!response.ok) {
          }
          const data = await response.json();
          console.log('data', data);
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
            case 'analyser':
              setUploadText(data?.data?.text);
            case 'collab':
              const collabData: string[] = data?.data?.data?.ops.map(el => {
                return el.insert;
              });
              setUploadText(collabData.join(' '));
              break;
            case 'interrogator':
            case 'deepchat':
              break;
            default:
              break;
          }
          setLoading(false);
        } catch (error: any) {
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

  const handleFactUpload = async () => {
    try {
      setIsLoading(true);
      const dataObj = {
        text: uploadText,
        uri: 'Uploaded File'
      };
      const response = await factcheckService.factcheckUpload(dataObj);
      if (response?.status) {
        dispatch(setData(response.data));
        setImportData(response.data);
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

        {imporData?.length == 0 ? (
          <>
            <div className="w-full">
              <form
                onSubmit={handleFactUpload}
                className="flex align-middle w-full h-[15rem] border-2 rounded-[1rem] border-[#E5E7EB]-500 border-dotted"
              >
                <span className="flex align-middle justify-center mx-3">
                  <Image
                    src={require('../../../public/icons/link.svg')}
                    alt="upload image"
                    width={20}
                    height={20}
                    priority
                  />
                </span>
                <textarea
                  placeholder="Copy and paste content text here"
                  className={`w-[95%] outline-none text-justify focus:ring-0 pt-[0.5rem] my-[1.5rem] resize-y min-h-[1.5rem] max-h-[15rem] overflow-auto`}
                  value={uploadText}
                  onChange={e => setUploadText(e.target.value)} // Uncomment this line
                />

                <span className="flex align-middle justify-center mx-3">
                  <Image
                    className="flex align-middle justify-center font-light text-[#A1ADB5] cursor-pointer"
                    src={require('../../../public/icons/x.svg')}
                    alt="upload image"
                    width={20}
                    height={20}
                    onClick={() => setUploadText('')}
                  />
                </span>
              </form>
            </div>
            {/* factcheck Button */}
            <div className="flex md:w-[50%] w-[100%] justify-center mt-4 mx-auto">
              <div
                className="p-5 cursor-pointer flex md:w-[30%] w-[50%] align-middle justify-center bg-[#4582C4] border-2 text-white rounded-[15px] font-extrabold"
                onClick={handleFactUpload}
              >
                <span>Fact Check</span>
              </div>
            </div>
          </>
        ) : (
          <div>
            <HomeContent />
          </div>
        )}
        {isLoading && <LoadingModal closeModal={closeModal} />}
      </div>
    </div>
  );
}

export default FileUploadSection;
