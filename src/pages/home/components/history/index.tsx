import React, { useEffect, useState } from "react";
import Content from "../Content";
import dummy from "../../../../utils/dummy.json";
import Image from "next/image";

function HomeHistory() {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    // Fetch the data from the dummy file each time the component mounts
    setHistoryData(dummy);
  }, []);

  const handleCheck = (id) => {
    // Update the historyData state based on the clicked item
    const updatedData = historyData.map((item) =>
      item.id === id ? { ...item, isMarked: !item.isMarked } : item,
    );
    setHistoryData(updatedData);
  };

  return (
    <div>
      {/* the history tab */}
      <div className="flex pl-[2.5rem] gap-2 border-b-2 border-sirp-primary w-[15rem] py-5">
        <Image
          src={require("../../../../assets/icons/Histroy.svg")}
          alt="documents"
          className="cursor-pointer"
          width={20}
        />
        <h1 className="text-sirp-primary text-xl">History</h1>
      </div>
      <hr />

      {/* the history page */}
      <Content data={historyData} onCheck={handleCheck} />
    </div>
  );
}

export default HomeHistory;
