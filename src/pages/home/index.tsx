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
    try {
      Auth.getUserViaAccessToken()
        .then(response => {
          setLoading(false);
          if (response?.status) {
            console.log('user data via login', response);
            dispatch(setUserInfo(response?.data));
          } else {
            router.push('http://192.81.213.226:30/auth/login');
          }
        })
        .catch(err => {
          NotificationService.error({
            message: 'Error!',
            addedText: <p>something happened. please try again</p>,
            position: 'top-center'
          });
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <FileUploadSection />
    </div>
  );
};

export default index;
