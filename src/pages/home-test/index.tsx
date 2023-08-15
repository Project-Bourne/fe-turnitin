// home page
import { useState } from 'react';
import HomeLayout from '@/layout/HomeLayout'
import { HomeSubData } from '@/utils/constants';
import HomeHistory from './components/history'
import TabLayout from '@/layout/TabLayout'
import { useRouter } from 'next/router';
import FileUpload from './components/FileUpload';


function Home() {
  const showTitle = false;
  const router = useRouter()
  console.log(router, 'i am router')
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className='m-10 py-5 rounded-[1rem] bg-[#F9F9F9]'>
      <HomeLayout>
        <FileUpload />
      </HomeLayout>

      <TabLayout showTitle={showTitle} data={HomeSubData}>
        <HomeHistory />
      </TabLayout>
    </div>

  )
}

export default Home;