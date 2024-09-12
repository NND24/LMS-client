import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem("user");
const getUserFromLocalStorage = user ? JSON.parse(user) : null;

const initialState = {
  token: getUserFromLocalStorage?.accessToken || null,
  user: getUserFromLocalStorage?.user || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    setCredentials: (state, action: PayloadAction<{ user: any; accessToken: string }>) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    userLoggedOut: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { userRegistration, setCredentials, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
