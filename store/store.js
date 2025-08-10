import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import incomeReducer from "./incomeSlice";
import expenseReducer from "./expenseSlice";
import calculatorReducer from "./calculatorSlice";
import goalsReducer from "./goalsSlice";
import paymentsReducer from './paymentsSlice'

const rootReducer = combineReducers({
  income: incomeReducer,
  expense: expenseReducer,
  calculator: calculatorReducer,
  goals: goalsReducer,
  payments: paymentsReducer
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["income", "expense", "calculator", "goals", "payments"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
