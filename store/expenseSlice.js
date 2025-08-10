import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpense(state, action) {
      state.expenses.push(action.payload);
    },
    editExpense(state, action) {
      const idx = state.expenses.findIndex((i) => i.id === action.payload.id);
      if (idx !== -1) state.expenses[idx] = action.payload;
    },
    deleteExpense(state, action) {
      state.expenses = state.expenses.filter((i) => i.id !== action.payload);
    },
  },
});

export const { addExpense, editExpense, deleteExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
