import { createSlice } from "@reduxjs/toolkit";

/*
state:
  items: list of expense entries { category, amount, comment, date }
  totals: aggregated by category { transport: 120 }
*/

const initialState = {
  items: [],
  totals: {},
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpense(state, action) {
      const expense = action.payload; // { category, amount, comment, date }
      state.items.push(expense);
      const cat = expense.category;
      state.totals[cat] = (state.totals[cat] || 0) + Number(expense.amount);
    },
    removeExpense(state, action) {
      const idx = action.payload;
      const exp = state.items[idx];
      if (exp) {
        state.items.splice(idx, 1);
        state.totals[exp.category] = Math.max(
          0,
          (state.totals[exp.category] || 0) - Number(exp.amount)
        );
        if (state.totals[exp.category] === 0) delete state.totals[exp.category];
      }
    },
    setExpenses(state, action) {
      state.items = action.payload || [];
      state.totals = {};
      state.items.forEach((e) => {
        state.totals[e.category] = (state.totals[e.category] || 0) + Number(e.amount);
      });
    },
    clearExpenses(state) {
      state.items = [];
      state.totals = {};
    },
    setCategoryTotal(state, action) {
      const { category, value } = action.payload;
      state.totals[category] = Number(value);
    },
  },
});

export const {
  addExpense,
  removeExpense,
  setExpenses,
  clearExpenses,
  setCategoryTotal,
} = expenseSlice.actions;
export default expenseSlice.reducer;