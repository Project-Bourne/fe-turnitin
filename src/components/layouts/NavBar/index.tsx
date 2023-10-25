import Image from 'next/image';
import React from 'react'
import NavBarItem from './NavBarItem';
import { NavBarContents } from '@/utils/constants';
import { useRouter } from 'next/router';

function NavBar() {
    const router = useRouter();
  return (
    <div className='w-[15vw] md:w-[20vw] h-full border-3 border-r bg-white px-2 py-10 md:p-10 fixed z-[20]'>
        <div className='flex flex-row items-center mb-20'
        >
            <Image
                src={require("../../../../public/svg/logo.svg")}
                alt="SIRP Logo"
                width={50}
                height={50}
                className='md:mr-[20px] cursor-pointer'
                priority
                onClick={() => {
                    router.push("http://192.81.213.226:30");
                  }}
            />
            <h1 className='text-sirp-primary font-semibold text-[22px] hidden md:block'>Deep Soul</h1>
        </div>

        <div className='w-full mt-10'>
            {
                NavBarContents.map((item, index) => (
                    <NavBarItem item={item} index={index} key={index}/>
                ))   
            }
            
        </div>
    </div>
  )
}

export default NavBar;