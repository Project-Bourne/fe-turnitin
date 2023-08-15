import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Skeleton from "react-loading-skeleton";
import Image from 'next/image';

const steps = [
  {
    date: "2023-08-10T10:30:00Z",
    userImage: "user1.jpg",
    participantsImages: ["participant1.jpg", "participant2.jpg", "participant3.jpg"],
    channel: ["Channel 1", "Channel 2"],
    name: "User 1",
    email: "user1@example.com",
  },
  {
    date: "2023-08-09T15:45:00Z",
    userImage: "user2.jpg",
    participantsImages: ["participant2.jpg", "participant3.jpg", "participant4.jpg"],
    channel: ["Channel 2", "Channel 3"],
    name: "User 2",
    email: "user2@example.com",
  },
  {
    date: "2023-08-08T08:15:00Z",
    userImage: "user3.jpg",
    participantsImages: ["participant1.jpg", "participant3.jpg", "participant5.jpg"],
    channel: ["Channel 1", "Channel 3"],
    name: "User 3",
    email: "user3@example.com",
  },
  {
    date: "2023-08-07T16:30:00Z",
    userImage: "user4.jpg",
    participantsImages: ["participant2.jpg", "participant4.jpg", "participant5.jpg"],
    channel: ["Channel 1", "Channel 2", "Channel 3"],
    name: "User 4",
    email: "user4@example.com",
  },
  {
    date: "2023-08-06T12:00:00Z",
    userImage: "user5.jpg",
    participantsImages: ["participant1.jpg", "participant3.jpg"],
    channel: ["Channel 2"],
    name: "User 5",
    email: "user5@example.com",
  },
];


export default function StepperMetaData() {
  // const [activeStep, setActiveStep] = React.useState(0);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Box className="w-full">
      <div>
        {steps.map((step, index) => (
          <Step key={step.date} className='border-0 mt-10'>
            <StepLabel>
              <span>
                {step.date}
              </span>

            </StepLabel>
            <StepContent>
              <div className='flex w-full'>
                <div className="mt-3  w-[30%]">
                  <div className="flex gap-3 items-center my-5 cursor-pointer">
                    {isLoading ? (
                      <Skeleton circle width={50} height={50} />
                    ) : (
                      <Image
                        src={require("../../../assets/icons/Avatarmeta.svg")}
                        alt="documents"
                        className="cursor-pointer"
                        width={50}
                      />
                    )}
                    <div>
                      <p className="font-bold">
                        {isLoading ? <Skeleton width={150} /> : step.name}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {isLoading ? <Skeleton width={150} /> : step.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-[30%] border-l-2 border-sirp-keynotebg pl-10">
                  <p className="text-gray-500">
                    {isLoading ? <Skeleton width={50} /> : "Channel"}
                  </p>
                  <div className="flex gap-3 items-center mt-3">
                    <div>
                      <ul className="flex flex-wrap gap-2">
                        {step.channel.map((source) => (
                          <div key={source}>
                            {isLoading ? (
                              <Skeleton width={70} />
                            ) : (
                              <li className="border p-2 rounded-[0.7rem] text-[0.7rem] bg-sirp-keynotebg">
                                {source}
                              </li>
                            )}
                          </div>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className=" w-[20%] border-l-2 border-sirp-keynotebg pl-10 flex items-center justify-end">
                  <p className="text-sirp-primary">
                    {isLoading ? <Skeleton width={50} /> : "View from this source"}
                  </p>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </div>
    </Box>
  );
}