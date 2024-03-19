import { createSlice } from "@reduxjs/toolkit";

const initialState = 'USD';
const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    updateCurrency: (state, action) => {
      return action.payload; // Update the string with payload
    },
  }
});

export const { updateCurrency } = currencySlice.actions;
export default currencySlice.reducer;