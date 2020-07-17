import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { globalSummarySlice } from "./slices";

const rootReducer = combineReducers({
  globalSummary: globalSummarySlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
