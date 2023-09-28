import React, { useState } from "react";
import Image from "next/image";
import { Tooltip } from "@mui/material";

const ActionIcons = () => {
  const handleCollab = () => {
    console.log("collabe");
  };

  return (
    <>
      <div className="flex flex-row justify-end gap-[0.5rem] mr-5">
        <Tooltip title="Export to Collab">
          <Image
            src={require("../../../../../public/icons/action_collab.svg")}
            alt="documents"
            className=" cursor-pointer"
            width={60}
            onClick={handleCollab}
          />
        </Tooltip>

        <Tooltip title="Export to Summarizer">
          <Image
            src={require("../../../../../public/icons/action_summarizer.svg")}
            alt="documents"
            className="cursor-pointer"
            width={60}
          />
        </Tooltip>

        <Tooltip title="Export to Analyzer">
          <Image
            src={require("../../../../../public/icons/action_analyzer.svg")}
            alt="documents"
            className=" cursor-pointer"
            width={60}
          />
        </Tooltip>

        <Tooltip title="Export to translator">
          <Image
            src={require("../../../../../public/icons/action_translator.svg")}
            alt="documents"
            className="cursor-pointer"
            width={60}
          />
        </Tooltip>

        <Tooltip title="Export to Deep chat">
          <Image
            src={require("../../../../../public/icons/action_deepchat.svg")}
            alt="documents"
            className="cursor-pointer"
            width={60}
          />
        </Tooltip>

        <Tooltip title="Export to Interrogator">
          <Image
            src={require("../../../../../public/icons/action_interrogator.svg")}
            alt="documents"
            className="cursor-pointer"
            width={60}
          />
        </Tooltip>
      </div>
    </>
  );
};

export default ActionIcons;