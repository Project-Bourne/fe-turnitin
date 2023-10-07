import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const factcheckSlice = createSlice({
  name: 'Factcheck',
  initialState: {
    fileName: '',
    history: [],
    bookMark: [],
    data: [],
    uploadText: [],
    uploadUri: [],
    isUploadDisabled: true
  

  },
  reducers: {
   setFileName: (state, action) => {
      state.fileName = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
    setBookMark: state => {
      state.bookMark = state.history.filter(item => item.bookmark);
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setUploadText: (state, action) => {
      state.uploadText = action.payload;
    },
    setUploadUri: (state, action) => {
      state.uploadUri = action.payload;
    },
    setUploadDisabled: (state, action) => {
      state.isUploadDisabled = action.payload;
    }


  }
});

export const {
  setFileName,
  setHistory,
  setBookMark,
  setData,
  setUploadText,
  setUploadUri,
  setUploadDisabled
} = factcheckSlice.actions;

export default factcheckSlice.reducer;
