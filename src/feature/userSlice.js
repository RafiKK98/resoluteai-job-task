import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  img: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.img = action.payload.img;
    },

    logOut: (state) => {
      state.name = null;
      state.email = null;
      state.img = null;
    },
  },
});

export const { login, logOut } = userSlice.actions;

export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserPhoto = (state) => state.user.img;
export const selectUser = (state) => state.user;

export default userSlice.reducer;
