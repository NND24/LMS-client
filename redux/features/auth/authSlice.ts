import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const getUserFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

const initialState = {
  token: getUserFromLocalStorage()?.accessToken || null,
  user: getUserFromLocalStorage()?.user || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    setCredentials: (state, action: PayloadAction<{ accessToken: string; user: string }>) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { userRegistration, setCredentials, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
