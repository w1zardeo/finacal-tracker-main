// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import DonutChart from "../components/DonutChart";
// import BlueButton from "../components/BlueButton";
// import ExpenseModal from "../components/ExpenseModal";
// import { SwipeListView } from "react-native-swipe-list-view";

// import { useSelector, useDispatch } from "react-redux";
// import { addExpense, editExpense, deleteExpense } from "../store/expenseSlice";

// export default function ExpenseDetailScreen() {
//   const expenses = useSelector((state) => state.expense.expenses);
//   const dispatch = useDispatch();

//   const ukrLabels = {
//     housing: "Житло",
//     food: "Харчування",
//     entertainment: "Розваги",
//     health: "Здоров'я",
//     transport: "Транспорт",
//     family: "Сім'я",
//     other: "Інше",
//   };

//   const [searchText, setSearchText] = useState("");
//   const [modalExpenseVisible, setModalExpenseVisible] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);

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

//   // Групуємо витрати для графіка
//   const expenseResults = expenses.reduce((acc, curr) => {
//     acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
//     return acc;
//   }, {});

//   const chartData = Object.entries(expenseResults).map(([key, value], index) => ({
//     label: ukrLabels[key] || key,
//     value,
//     color: getColor(index),
//   }));

//   const filteredData = expenses.filter((item) =>
//     (ukrLabels[item.category] || item.category)
//       .toLowerCase()
//       .includes(searchText.toLowerCase())
//   );

//   const handleSaveExpense = (expense) => {
//     if (editingItem) {
//       dispatch(editExpense({ ...editingItem, ...expense }));
//     } else {
//       dispatch(addExpense({ ...expense, id: Date.now().toString() }));
//     }
//     setModalExpenseVisible(false);
//     setEditingItem(null);
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteExpense(id));
//   };

//   const openEditModal = (item) => {
//     setEditingItem(item);
//     setModalExpenseVisible(true);
//   };

//   const openAddModal = () => {
//     setEditingItem(null);
//     setModalExpenseVisible(true);
//   };

//   return (
//     <View style={styles.container}>
//       {chartData.length > 0 ? (
//         <DonutChart data={chartData} />
//       ) : (
//         <Text style={styles.noDataText}>Даних про витрати немає</Text>
//       )}

//       <BlueButton title="Внести нові дані" onPress={openAddModal} />

//       <ExpenseModal
//         visible={modalExpenseVisible}
//         onClose={() => {
//           setModalExpenseVisible(false);
//           setEditingItem(null);
//         }}
//         onSubmit={handleSaveExpense}
//         initialCategory={editingItem?.category || ""}
//         initialAmount={editingItem?.amount || ""}
//         initialComment={editingItem?.comment || ""}
//         initialDate={editingItem?.date || new Date().toLocaleDateString("uk-UA")}
//       />

//       <View style={styles.searchContainer}>
//         <Ionicons name="search" size={20} color="#666" />
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Пошук"
//           value={searchText}
//           onChangeText={setSearchText}
//         />
//         <TouchableOpacity>
//           <Ionicons name="filter-outline" size={22} color="#000" />
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.historyTitle}>Історія витрат</Text>

//       <SwipeListView
//         data={filteredData}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.historyItem}>
//             <View>
//               <Text style={styles.incomeName}>
//                 {item.comment || "Без коментаря"}
//               </Text>
//               {item.date && <Text style={styles.dateText}>{item.date}</Text>}
//             </View>
//             <Text style={styles.amount}>- {item.amount.toLocaleString()} ₴</Text>
//           </View>
//         )}
//         renderHiddenItem={({ item }) => (
//           <View style={styles.rowBack}>
//             <TouchableOpacity
//               style={[styles.backRightBtn, styles.backRightBtnLeft]}
//               onPress={() => openEditModal(item)}
//             >
//               <Ionicons name="create-outline" size={24} color="#fff" />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.backRightBtn, styles.backRightBtnRight]}
//               onPress={() => handleDelete(item.id)}
//             >
//               <Ionicons name="trash-outline" size={24} color="#fff" />
//             </TouchableOpacity>
//           </View>
//         )}
//         rightOpenValue={-150}
//         disableRightSwipe
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#EFF9FC",
//     padding: 5,
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginVertical: 12,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 8,
//     fontSize: 16,
//   },
//   historyTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginVertical: 8,
//   },
//   historyItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     backgroundColor: "#fff",
//     padding: 12,
//     marginBottom: 8,
//     alignItems: "center",
//   },
//   incomeName: {
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   dateText: {
//     fontSize: 13,
//     color: "#888",
//   },
//   amount: {
//     fontSize: 16,
//     color: "red",
//     fontWeight: "600",
//   },
//   noDataText: {
//     textAlign: "center",
//     fontSize: 16,
//     color: "#999",
//     marginTop: 20,
//   },
//   rowBack: {
//     alignItems: "center",
//     backgroundColor: "#DDD",
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   backRightBtn: {
//     alignItems: "center",
//     justifyContent: "center",
//     width: 75,
//     height: "100%",
//     borderRadius: 0,
//   },
//   backRightBtnLeft: {
//     backgroundColor: "#D4B106",
//   },
//   backRightBtnRight: {
//     backgroundColor: "#d11a2a",
//   },
// });

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";

import DonutChart from "../components/DonutChart";
import BlueButton from "../components/BlueButton";
import ExpenseModal from "../components/ExpenseModal";

import { useSelector, useDispatch } from "react-redux";
import { addExpense, editExpense, deleteExpense } from "../store/expenseSlice";

export default function ExpenseDetailScreen() {
  const expenses = useSelector((state) => state.expense.expenses);
  const dispatch = useDispatch();

  const categoriesUA = {
    housing: "Житло",
    food: "Харчування",
    entertainment: "Розваги",
    health: "Здоров'я",
    transport: "Транспорт",
    family: "Сім'я",
    other: "Інше",
  };

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

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

  // рахуємо витрати по категоріях
  let categoryTotals = {};
  expenses.forEach((item) => {
    if (!categoryTotals[item.category]) {
      categoryTotals[item.category] = 0;
    }
    categoryTotals[item.category] += Number(item.amount);
  });

  const chartData = Object.keys(categoryTotals).map((cat, index) => {
    return {
      label: categoriesUA[cat] || cat,
      value: categoryTotals[cat],
      color: getColor(index),
    };
  });

  // фільтруємо по пошуку
  const filteredExpenses = expenses.filter((item) => {
    const name = categoriesUA[item.category] || item.category;
    return name.toLowerCase().includes(search.toLowerCase());
  });

  function saveExpense(data) {
    if (editItem) {
      dispatch(editExpense({ ...editItem, ...data }));
    } else {
      dispatch(addExpense({ ...data, id: Date.now().toString() }));
    }
    setShowModal(false);
    setEditItem(null);
  }

  function deleteItem(id) {
    dispatch(deleteExpense(id));
  }

  function startEdit(item) {
    setEditItem(item);
    setShowModal(true);
  }

  function startAdd() {
    setEditItem(null);
    setShowModal(true);
  }

  return (
    <View style={styles.container}>
      {chartData.length > 0 ? (
        <DonutChart data={chartData} />
      ) : (
        <Text style={styles.noDataText}>Даних про витрати немає</Text>
      )}

      <BlueButton title="Внести нові дані" onPress={startAdd} />

      <ExpenseModal
        visible={showModal}
        onClose={() => {
          setShowModal(false);
          setEditItem(null);
        }}
        onSubmit={saveExpense}
        initialCategory={editItem?.category || ""}
        initialAmount={editItem?.amount || ""}
        initialComment={editItem?.comment || ""}
        initialDate={editItem?.date || new Date().toLocaleDateString("uk-UA")}
      />

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Пошук"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity>
          <Ionicons name="filter-outline" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      <Text style={styles.historyTitle}>Історія витрат</Text>

      <SwipeListView
        data={filteredExpenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <View>
              <Text style={styles.incomeName}>
                {item.comment || "Без коментаря"}
              </Text>
              {item.date && <Text style={styles.dateText}>{item.date}</Text>}
            </View>
            <Text style={styles.amount}>- {item.amount} ₴</Text>
          </View>
        )}
        renderHiddenItem={({ item }) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnLeft]}
              onPress={() => startEdit(item)}
            >
              <Ionicons name="create-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={() => deleteItem(item.id)}
            >
              <Ionicons name="trash-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-150}
        disableRightSwipe
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF9FC",
    padding: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 8,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 8,
    alignItems: "center",
  },
  incomeName: {
    fontSize: 16,
    fontWeight: "500",
  },
  dateText: {
    fontSize: 13,
    color: "#888",
  },
  amount: {
    fontSize: 16,
    color: "red",
    fontWeight: "600",
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 20,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    borderRadius: 8,
    marginBottom: 8,
  },
  backRightBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 75,
    height: "100%",
  },
  backRightBtnLeft: { backgroundColor: "#D4B106" },
  backRightBtnRight: { backgroundColor: "#d11a2a" },
});
