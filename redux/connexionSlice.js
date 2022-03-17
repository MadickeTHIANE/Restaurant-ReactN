import { createSlice } from "@reduxjs/toolkit";

export const connexionSlice = createSlice({
  name: "connexionData",
  initialState: {
    value: [],
  },
  reducers: {
    addData: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { addData } = connexionSlice.actions;
export default connexionSlice.reducer;
