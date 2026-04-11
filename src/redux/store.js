import { configureStore } from "@reduxjs/toolkit";
import requestMessageReducer from "./slices/requestMessageSlice";

const store = configureStore({
  reducer: {
    requestMessage: requestMessageReducer,
  },
});

export default store;
