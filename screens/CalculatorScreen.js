import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import ExpenseInput from "../components/ExpenseInput";
import BlueButton from "../components/BlueButton";
import WhiteButton from "../components/WhiteButton";

function CalculatorScreen({ navigation }) {
  const [housingData, setHousingData] = useState({});
  const [foodData, setFoodData] = useState({});
  const [entertainmentData, setEntertainmentData] = useState({});
  const [healthData, setHealthData] = useState({});
  const [transportData, setTransportData] = useState({});
  const [familyData, setFamilyData] = useState({});
  const [otherData, setOtherData] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleSectionChange = (sectionSetter) => (key, field, value) => {
    sectionSetter((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const totalBySection = (section) => {
    let total = 0;
    Object.values(section).forEach(({ value, frequency }) => {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        total += frequency === "Щороку" ? num / 12 : num;
      }
    });
    return Math.round(total);
  };

  const getExpenseResults = () => ({
    housing: totalBySection(housingData),
    food: totalBySection(foodData),
    entertainment: totalBySection(entertainmentData),
    health: totalBySection(healthData),
    transport: totalBySection(transportData),
    family: totalBySection(familyData),
    other: totalBySection(otherData),
  });

  const { totalMonthly } = (() => {
    let totalMonthly = 0;
    [
      housingData,
      foodData,
      entertainmentData,
      healthData,
      transportData,
      familyData,
      otherData,
    ].forEach((section) => {
      Object.values(section).forEach(({ value, frequency }) => {
        const num = parseFloat(value);
        if (!isNaN(num)) {
          totalMonthly += frequency === "Щороку" ? num / 12 : num;
        }
      });
    });

    return {
      totalMonthly: Math.round(totalMonthly),
    };
  })();

  const handleCalculate = () => {
    setShowResult(true);
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container}>
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
                title="Розразувати ще раз"
                onPress={() => setShowResult(false)}
              />
          </View>
        )}
        <View style={styles.card}>
          <ExpenseInput
            title="Затишне житло"
            fields={["Облаштування житла", "Комунальні послуги"]}
            data={housingData}
            onChange={handleSectionChange(setHousingData)}
            readOnly={showResult}
          />
        </View>
        <View style={styles.card}>
          <ExpenseInput
            title="Харчування / напої"
            fields={["Кафе / ресторани", "Продукти"]}
            data={foodData}
            onChange={handleSectionChange(setFoodData)}
            readOnly={showResult}
          />
        </View>
        <View style={styles.card}>
          <ExpenseInput
            title="Розваги / відпочинок"
            fields={[
              "Дозвілля",
              "Хоббі",
              "Поїздки по Україні",
              "Поїздки за кордон",
            ]}
            data={entertainmentData}
            onChange={handleSectionChange(setEntertainmentData)}
            readOnly={showResult}
          />
        </View>
        <View style={styles.card}>
          <ExpenseInput
            title="Здоров'я / краса"
            fields={["Догляд за собою", "Одяг, взуття, аксесуари"]}
            data={healthData}
            onChange={handleSectionChange(setHealthData)}
            readOnly={showResult}
          />
        </View>
        <View style={styles.card}>
          <ExpenseInput
            title="Транспорт, поїздки"
            fields={["Пересування", "Професійний розвиток"]}
            data={transportData}
            onChange={handleSectionChange(setTransportData)}
            readOnly={showResult}
          />
        </View>
        <View style={styles.card}>
          <ExpenseInput
            title="Сім'я / подарунки"
            fields={[
              "Підтримка сім'ї",
              "Домашні улюбленці",
              "Благодійність",
              "Одноразові покупки",
            ]}
            data={familyData}
            onChange={handleSectionChange(setFamilyData)}
            readOnly={showResult}
          />
        </View>
        <View style={styles.card}>
          <ExpenseInput
            title="Інше"
            fields={["Інші послуги", "Збереження"]}
            data={otherData}
            onChange={handleSectionChange(setOtherData)}
            readOnly={showResult}
            isLast={true}
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
  screen: {
    flex: 1,
    backgroundColor: "#EFF9FC",
  },
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 0,
  },
  buttonContainer: {
    marginTop: 16,
  },
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
totalAmountSub: {
  fontSize: 13,
  color: "#888",
  textAlign: "right",
},
totalSubtitle: {
  fontSize: 13,
  color: "#888",
},
});

export default CalculatorScreen;
