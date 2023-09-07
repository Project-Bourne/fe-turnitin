import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import FactcheckService from '@/services/factcheck.service';
import FileUploadSection from './FileUploadSection';
import { setData, setFileName } from '@/redux/reducer/factcheckSlice';
import HomeContent from '../../[homecontent]';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

import LoadingModal from './LoadingModal';
import NotificationService from '@/services/notification.service';

const FileUpload = () => {
  const { data } = useSelector((state: any) => state.factcheck);

  const [formData, setFormData] = useState('');
  const [file, setFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const factcheckService = new FactcheckService();

  const handleSubmit = async e => {
    e.preventDefault();

    // dummy text but will come from the crawler
    const titleUrl =
      "anxiety as tribunal finally picks date to deliver judgement on obi, atiku's petitions against tinubu";
    const contentUrl =
      "the much-anticipated verdict of the presidential election petition court is expected to be delivered on wednesday, september 6officials of the court of appeal, who confirmed this to journalists, said proceedings will be open to live broadcast by interested television stationsthe lp and the pdp as well as their presidential candidates had petitioned the tribunal seeking to nullify the election of president bola tinubu as the winner of the 2023 electionpay attention: donate to legit charity on patreon. your support matters!fct, abuja - the petitions filed by atiku abubakar, the peoples democratic party (pdp)’s presidential candidate, and peter obi of the labour party (lp), against the electoral victory of president bola tinubu of the all progressives congress (apc) are nearing their conclusion.according to a communiqué, the presidential election petition court (pepc) sitting in abuja will deliver judgment on petitions challenging the election of tinubu on wednesday, september 6.read alsobreaking: pdp reacts as tribunal confirms date to deliver judgementthe presidential election tribunal will deliver its judgement on peter obi and atiku's petitions on wednesday in abuja. photo credits: asiwaju bola ahmed tinubu, mr. peter obi, atiku abubakarsource: facebookafrica independent television (ait) said it received the notice of the judgement which 'was communicated by the secretary of the pepc panel, josephine ekperobe' .pay attention: free webinar on media literacy aug 31, 12pm by legit.ng, leap africa, and ydos 2023 - register per the nation, a senior official of the court disclosed that the proceedings, planned to commence at 9 a.m., will be aired live on television.tinubu, the flagbearer of the apc, was declared the february 25, 2023, presidential poll winner with 8,794,726 votes.but dissatisfied with the result, atiku and obi approached the court to challenge the election outcome. legit.ng understands that by law, the tribunal has 180 days to determine the petitions and that expires on september 16, 2023.ohanaeze speaks on possible rerunin a piece of related news, legit.ng reported that the chidi ibeh-led faction of ohanaeze ndigbo said the north will likely work against tinubu if the tribunal orders a rerun.";
    // Validation: Check if formData is empty or has less than five characters
    if (formData.trim() === '' || formData.length < 5) {
      // Notify the user of the validation error, and don't proceed with the submission.
      NotificationService.error({
        message: 'Error!',
        addedText: (
          <p>
            Input must not be empty and should have at least five characters.
          </p>
        )
      });
      return;
    }

    try {
      setIsLoading(true);
      const dataObj = {
        url: formData,
        title: titleUrl,
        content: contentUrl
      };
      const response = await factcheckService.factcheckUrl(dataObj);
      if (response.status) {
        dispatch(setData(response.data));
        console.log(response.data);
        // router.push(`/home/${response.data.uuid}`);
      } else {
        NotificationService.error({
          message: 'Error!',
          addedText: <p>Something went wrong. Please try again.</p>
        });
        router.push(`/home`);
      }
    } catch (error) {
      // Handle the error appropriately
    } finally {
      setIsLoading(false);
      setFormData('');
    }
  };

  const handleDeleteFile = () => {
    setFile(null);
    setIsFileUploaded(false);
  };

  const handleFileUpload = async event => {
    event.preventDefault();
    dispatch(setFileName(event.target.files[0].name));
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setIsFileUploaded(true);
      const formData = new FormData();
      formData.append('files', selectedFile);

      try {
        const response = await fetch(
          'http://192.81.213.226:89/api/v1/uploads',
          {
            method: 'POST',
            body: formData
          }
        );

        if (response.status) {
          const responseData = await response.json();
          // Dispatch actions if needed
        } else {
          console.error('File upload failed.');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const closeModal = () => {
    setIsLoading(false);
  };

  return (
    <div className="m-5">
      {isFileUploaded ? (
        <FileUploadSection file={file} handleDeleteFile={handleDeleteFile} />
      ) : (
        <div>
          {formData?.length == 0 ? (
            <div className="flex items-center w-[100%] justify-end pr-[2rem] pb-[1rem]">
              <span className="text-grey-400 mr-2 text-sm text-sirp-primary">
                {file?.name}
              </span>
              <label
                htmlFor="file-input"
                className="px-4 py-1 rounded-lg"
                style={{
                  cursor: 'pointer',
                  color: '#4582C4',
                  backgroundColor: 'white',
                  border: '1px solid #4582C4'
                }}
              >
                <DriveFolderUploadIcon
                  style={{ color: '#4582C4', cursor: 'pointer' }}
                />
                Upload File
              </label>

              <input
                type="file"
                id="file-input"
                style={{ display: 'none' }}
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
              />
            </div>
          ) : (
            <div
              className="flex items-center w-[100%] justify-end pr-[2rem] pb-[1rem]"
              onClick={handleSubmit}
            >
              <label
                htmlFor="file-input"
                className="px-4 py-1 rounded-lg"
                style={{
                  cursor: 'pointer',
                  color: '#4582C4',
                  backgroundColor: 'white',
                  border: '1px solid #4582C4'
                }}
              >
                Run factcheck
              </label>
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex align-middle w-full border-2 rounded-full border-[#E5E7EB]-500 border-dotted"
          >
            <span className="flex align-middle justify-center mx-3">
              <Image
                src={require('../../../../../public/icons/link.svg')}
                alt="upload image"
                width={20}
                height={20}
                priority
              />
            </span>
            <input
              type="text"
              placeholder="Copy and paste Link here"
              className="w-[95%] h-[4rem] outline-none focus:ring-0"
              onChange={e => setFormData(e.target.value)}
              value={formData}
            />
            <span className="flex align-middle justify-center mx-3">
              <Image
                className="flex align-middle justify-center font-light text-[#A1ADB5] cursor-pointer"
                src={require('../../../../../public/icons/x.svg')}
                alt="upload image"
                width={20}
                height={20}
                onClick={() => setFormData('')}
              />
            </span>
          </form>
        </div>
      )}

      {data?.length == 0 ? (
        <main className="flex items-center justify-center flex-col gap-4 mt-[5rem]">
          <div className="flex items-center justify-centery w-[50%] font-bold flex-col p-3 rounded-[1rem] gap-3 text-xl ">
            <span>
              {' '}
              <Image
                src={require(`../../../../../public/icons/no_history.svg`)}
                alt="upload image"
                width={150}
                height={150}
                priority
              />
            </span>
            <h1 className="font-[700] text-2xl">No factcheck yet</h1>
            <span className="text-gray-400">
              Your recent factcheck will appear here
            </span>
          </div>
        </main>
      ) : (
        <div>
          <HomeContent />
        </div>
      )}
      {isLoading && <LoadingModal closeModal={closeModal} />}
    </div>
  );
};

export default FileUpload;
