// store/uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentMonth: new Date().toISOString(), // за замовчуванням сьогодні
};

const monthSlice = createSlice({
  name: "month",
  initialState,
  reducers: {
    setCurrentMonth(state, action) {
      state.currentMonth = action.payload; // очікуємо ISO-рядок
    },
  },
});

export const { setCurrentMonth } = monthSlice.actions;
export default monthSlice.reducer;
