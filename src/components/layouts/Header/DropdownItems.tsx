import Link from 'next/link';
import { useSelector } from 'react-redux';
import interrogator from '../../../../public/icons/interrogator.svg';
import summarizer from '../../../../public/icons/summarizer.svg';
import irp from '../../../../public/icons/irp.svg';
import translator from '../../../../public/icons/translator.svg';
import collab from '../../../../public/icons/collab.svg';
import admin from '../../../../public/icons/admin.svg';
import analyzer from '../../../../public/icons/analyzer.svg';
import deep_chat from '../../../../public/icons/deep.svg';
import Image from 'next/image';

const BASE_URL = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}`;

const dropdownItems = [
  {
    name: 'Admin',
    // to: `${BASE_URL}:38/home`,
    to: `${BASE_URL}:${process.env.NEXT_PUBLIC_ADMIN_PORT}/home`,
    key: 'admin',
    icon: admin
  },
  {
    name: 'IRP',
    // to: `${BASE_URL}:30/home`,
    to: `${BASE_URL}:${process.env.NEXT_PUBLIC_IRP_PORT}/home`,
    key: 'irp',
    icon: irp
  },
  {
    name: 'Collab',
    // to: `${BASE_URL}:36/home`,
    to: `${BASE_URL}:${process.env.NEXT_PUBLIC_COLLAB_PORT}/chats`,
    key: 'collab',
    icon: collab
  },
  {
    name: 'Analyzer',
    // to: `${BASE_URL}:31/home`,
    to: `${BASE_URL}:${process.env.NEXT_PUBLIC_ANALYZER_PORT}/home`,
    key: 'analyser',
    icon: analyzer
  },
  {
    name: 'Summarizer',
    // to: `${BASE_URL}:32/home`,
    to: `${BASE_URL}:${process.env.NEXT_PUBLIC_SUMMARIZER_PORT}/home`,
    key: 'summarizer',
    icon: summarizer
  },
  {
    name: 'Translator',
    // to: `${BASE_URL}:33/home`,
    to: `${BASE_URL}:${process.env.NEXT_PUBLIC_TRANSLATOR_PORT}/home`,
    key: 'translator',
    icon: translator
  },
  {
    name: 'Deep Chat',
    // to: `${BASE_URL}:35/home`,
    to: `${BASE_URL}:${process.env.NEXT_PUBLIC_DEEP_CHAT_PORT}/home`,
    key: 'deep chat',
    icon: deep_chat
  },
  {
    name: 'Interrogator',
    // to: `${BASE_URL}:82/home`,
    to: `${BASE_URL}:${process.env.NEXT_PUBLIC_INTERROGATOR_PORT}/home`,
    key: 'interrogator',
    icon: interrogator
  }
];

function DashboardDropdown() {
  // Assuming permissions is an array of strings representing permissions
  const { permissions } = useSelector(
    (state: any) => state?.auth?.userInfo?.role
  );

  return (
    <ul className="bg-sirp-lightGrey shadow absolute top-[3rem] right-[1rem] pt-1 flex md:grid grid-cols-3 rounded z-30 w-[130px] md:w-[300px]">
      {dropdownItems.map((item, index) => {
        const shouldRender = item.key === 'irp' || permissions.includes(item.key);
        
        return (
          shouldRender && (
            <li
              key={index}
              className="py-1.5 px-2 min-h-[56px] text-black border-b-[1px] border-r-[1px] border-b-gray-200/[0.5] border-r-gray-200/[0.5] text-[12px] text-center"
            >
              <Link href={item.to} className="h-full rounded-lg grid gap-x-3 justify-center items-center hover:bg-white hover:cursor-pointer hover:text-sirp-primary">
                <Image
                  src={item.icon}
                  alt={item.key}
                  className={`${
                    item.key !== "deep chat"
                      ? "h-[10px] w-[10px] md:mx-auto"
                      : "h-[20px] w-[10px] md:mx-auto"
                  } `}
                />
                <span className="text-center">{item.name}</span>
              </Link>
            </li>
          )
        );
      })}
    </ul>
  );
}

export default DashboardDropdown;

