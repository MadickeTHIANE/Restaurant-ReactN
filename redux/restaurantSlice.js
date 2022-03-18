import { createSlice } from "@reduxjs/toolkit";

export const restaurantSlice = createSlice({
  name: "restaurantOrder",
  initialState: {
    value: [],
  },
  reducers: {
    addRestaurant: (state, action) => {
      state.value.push(action.payload);
    },
    chosenRestaurant: (state, action) => {
      state.value.filter((restaurantId) => restaurantId == action.payload);
    },
  },
});

export const { addRestaurant, chosenRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;
