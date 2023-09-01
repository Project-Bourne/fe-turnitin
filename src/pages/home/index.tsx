import React from 'react'
import FileUploadSection from './components/FileUpload/index'
import TabLayout from './components/history/TabLayout'
import BasicTabs from './components/history/tab'

const index = () => {
  return (
    <div>
      <FileUploadSection />
      {/* <TabLayout /> */}
      <BasicTabs/>
    </div>
  )
}

export default index