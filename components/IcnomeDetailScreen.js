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
import IncomeChart from "../components/IcnomeChart";
import BlueButton from "../components/BlueButton";
import IncomeModal from "../components/IncomeModal";

export default function IncomeDetailScreen({ route }) {
  const { incomeData: initialIncomeData = [] } = route.params || {};
  const [incomeData, setIncomeData] = useState(initialIncomeData);
  const [searchText, setSearchText] = useState("");
  const [modalIncomeVisible, setModalIncomeVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // Для редагування

  const handleAddIncome = (newEntry) => {
    if (editingItem) {
      // Оновлюємо існуючий елемент
      setIncomeData((prev) =>
        prev.map((item, idx) =>
          idx === editingItem.index ? { ...item, ...newEntry } : item
        )
      );
      setEditingItem(null);
    } else {
      setIncomeData((prev) => [...prev, newEntry]);
    }
  };

  const handleDelete = (index) => {
    setIncomeData((prev) => prev.filter((_, i) => i !== index));
  };

  const openEditModal = (item, index) => {
    setEditingItem({ ...item, index });
    setModalIncomeVisible(true);
  };

  const filteredData = incomeData.filter((item) =>
    item.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {incomeData.length > 0 && <IncomeChart data={incomeData} />}

      <BlueButton
        title="Внести нові дані"
        onPress={() => {
          setEditingItem(null);
          setModalIncomeVisible(true);
        }}
      />

      <IncomeModal
        visible={modalIncomeVisible}
        onClose={() => {
          setModalIncomeVisible(false);
          setEditingItem(null);
        }}
        onSubmit={handleAddIncome}
        initialName={editingItem?.name || ""}
        initialAmount={editingItem?.amount || ""}
        initialDate={editingItem?.date || ""}
        initialTime={editingItem?.time || ""}
      />

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Пошук"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity>
          <Ionicons name="filter-outline" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      <Text style={styles.historyTitle}>Історія доходів</Text>

      <SwipeListView
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <View>
              <Text style={styles.incomeName}>{item.name || "Дохід"}</Text>
              <Text style={styles.dateText}>
                {item.date} {item.time || ""}
              </Text>
            </View>
            <Text style={styles.amount}>+ {item.amount.toLocaleString()} ₴</Text>
          </View>
        )}
        renderHiddenItem={({ item, index }) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnLeft]}
              onPress={() => openEditModal(item, index)}
            >
              <Ionicons name="create-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={() => handleDelete(index)}
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
    padding: 16,
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
    color: "green",
    fontWeight: "600",
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
  backRightBtnLeft: {
    backgroundColor: "#D4B106",
  },
  backRightBtnRight: {
    backgroundColor: "#d11a2a",
  },
});
