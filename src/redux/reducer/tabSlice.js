import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
  name: "Tab",
  initialState: 0,
  reducers: {
    setActiveTab: (state, action) => action.payload,
  },
});

export const { setActiveTab } = tabSlice.actions;

export default tabSlice.reducer;
