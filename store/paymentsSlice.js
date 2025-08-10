// store/paymentsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentsByGoal: {},
};

const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    setPaymentsForGoal(state, action) {
      const { goalId, payments } = action.payload;
      state.paymentsByGoal[goalId] = payments;
    },
    addPayment(state, action) {
      const { goalId, payment } = action.payload;
      if (!state.paymentsByGoal[goalId]) {
        state.paymentsByGoal[goalId] = [];
      }
      state.paymentsByGoal[goalId].push(payment);
    },
    editPayment(state, action) {
      const { goalId, payment } = action.payload;
      const payments = state.paymentsByGoal[goalId] || [];
      const index = payments.findIndex((p) => p.id === payment.id);
      if (index !== -1) {
        payments[index] = payment;
      }
    },
    deletePayment(state, action) {
      const { goalId, paymentId } = action.payload;
      const payments = state.paymentsByGoal[goalId] || [];
      state.paymentsByGoal[goalId] = payments.filter((p) => p.id !== paymentId);
    },
  },
});

export const {
  setPaymentsForGoal,
  addPayment,
  editPayment,
  deletePayment,
} = paymentsSlice.actions;

export default paymentsSlice.reducer;
