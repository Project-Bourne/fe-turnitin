import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HistoryIcon from "@mui/icons-material/History";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import History from "./Histroy";
import BookMark from "../bookMark/BookMark";
import { setActiveTab } from '@/redux/reducer/tabSlice';


function BasicTabs() {
  const activeTab = useSelector((store:any) => store.activeTab); // Get activeTab from Redux store
  const dispatch = useDispatch();

  const handleChange = (_, newValue) => {
    dispatch(setActiveTab(newValue)); // Dispatch setActiveTab action
  };

  return (
    <div>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        aria-label="tab"
      >
        <Tab
          label={
            <div style={{ display: "flex", alignItems: "center" }}>
              <HistoryIcon style={{ marginRight: "8px" }} />
              History
            </div>
          }
        />
        <Tab
          label={
            <div style={{ display: "flex", alignItems: "center" }}>
              <BookmarkBorderIcon style={{ marginRight: "8px" }} />
              Bookmark
            </div>
          }
        />
      </Tabs>
      <div role="tabpanel" hidden={activeTab !== 0} className="py-2">
        <History />
      </div>
      <div role="tabpanel" hidden={activeTab !== 1} className="py-2">
        <BookMark />
      </div>
    </div>
  );
}

export default BasicTabs;
