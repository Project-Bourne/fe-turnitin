import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const factcheckSlice = createSlice({
  name: 'Factcheck',
  initialState: {
    fileName: '',
    history: [],
    bookMark: []
  

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

  }
});

export const {
  setFileName,
  setHistory,
  setBookMark
} = factcheckSlice.actions;

export default factcheckSlice.reducer;
