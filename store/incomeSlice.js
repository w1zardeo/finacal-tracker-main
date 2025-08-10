import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  incomes: [],
};

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
     addIncome(state, action) {
      if (!state.incomes) state.incomes = [];
      state.incomes.push(action.payload);
    },
    editIncome(state, action) {
      const idx = state.incomes.findIndex((i) => i.id === action.payload.id);
      if (idx !== -1) state.incomes[idx] = action.payload;
    },
    deleteIncome(state, action) {
      state.incomes = state.incomes.filter((i) => i.id !== action.payload);
    },
  },
});

export const { addIncome, editIncome, deleteIncome } = incomeSlice.actions;
export default incomeSlice.reducer;
