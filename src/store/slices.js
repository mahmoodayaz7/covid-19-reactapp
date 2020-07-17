import { createSlice } from "@reduxjs/toolkit";
import { fetchGlobalSummaryData } from "./../../src/api";

//Provinces-Summary
export const globalSummarySlice = createSlice({
  name: "global-summary",
  initialState: {
    loading: false,
    data: {},
    error: {},
  },
  reducers: {},
  extraReducers: {
    [fetchGlobalSummaryData.fulfilled]: (state, action) => {
      state["data"] = action.payload;
      state.loading = false;
    },
    [fetchGlobalSummaryData.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchGlobalSummaryData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
