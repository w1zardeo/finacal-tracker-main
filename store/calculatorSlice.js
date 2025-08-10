import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  housingData: {},
  foodData: {},
  entertainmentData: {},
  healthData: {},
  transportData: {},
  familyData: {},
  otherData: {},
  showResult: false,
};

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    setHousingData(state, action) {
      state.housingData = action.payload;
    },
    setFoodData(state, action) {
      state.foodData = action.payload;
    },
    setEntertainmentData(state, action) {
      state.entertainmentData = action.payload;
    },
    setHealthData(state, action) {
      state.healthData = action.payload;
    },
    setTransportData(state, action) {
      state.transportData = action.payload;
    },
    setFamilyData(state, action) {
      state.familyData = action.payload;
    },
    setOtherData(state, action) {
      state.otherData = action.payload;
    },
    setShowResult(state, action) {
      state.showResult = action.payload;
    },
  },
});

export const {
  setHousingData,
  setFoodData,
  setEntertainmentData,
  setHealthData,
  setTransportData,
  setFamilyData,
  setOtherData,
  setShowResult,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
