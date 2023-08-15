import React, { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import data from "./data";
import TitleSection from "./section_skeleton/TitleSection";
import AuthorSection from "./section_skeleton/AuthorSection";
import ConfidenceSection from "./section_skeleton/ConfidenceSection";
import LocationSection from "./section_skeleton/LocationSection";
import DateSection from "./section_skeleton/DateSection";
import TagsKeywordsSection from "./section_skeleton/TagsKeywordsSection";
import SourceSection from "./section_skeleton/SourceSection";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function MetaData() {
  const { title, author, confidence, location, date, tags, sources } = data;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="bg-white mt-10 mx-5 mb-5">
      <TitleSection isLoading={isLoading} title={title} />
      {/* {!isLoading ?
        <Accordion className="bg-gray-100 m-5">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Assessment</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="my-2">ECOWAS</Typography>
            <Typography>
              Redesigned Naira: CBN launches Cash Swap Programme for rural Development This website is operated by Web3D Media Incorporated, a Delaware-based corporation with a registered address at 651 N Broad St, New Castle, Delaware United States. (“Company”).
            </Typography>
          </AccordionDetails>
        </Accordion> : null} */}
      <div className="mx-5 flex flex-wrap gap-10">
        <AuthorSection isLoading={isLoading} author={author} />
        <ConfidenceSection isLoading={isLoading} confidence={confidence} />
        <LocationSection isLoading={isLoading} location={location} />
        <DateSection isLoading={isLoading} date={date} />
        <TagsKeywordsSection isLoading={isLoading} tags={tags} />
        <SourceSection isLoading={isLoading} sources={sources} />
      </div>
    </div>
  );
}
export default MetaData;
