import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const factcheckSlice = createSlice({
  name: 'Factcheck',
  initialState: {
    fileName: '',
    history: null,
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
      state.bookMark = state?.history?.facts?.filter(item => item.bookmark);
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
    },
    updatePagination: (state, action) => {
      state.history = {
        ...state.history,
        ...action.payload,
      };
    },
  }
});

export const {
  setFileName,
  setHistory,
  setBookMark,
  setData,
  setUploadText,
  setUploadUri,
  setUploadDisabled,
  updatePagination
} = factcheckSlice.actions;

export default factcheckSlice.reducer;
