import { combineReducers } from "@reduxjs/toolkit";
import factcheckSlice from './factcheckSlice';
import tabReducer from './tabSlice';

const rootReducer = combineReducers({ 
    factcheck: factcheckSlice,
    activeTab: tabReducer,
});

export default rootReducer;