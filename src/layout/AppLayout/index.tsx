import React from 'react'
import { Header, NavBar } from '@/components/layouts';

function AppLayout({ children }) {

    return (
        <div className="bg-white w-[100vw] h-[100vh] z-30 relative flex flex-row overflow-y-scroll">
        {/* Nav Bar Component */}
        <NavBar />
  
        <div className="bg-white w-full md:w-[80vw] ml-[15vw] md:ml-[20vw] h-full">
          {/* Layout header */}
          <Header />
  
          {/* wrapper childer */}
          <div className="mt-[100px]">{children}</div>
        </div>
      </div>
    )
}

export default AppLayout; 