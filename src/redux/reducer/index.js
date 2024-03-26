import { combineReducers } from "@reduxjs/toolkit";
import factcheckSlice from './factcheckSlice';
import tabReducer from './tabSlice';
import authReducer from './authReducer';

const rootReducer = combineReducers({ 
    factcheck: factcheckSlice,
    auth: authReducer,
    activeTab: tabReducer,

});

export default rootReducer;