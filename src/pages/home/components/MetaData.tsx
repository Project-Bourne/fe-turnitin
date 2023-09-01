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
