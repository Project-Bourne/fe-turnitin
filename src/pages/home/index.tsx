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
        } 
      })
      .catch(err => {
        setLoading(false);
        NotificationService.error({
          message: 'Error!',
          addedText: <p>Access forbidden. Redirecting to login page.</p>,
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
