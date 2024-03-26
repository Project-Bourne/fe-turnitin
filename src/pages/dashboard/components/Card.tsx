import React from 'react';
import CustomCard from '@/components/ui/CustomCard';
// import {data} from './data';

export const data = [
  {
    id: 1,
    imgSrc: require('../../../../public/icons/frame_05.svg'),
    mainText: '4000',
    subText: 'Total Documents Crawled',
    url: 'http://192.81.213.226:30/dashboard',
    linkText: 'Open IRP'
  },
  {
    id: 2,
    imgSrc: require('../../../../public/icons/frame_08.svg'),
    mainText: '4000',
    subText: 'Total Documents Analyzed',
    url: 'http://192.81.213.226:31/home',
    linkText: 'Open Analyzer'
  },
  {
    id: 3,
    imgSrc: require('../../../../public/icons/frame_09.svg'),
    mainText: '4000',
    subText: 'Total Interrogator Documents',
    url: 'http://192.81.213.226:32/home',
    linkText: 'Open Interrogator'
  },
  {
    id: 4,
    imgSrc: require('../../../../public/icons/frame_0100.svg'),
    mainText: '4000',
    subText: 'Total Documents Translated',
    url: 'http://192.81.213.226:33/home',
    linkText: 'Open Translator'
  },
  {
    id: 5,
    imgSrc: require('../../../../public/icons/frame_012.svg'),
    mainText: '4000',
    subText: 'Total Documents Summarized',
    url: 'http://192.81.213.226:32/home',
    linkText: 'Open Summarizer'
  },
  {
    id: 6,
    imgSrc: require('../../../../public/icons/frame_07.svg'),
    mainText: '4000',
    subText: 'Total Exports to Collab',
    url: 'http://192.81.213.226:36/home',
    linkText: 'Open Collab Workspace'
  },
  {
    id: 7,
    imgSrc: require('../../../../public/icons/frame_013.svg'),
    mainText: '4000',
    subText: 'Total Documents',
    url: 'http://192.81.213.226:35/home',
    linkText: 'Open Deep Chat'
  }
];

// http://192.81.213.226:30/dashboard - IRP
// http://192.81.213.226:31/home - Analyzer
// http://192.81.213.226:32/home - Summarizer
// http://192.81.213.226:33/home - Transaltor
// http://192.81.213.226:34/home - fact check
// http://192.81.213.226:35/home - deep chat
// http://192.81.213.226:36/home - collab

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
