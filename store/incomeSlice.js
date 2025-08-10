import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // { name, date, time, amount, day }
};

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    addIncome(state, action) {
      state.items.push(action.payload);
    },
    removeIncome(state, action) {
      const idx = action.payload;
      state.items = state.items.filter((_, i) => i !== idx);
    },
    setIncomes(state, action) {
      state.items = action.payload;
    },
    clearIncomes(state) {
      state.items = [];
    },
  },
});

export const { addIncome, removeIncome, setIncomes, clearIncomes } =
  incomeSlice.actions;
export default incomeSlice.reducer;