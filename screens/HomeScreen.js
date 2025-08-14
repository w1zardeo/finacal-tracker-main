// import React, { useState, useMemo } from "react";
// import { View, StyleSheet, ScrollView } from "react-native";
// import { useSelector, useDispatch } from "react-redux";
// import DateNavigator from "../components/DateNavigator";
// import Incomes from "../components/Incomes";
// import IncomeChart from "../components/IcnomeChart";
// import IncomeModal from "../components/IncomeModal";
// import ExpenseModal from "../components/ExpenseModal";
// import DonutChart from "../components/DonutChart";
// import WhiteButton from "../components/WhiteButton";
// import { addIncome } from "../store/incomeSlice";
// import { addExpense } from "../store/expenseSlice";
// import { setCurrentMonth } from "../store/monthSlice";

// export default function HomeScreen({ navigation }) {
//   const incomes = useSelector((state) => state.income?.incomes ?? []);
//   const expenses = useSelector((state) => state.expense?.expenses ?? []);
//   const savedMonth = useSelector((state) => state.month.currentMonth);
//   const dispatch = useDispatch();

//   const [modalIncomeVisible, setModalIncomeVisible] = useState(false);
//   const [modalExpenseVisible, setModalExpenseVisible] = useState(false);

//   const [currentMonth, setCurrentMonthState] = useState(new Date(savedMonth));

//    const handleChangeMonth = (newDate) => {
//     setCurrentMonthState(newDate);
//     dispatch(setCurrentMonth(newDate.toISOString()));
//   };

//   // Функції для зміни місяця
//    const handlePrevMonth = () => {
//     handleChangeMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
//   };

//   const handleNextMonth = () => {
//     handleChangeMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
//   };

//   // Діапазон дати для DateNavigator
//   const dateRange = useMemo(() => {
//     const start = new Date(
//       currentMonth.getFullYear(),
//       currentMonth.getMonth(),
//       1
//     );
//     const end = new Date(
//       currentMonth.getFullYear(),
//       currentMonth.getMonth() + 1,
//       0
//     );
//     return `${start.toLocaleDateString("uk-UA")} - ${end.toLocaleDateString(
//       "uk-UA"
//     )}`;
//   }, [currentMonth]);

//   // Фільтрація доходів і витрат за вибраний місяць
//   const filteredIncomes = incomes.filter((item) => {
//     const [day, month, year] = item.date.split(".").map(Number);
//     return (
//       year === currentMonth.getFullYear() &&
//       month === currentMonth.getMonth() + 1
//     );
//   });

//   const filteredExpenses = expenses.filter((item) => {
//     const [day, month, year] = item.date.split(".").map(Number);
//     return (
//       year === currentMonth.getFullYear() &&
//       month === currentMonth.getMonth() + 1
//     );
//   });

//   // Групування витрат по категоріях
//   const ukrLabels = {
//     housing: "Житло",
//     food: "Харчування",
//     entertainment: "Розваги",
//     health: "Здоров'я",
//     transport: "Транспорт",
//     family: "Сім'я",
//     other: "Інше",
//   };

//   const getColor = (index) => {
//     const colors = [
//       "#FF6384",
//       "#36A2EB",
//       "#FFCE56",
//       "#4BC0C0",
//       "#9966FF",
//       "#FF9F40",
//       "#66FF66",
//     ];
//     return colors[index % colors.length];
//   };

//   const expenseResults = filteredExpenses.reduce((acc, curr) => {
//     acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
//     return acc;
//   }, {});

//   const chartData = Object.entries(expenseResults).map(
//     ([key, value], index) => ({
//       label: ukrLabels[key] || key,
//       value,
//       color: getColor(index),
//     })
//   );

//   const handleAddIncome = (newEntry) => {
//     dispatch(addIncome({ ...newEntry, id: Date.now().toString() }));
//     // Перемикаємось на місяць, куди додали запис
//     const [day, month, year] = newEntry.date.split(".").map(Number);
//     setCurrentMonth(new Date(year, month - 1, 1));
//   };

//   const handleAddExpense = (newEntry) => {
//     dispatch(addExpense({ ...newEntry, id: Date.now().toString() }));
//     // Перемикаємось на місяць, куди додали запис
//     const [day, month, year] = newEntry.date.split(".").map(Number);
//     setCurrentMonth(new Date(year, month - 1, 1));
//   };

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         <DateNavigator
//           date={dateRange}
//           onLeftPress={handlePrevMonth}
//           onRightPress={handleNextMonth}
//         />

//         {filteredIncomes.length > 0 && <IncomeChart data={filteredIncomes} />}

//         <Incomes
//           title={filteredIncomes.length > 0 ? "" : "Доходи"}
//           data={filteredIncomes.length > 0 ? "" : "Данних не виявлено!"}
//           onPress={() => setModalIncomeVisible(true)}
//           buttonTitle="Внести нові дані"
//           text={
//             filteredIncomes.length > 0
//               ? ""
//               : "Для того щоб тут були дані про ваші доходи, натисніть кнопку нижче..."
//           }
//         />

//         {filteredIncomes.length > 0 && (
//           <WhiteButton
//             title="Показати всі доходи"
//             onPress={() => navigation.navigate("IncomeDetail")}
//           />
//         )}

//         <IncomeModal
//           visible={modalIncomeVisible}
//           onClose={() => setModalIncomeVisible(false)}
//           onSubmit={handleAddIncome}
//         />

//         {chartData.length > 0 && <DonutChart data={chartData} />}

//         <Incomes
//           title={chartData.length > 0 ? "" : "Витрати"}
//           data={chartData.length > 0 ? "" : "Данних не виявлено!"}
//           onPress={() => setModalExpenseVisible(true)}
//           buttonTitle="Внести нові дані"
//           text={
//             chartData.length > 0
//               ? ""
//               : "Для того щоб тут були дані про ваші витрати, натисніть кнопку нижче..."
//           }
//         />

//         {filteredExpenses.length > 0 && (
//           <WhiteButton
//             title="Показати всі витрати"
//             onPress={() => navigation.navigate("EpxenseDetail")}
//           />
//         )}

//         <ExpenseModal
//           visible={modalExpenseVisible}
//           onClose={() => setModalExpenseVisible(false)}
//           onSubmit={handleAddExpense}
//         />
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#EFF9FC",
//     paddingVertical: 16,
//   },
// });

import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import DateNavigator from "../components/DateNavigator";
import Incomes from "../components/Incomes";
import IncomeChart from "../components/IcnomeChart";
import IncomeModal from "../components/IncomeModal";
import ExpenseModal from "../components/ExpenseModal";
import DonutChart from "../components/DonutChart";
import WhiteButton from "../components/WhiteButton";

import { addIncome } from "../store/incomeSlice";
import { addExpense } from "../store/expenseSlice";
import { setCurrentMonth } from "../store/monthSlice";

export default function HomeScreen({ navigation }) {
  const incomes = useSelector((state) => state.income?.incomes || []);
  const expenses = useSelector((state) => state.expense?.expenses || []);
  const savedMonth = useSelector((state) => state.month.currentMonth);

  const dispatch = useDispatch();

  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [currentMonth, setCurrentMonthState] = useState(new Date(savedMonth));

  // зміна місяця
  const prevMonth = () => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    setCurrentMonthState(date);
    dispatch(setCurrentMonth(date.toISOString()));
  };

  const nextMonth = () => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    setCurrentMonthState(date);
    dispatch(setCurrentMonth(date.toISOString()));
  };

  // діапазон дат
  const start = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const end = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const dateRange = `${start.toLocaleDateString("uk-UA")} - ${end.toLocaleDateString("uk-UA")}`;

  // фільтр доходів та витрат
  const filteredIncomes = incomes.filter((item) => {
    const [day, month, year] = item.date.split(".").map(Number);
    return year === currentMonth.getFullYear() && month === currentMonth.getMonth() + 1;
  });

  const filteredExpenses = expenses.filter((item) => {
    const [day, month, year] = item.date.split(".").map(Number);
    return year === currentMonth.getFullYear() && month === currentMonth.getMonth() + 1;
  });

  // групування витрат
  const categoryNames = {
    housing: "Житло",
    food: "Харчування",
    entertainment: "Розваги",
    health: "Здоров'я",
    transport: "Транспорт",
    family: "Сім'я",
    other: "Інше",
  };

  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#66FF66"];

  const expensesByCategory = {};
  filteredExpenses.forEach((item) => {
    expensesByCategory[item.category] = (expensesByCategory[item.category] || 0) + Number(item.amount);
  });

  const chartData = Object.entries(expensesByCategory).map(([key, value], index) => ({
    label: categoryNames[key] || key,
    value,
    color: colors[index % colors.length],
  }));

  // додавання доходів
  const addNewIncome = (data) => {
    dispatch(addIncome({ ...data, id: Date.now().toString() }));
    const [day, month, year] = data.date.split(".").map(Number);
    setCurrentMonthState(new Date(year, month - 1, 1));
  };

  // додавання витрат
  const addNewExpense = (data) => {
    dispatch(addExpense({ ...data, id: Date.now().toString() }));
    const [day, month, year] = data.date.split(".").map(Number);
    setCurrentMonthState(new Date(year, month - 1, 1));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <DateNavigator date={dateRange} onLeftPress={prevMonth} onRightPress={nextMonth} />

        {filteredIncomes.length > 0 && <IncomeChart data={filteredIncomes} />}

        <Incomes
          title={filteredIncomes.length > 0 ? "" : "Доходи"}
          data={filteredIncomes.length > 0 ? "" : "Данних не виявлено!"}
          onPress={() => setShowIncomeModal(true)}
          buttonTitle="Внести нові дані"
          text={
            filteredIncomes.length > 0
              ? ""
              : "Для того щоб тут були дані про ваші доходи, натисніть кнопку нижче..."
          }
        />

        {filteredIncomes.length > 0 && (
          <WhiteButton title="Показати всі доходи" onPress={() => navigation.navigate("IncomeDetail")} />
        )}

        <IncomeModal visible={showIncomeModal} onClose={() => setShowIncomeModal(false)} onSubmit={addNewIncome} />

        {chartData.length > 0 && <DonutChart data={chartData} />}

        <Incomes
          title={chartData.length > 0 ? "" : "Витрати"}
          data={chartData.length > 0 ? "" : "Данних не виявлено!"}
          onPress={() => setShowExpenseModal(true)}
          buttonTitle="Внести нові дані"
          text={
            chartData.length > 0
              ? ""
              : "Для того щоб тут були дані про ваші витрати, натисніть кнопку нижче..."
          }
        />

        {filteredExpenses.length > 0 && (
          <WhiteButton title="Показати всі витрати" onPress={() => navigation.navigate("EpxenseDetail")} />
        )}

        <ExpenseModal visible={showExpenseModal} onClose={() => setShowExpenseModal(false)} onSubmit={addNewExpense} />
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
});
