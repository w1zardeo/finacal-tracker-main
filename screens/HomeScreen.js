// import { View, StyleSheet } from "react-native";
// import DateNavigator from "../components/DateNavigator";
// import Incomes from "../components/Incomes";

// export default function HomeScreen({ navigation }) {
//   const date = "01.10.2024-31.10.2024";

//   const handleLeftPress = () => {
//     // логіка назад
//   };

//   const handleRightPress = () => {
//     // логіка вперед
//   };

//   return (
//     <View style={styles.container}>
//       <DateNavigator date={date} onLeftPress={handleLeftPress} onRightPress={handleRightPress} />
//       <Incomes title="Доходи" data="Данних не виявлено!" text="Для того щоб тут були дані про ваш дохід, натисніть
//           кнопку нижче, потім заповніть всі необхідні поля" buttonTitle="Внести нові дані"/>
//       <View style={styles.spacer} />
//       <Incomes title="Витрати" data="Данних не виявлено!" text="Для того щоб тут були дані про ваші витрати, натисніть
//           кнопку нижче, потім заповніть всі необхідні поля" buttonTitle="Внести нові дані" onPress={() => navigation.navigate('Калькулятор')}/>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#EFF9FC',
//     paddingVertical: 16,
//   },
//   spacer: {
//     height: 20,
//   },
// });

import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import DateNavigator from "../components/DateNavigator";
import Incomes from "../components/Incomes";
import IncomeChart from "../components/IcnomeChart";
import IncomeModal from "../components/IncomeModal";
import DonutChart from "../components/DonutChart"; // компонент для кругової діаграми

export default function HomeScreen({ navigation, route }) {
  const date = "01.10.2024 - 31.10.2024";

  const [modalIncomeVisible, setModalIncomeVisible] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [expenseResults, setExpenseResults] = useState(null);

  useEffect(() => {
    if (route.params?.expenseResults) {
      setExpenseResults(route.params.expenseResults);
    }
  }, [route.params?.expenseResults]);

 const ukrLabels = {
  housing: "Житло",
  food: "Харчування",
  entertainment: "Розваги",
  health: "Здоров'я",
  transport: "Транспорт",
  family: "Сім'я",
  other: "Інше",
};

const chartData = expenseResults
  ? Object.entries(expenseResults).map(([key, value], index) => ({
      label: ukrLabels[key] || key, // якщо немає перекладу, залишаємо як є
      value,
      color: getColor(index),
    }))
  : [];


  function getColor(index) {
    const colors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
      "#66FF66",
    ];
    return colors[index % colors.length];
  }

  const handleLeftPress = () => {};
  const handleRightPress = () => {};

  const handleAddIncome = (newEntry) => {
    setIncomeData([...incomeData, newEntry]);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <DateNavigator
          date={date}
          onLeftPress={handleLeftPress}
          onRightPress={handleRightPress}
        />

        {incomeData.length > 0 && <IncomeChart data={incomeData} />}

        <View style={styles.spacer} />

        <Incomes
          title={incomeData.length > 0 ? "" : "Доходи"}
          data={incomeData.length > 0 ? "" : "Данних не виявлено!"}
          onPress={() => setModalIncomeVisible(true)}
          buttonTitle={incomeData.length > 0 ? "Внести ще" : "Внести нові дані"}
          text={
            incomeData.length > 0
              ? ""
              : "Для того щоб тут були дані про ваші доходи, натисніть кнопку нижче, потім заповніть всі необхідні поля"
          }
        />

        <IncomeModal
        visible={modalIncomeVisible}
        onClose={() => setModalIncomeVisible(false)}
        onSubmit={handleAddIncome}
      />

        {/* Відображення діаграми витрат, якщо є дані */}
        {expenseResults && chartData.length > 0 && (
          <>
            <DonutChart data={chartData} />
          </>
        )}

        <View style={styles.spacer} />

       {expenseResults ? (
  // Є дані з CalculatorScreen — показуємо лише кнопку для внесення нових даних
  <Incomes
    title=""
    data=""
    onPress={() => navigation.navigate("Калькулятор")}
    buttonTitle="Внести нові дані"
    text=""
  />
) : (
  // Даних немає — показуємо інформативний блок
  <Incomes
    title="Витрати"
    data="Данних не виявлено!"
    onPress={() => navigation.navigate("Калькулятор")}
    buttonTitle="Внести нові дані"
    text="Для того щоб тут були дані про ваші витрати, натисніть кнопку нижче, потім заповніть всі необхідні поля"
  />
)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF9FC",
    paddingVertical: 16,
  },
  spacer: {
    height: 20,
  },
  expenseTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 12,
  },
});
