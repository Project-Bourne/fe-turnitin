import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  isLoggedIn: false,
  userAccessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action?.payload;
      state.isLoggedIn = true;
    },
    setAccessToken: (state, action) => {
      const { accessToken, refreshToken } = action?.payload;
      state.userAccessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isLoggedIn = true;
    },
    setUpdatedData: (state, action) => {
      const { firstName, lastName, image } = action?.payload;
      if (firstName !== "" && firstName !== undefined) {
        state.userInfo.firstName = firstName;
      }
      if (lastName !== "" && lastName !== undefined) {
        state.userInfo.lastName = lastName;
      }
      if (image !== "" && image !== undefined) {
        state.userInfo.image = image;
      }
    },
    logout: (state) => {
      (state.userAcccessToken = null), (state.isLoggedIn = false);
    },
  },
});

export const { setUserInfo, setAccessToken, setUpdatedData, logout } =
  authSlice.actions;
export default authSlice.reducer;
