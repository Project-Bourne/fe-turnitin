import React, { useState } from "react";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const ActionIcons = ({ docId }) => {
  const router = useRouter();
  const { userInfo } = useSelector((state: any) => state?.auth);

  const permissions = userInfo?.role?.permissions;

  const handleExport = (id: string, to: string) => {
    if (to === "collab") {
      // router?.push(`http://192.81.213.226:36/document/${id}&factcheck`);
      router?.push(`http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_COLLAB_PORT}/document/${id}&factcheck`);
    }
    if (to === "analyser") {
      // router?.push(`http://192.81.213.226:31/home/${id}&factcheck`);
      router?.push(`http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_ANALYZER_PORT}/home/${id}&factcheck`);
    }
    if (to === "summarizer") {
      // router?.push(`http://192.81.213.226:32/home/${id}&factcheck`);
      router?.push(`http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_SUMMARIZER_PORT}/home/${id}&factcheck`);
    }
    if (to === "deepchat") {
      // router?.push(`http://192.81.213.226:35/home/${id}&factcheck`);
      router?.push(`http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_DEEP_CHAT_PORT}/home/${id}&factcheck`);
    }
    if (to === "interrogator") {
      // router?.push(`http://192.81.213.226:82/home/query/${id}&factcheck`);
      router?.push(`http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_INTERROGATOR_PORT}/home/query/${id}&factcheck`);
    }
    if (to === "translator") {
      // router?.push(`http://192.81.213.226:33/home/${id}&factcheck`);
      router?.push(`http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_TRANSLATOR_PORT}/home/${id}&factcheck`);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-end gap-[0.5rem] mr-5">
        {/* collab */}
        {permissions?.includes("collab") && (
          <Tooltip title="Export to Collab">
            <Image
              src={require("../../../../../public/icons/action_collab.svg")}
              alt="documents"
              className=" cursor-pointer"
              width={80}
              onClick={() => handleExport(docId, "collab")}
            />
          </Tooltip>
        )}
        {/* factcheck */}
        {permissions?.includes("summarizer") && (
          <Tooltip title="Export to Summarizer">
            <Image
              src={require("../../../../../public/icons/action_summarizer.svg")}
              alt="documents"
              className="cursor-pointer"
              onClick={() => handleExport(docId, "summarizer")}
              width={80}
            />
          </Tooltip>
        )}

        {/* analyzer */}
        {permissions?.includes("analyser") && (
          <Tooltip title="Export to Analyser">
            <Image
              src={require("../../../../../public/icons/action_analyzer.svg")}
              alt="documents"
              className=" cursor-pointer"
              onClick={() => handleExport(docId, "analyser")}
              width={80}
            />
          </Tooltip>
        )}

        {/* translator */}
        {permissions?.includes("translator") && (
          <Tooltip title="Export to Translator">
            <Image
              src={require("../../../../../public/icons/action_translator.svg")}
              alt="documents"
              className="cursor-pointer"
              onClick={() => handleExport(docId, "translator")}
              width={80}
            />
          </Tooltip>
        )}

        {/* deepchat */}
        {permissions?.includes("deep chat") && (
          <Tooltip title="Export to Deep Chat">
            <Image
              src={require("../../../../../public/icons/action_deepchat.svg")}
              alt="documents"
              className="cursor-pointer"
              onClick={() => handleExport(docId, "deepchat")}
              width={80}
            />
          </Tooltip>
        )}

        {/* interrogator */}
        {permissions?.includes("interrogator") && (
          <Tooltip title="Export to Interrogator">
            <Image
              src={require("../../../../../public/icons/action_interrogator.svg")}
              alt="documents"
              className="cursor-pointer"
              onClick={() => handleExport(docId, "interrogator")}
              width={80}
            />
          </Tooltip>
        )}
      </div>
    </>
  );
};

export default ActionIcons;
