import { createSlice } from "@reduxjs/toolkit";
// import { dispatch } from "./strore";
import { users } from "../utils/datas";

const storedUser = window?.localStorage.getItem("userInfo");
const initialState = {
  user: storedUser ? JSON.parse(storedUser) : users[1],
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
    },
    logout(state) {
      state.user = null;
      localStorage?.removeItem("userInfo");
    },
  },
});

export default userSlice.reducer;

export function Login(user:any) {
  return (dispatch:any, getState:any) => {
    dispatch(userSlice.actions.login(user));
  };
}

export function Logout() {
  return (dispatch:any, getState:any) => {
    dispatch(userSlice.actions.logout());
  };
}