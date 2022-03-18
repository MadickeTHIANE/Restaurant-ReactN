import { configureStore } from "@reduxjs/toolkit";
import connexionReducer from "./connexionSlice";
import restaurantReducer from "./restaurantSlice";

export default configureStore({
  reducer: {
    connexionData: connexionReducer,
    restaurantID: restaurantReducer,
  },
});
