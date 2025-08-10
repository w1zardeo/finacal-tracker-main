import { configureStore, combineReducers } from "@reduxjs/toolkit";
import incomeReducer from "./incomeSlice";
import expenseReducer from "./expenseSlice";

import AsyncStorage from "@react-native-async-storage/async-storage";
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

const rootReducer = combineReducers({
  income: incomeReducer,
  expense: expenseReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["income", "expense"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);