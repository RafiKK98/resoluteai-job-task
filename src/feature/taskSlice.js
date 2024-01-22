import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskName: "",
  description: "",
  date: "",
  id: "",
  status: false,
};

const userSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    updateTask: (state, action) => {
      state.taskName = action.payload.taskName;
      state.description = action.payload.description;
      state.date = action.payload.date;
      state.id = action.payload.id;
      state.status = action.payload.status;
    },
  },
});

export const { updateTask } = userSlice.actions;

export const selectTask = (state) => state.task;

export default userSlice.reducer;
