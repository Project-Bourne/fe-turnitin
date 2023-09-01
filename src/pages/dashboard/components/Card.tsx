import React from 'react';
import CustomCard from '@/components/ui/CustomCard';
// import {data} from './data';

export const data = [
  {
    id: 1,
    imgSrc: require('../../../assets/icons/frame_05.svg'),
    mainText: '4000',
    subText: 'Total Documents Crawled',
    url: '/dashboard',
    linkText: 'Open IRP'
  },
  {
    id: 2,
    imgSrc: require('../../../assets/icons/frame_08.svg'),
    mainText: '4000',
    subText: 'Total Documents Analyzed',
    url: '/dashboard',
    linkText: 'Open Analyzer'
  },
  {
    id: 3,
    imgSrc: require('../../../assets/icons/frame_09.svg'),
    mainText: '4000',
    subText: 'Total Documents Summarized',
    url: '/dashboard',
    linkText: 'Open Interrogator'
  },
  {
    id: 4,
    imgSrc: require('../../../assets/icons/frame_0100.svg'),
    mainText: '4000',
    subText: 'Total Documents',
    url: '/dashboard',
    linkText: 'Open Translator'
  },
  {
    id: 5,
    imgSrc: require('../../../assets/icons/frame_011.svg'),
    mainText: '4000',
    subText: 'Total Documents Fact-Checked',
    url: '/dashboard',
    linkText: 'Open Fact Checker'
  },
  {
    id: 6,
    imgSrc: require('../../../assets/icons/frame_07.svg'),
    mainText: '4000',
    subText: 'Total Exports to Collab',
    url: '/dashboard',
    linkText: 'Open Collab Workspace'
  },
  {
    id: 7,
    imgSrc: require('../../../assets/icons/frame_013.svg'),
    mainText: '4000',
    subText: 'Total Documents',
    url: '/dashboard',
    linkText: 'Open Oracle'
  }
];

function Card() {
  return data.map((item, index) => (
    <div key={index}>
        <CustomCard
          imgSrc={item.imgSrc}
          mainText={item.mainText}
          subText={item.subText}
          url={item.url}
          linkText={item.linkText}
        />
    </div>
  ));
}

export default Card;
