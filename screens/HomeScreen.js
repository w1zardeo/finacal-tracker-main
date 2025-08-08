import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import DateNavigator from "../components/DateNavigator";
import Incomes from "../components/Incomes";
import IncomeChart from "../components/IcnomeChart";
import IncomeModal from "../components/IncomeModal";
import ExpenseModal from "../components/ExpenseModal";
import DonutChart from "../components/DonutChart";
import WhiteButton from "../components/WhiteButton";

export default function HomeScreen({ navigation, route }) {
  const date = "01.10.2024 - 31.10.2024";

  const [modalIncomeVisible, setModalIncomeVisible] = useState(false);
  const [modalExpenseVisible, setModalExpenseVisible] = useState(false);

  const [incomeData, setIncomeData] = useState([]);
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
        label: ukrLabels[key] || key,
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

  const handleAddExpense = (newExpense) => {
    setExpenseResults((prev) => {
      const updated = { ...(prev || {}) };
      updated[newExpense.category] =
        (updated[newExpense.category] || 0) + newExpense.amount;
      return updated;
    });
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
          buttonTitle="Внести нові дані"
          text={
            incomeData.length > 0
              ? ""
              : "Для того щоб тут були дані про ваші доходи, натисніть кнопку нижче, потім заповніть всі необхідні поля"
          }
        />

        {incomeData.length > 0 && (
          <WhiteButton
            title="Показати всі доходи"
            onPress={() => navigation.navigate("IncomeDetail", { incomeData })}
          />
        )}

        <IncomeModal
          visible={modalIncomeVisible}
          onClose={() => setModalIncomeVisible(false)}
          onSubmit={handleAddIncome}
        />

        {expenseResults && chartData.length > 0 && (
          <DonutChart data={chartData} />
        )}

        <View style={styles.spacer} />

        {expenseResults ? (
          <>
            <Incomes
              title=""
              data=""
              onPress={() => setModalExpenseVisible(true)}
              buttonTitle="Внести нові дані"
              text=""
            />
          </>
        ) : (
          <Incomes
            title="Витрати"
            data="Данних не виявлено!"
            onPress={() => setModalExpenseVisible(true)}
            buttonTitle="Внести нові дані"
            text="Для того щоб тут були дані про ваші витрати, натисніть кнопку нижче, потім заповніть всі необхідні поля"
          />
        )}

        {expenseResults && (
          <WhiteButton
            title="Показати всі витрати"
            onPress={() =>
              navigation.navigate("EpxenseDetail", { expenseResults })
            }
          />
        )}

        <ExpenseModal
          visible={modalExpenseVisible}
          onClose={() => setModalExpenseVisible(false)}
          onSubmit={handleAddExpense}
        />
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
    height: 10,
  },
  expenseTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 12,
  },
});
