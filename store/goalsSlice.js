import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  goals: [], // масив цілей
  paymentsByGoal: {}, // об'єкт: { goalId: [payments] }
};

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    addGoal(state, action) {
      state.goals.push(action.payload);
    },
    editGoal(state, action) {
      const idx = state.goals.findIndex(g => g.id === action.payload.id);
      if (idx !== -1) state.goals[idx] = action.payload;
    },
    deleteGoal(state, action) {
      state.goals = state.goals.filter(g => g.id !== action.payload);
      delete state.paymentsByGoal[action.payload];
    },
    addPayment(state, action) {
      const { goalId, payment } = action.payload;
      if (!state.paymentsByGoal[goalId]) state.paymentsByGoal[goalId] = [];
      state.paymentsByGoal[goalId].push(payment);
    },
    editPayment(state, action) {
      const { goalId, payment } = action.payload;
      const payments = state.paymentsByGoal[goalId];
      if (payments) {
        const idx = payments.findIndex(p => p.id === payment.id);
        if (idx !== -1) payments[idx] = payment;
      }
    },
    deletePayment(state, action) {
      const { goalId, paymentId } = action.payload;
      if (state.paymentsByGoal[goalId]) {
        state.paymentsByGoal[goalId] = state.paymentsByGoal[goalId].filter(p => p.id !== paymentId);
      }
    },
  },
});

export const {
  addGoal,
  editGoal,
  deleteGoal,
  addPayment,
  editPayment,
  deletePayment,
} = goalsSlice.actions;

export default goalsSlice.reducer;
