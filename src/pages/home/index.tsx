import React, { useEffect, useState } from 'react';
import FileUploadSection from './components/FileUpload/index';
import Auth from '../../services/auth.service';
import NotificationService from '@/services/notification.service';
import { setUserInfo } from '@/redux/reducer/authReducer';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Auth.getUserViaAccessToken()
      .then(response => {
        setLoading(false);
        if (response.status) {
          dispatch(setUserInfo(response.data));
        } else {
          // Notify the user that their access token is invalid and they need to log in
          NotificationService.error({
            message: 'Access Denied',
            addedText: <p>Your access token is invalid or has expired. Please log in again.</p>,
            position: 'top-center'
          });
  
          // Redirect the user to the login page
          // router.push('http://192.81.213.226:30/auth/login');
        }
      })
      .catch(err => {
        setLoading(false);
        NotificationService.error({
          message: 'Error!',
          addedText: <p>Something happened. Please try again.</p>,
          position: 'top-center'
        });
      });
  }, []);
  

  return (
    <div>
      <FileUploadSection />
    </div>
  );
};

export default index;
