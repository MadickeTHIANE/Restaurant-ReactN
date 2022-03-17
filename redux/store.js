import { configureStore } from "@reduxjs/toolkit";
import connexionReducer from "./connexionSlice";

export default configureStore({
  reducer: {
    connexionData: connexionReducer,
  },
});
