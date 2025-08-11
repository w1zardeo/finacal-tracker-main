import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux"
import { useRef } from "react";

import ExpenseInput from "../components/ExpenseInput";
import BlueButton from "../components/BlueButton";

import {
  setHousingData,
  setFoodData,
  setEntertainmentData,
  setHealthData,
  setTransportData,
  setFamilyData,
  setOtherData,
  setShowResult,
} from "../store/calculatorSlice";

function CalculatorScreen() {
  const dispatch = useDispatch();
  const scrollRef = useRef(null); 

  const {
    housingData,
    foodData,
    entertainmentData,
    healthData,
    transportData,
    familyData,
    otherData,
    showResult,
  } = useSelector((state) => state.calculator);

  // Хендлери оновлення для кожної категорії
  const handleChange = (setter, currentData) => (key, field, value) => {
    const updated = {
      ...currentData,
      [key]: {
        ...(currentData[key] || {}),
        [field]: value,
      },
    };
    dispatch(setter(updated));
  };

  const totalMonthly = [
    housingData,
    foodData,
    entertainmentData,
    healthData,
    transportData,
    familyData,
    otherData,
  ].reduce((acc, section) => {
    Object.values(section).forEach(({ value, frequency }) => {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        acc += frequency === "Щороку" ? num / 12 : num;
      }
    });
    return acc;
  }, 0);

  const handleCalculate = () => {
    dispatch(setShowResult(true));
    // ✅ Після оновлення стану — скролимо на верх
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={styles.screen}>
      <ScrollView ref={scrollRef} style={styles.container}>
        {showResult && (
          <View style={styles.resultContainer}>
            <View style={styles.resultRow}>
              <View>
                <Text style={styles.totalTitle}>Загалом</Text>
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.totalAmount}>
                  {totalMonthly.toLocaleString("uk-UA")}
                </Text>
              </View>
            </View>
            <BlueButton
              title="Розрахувати ще раз"
              onPress={() => dispatch(setShowResult(false))}
            />
          </View>
        )}

        <View style={styles.card}>
          <ExpenseInput
            title="Затишне житло"
            fields={["Облаштування житла", "Комунальні послуги"]}
            data={housingData}
            onChange={handleChange(setHousingData, housingData)}
            readOnly={showResult}
          />
        </View>

        <View style={styles.card}>
          <ExpenseInput
            title="Харчування / напої"
            fields={["Кафе / ресторани", "Продукти"]}
            data={foodData}
            onChange={handleChange(setFoodData, foodData)}
            readOnly={showResult}
          />
        </View>

        <View style={styles.card}>
          <ExpenseInput
            title="Розваги / відпочинок"
            fields={["Дозвілля", "Хоббі", "Поїздки по Україні", "Поїздки за кордон"]}
            data={entertainmentData}
            onChange={handleChange(setEntertainmentData, entertainmentData)}
            readOnly={showResult}
          />
        </View>

        <View style={styles.card}>
          <ExpenseInput
            title="Здоров'я / краса"
            fields={["Догляд за собою", "Одяг, взуття, аксесуари"]}
            data={healthData}
            onChange={handleChange(setHealthData, healthData)}
            readOnly={showResult}
          />
        </View>

        <View style={styles.card}>
          <ExpenseInput
            title="Транспорт, поїздки"
            fields={["Пересування", "Професійний розвиток"]}
            data={transportData}
            onChange={handleChange(setTransportData, transportData)}
            readOnly={showResult}
          />
        </View>

        <View style={styles.card}>
          <ExpenseInput
            title="Сім'я / подарунки"
            fields={["Підтримка сім'ї", "Домашні улюбленці", "Благодійність", "Одноразові покупки"]}
            data={familyData}
            onChange={handleChange(setFamilyData, familyData)}
            readOnly={showResult}
          />
        </View>

        <View style={styles.card}>
          <ExpenseInput
            title="Інше"
            fields={["Інші послуги", "Збереження"]}
            data={otherData}
            onChange={handleChange(setOtherData, otherData)}
            readOnly={showResult}
          />

          {!showResult && (
            <View style={styles.buttonContainer}>
              <BlueButton
                title="Розрахувати якість життя"
                onPress={handleCalculate} 
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#EFF9FC" },
  container: { padding: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 0,
  },
  buttonContainer: { marginTop: 16 },
  resultContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 0,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  totalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007AFF",
    textAlign: "right",
  },
});

export default CalculatorScreen;
