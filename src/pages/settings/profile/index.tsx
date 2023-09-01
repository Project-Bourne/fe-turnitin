import SettingsLayout from '@/layout/SettingsLayout';
import React from 'react'
import { View1, View2 } from '../components';
import { SettingsData } from '@/utils/constants';




const ProfileSettings = () => {


  return (
    <SettingsLayout data={SettingsData}>

      {/* First View Component */}
      <View1/>

      {/* Second View Component */}
      <View2 />
    </SettingsLayout>
  )
}

export default ProfileSettings;