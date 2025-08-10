import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

const categories = [
  { label: "Транспорт", value: "transport" },
  { label: "Харчування", value: "food" },
  { label: "Житло", value: "housing" },
  { label: "Дод. розходи", value: "other" },
];

export default function ExpenseModal({
  visible,
  onClose,
  onSubmit,
  initialCategory = "",
  initialAmount = "",
  initialComment = "",
  initialDate = "",
}) {
  const parseDate = (dateStr) => {
    const d = new Date(dateStr);
    return isNaN(d) ? new Date() : d;
  };

  const [date, setDate] = useState(parseDate(initialDate));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [category, setCategory] = useState(initialCategory);
  const [amount, setAmount] = useState(initialAmount.toString());
  const [comment, setComment] = useState(initialComment);

  useEffect(() => {
    setDate(parseDate(initialDate));
    setCategory(initialCategory);
    setAmount(initialAmount.toString());
    setComment(initialComment);
  }, [initialDate, initialCategory, initialAmount, initialComment]);

  const handleSave = () => {
    if (!category || !amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0)
      return;

    const formattedDate = date.toLocaleDateString("uk-UA");
    const formattedTime = date.toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
    });

    onSubmit({
      category,
      amount: parseFloat(amount),
      comment,
      date: formattedDate,
      time: formattedTime,
      day: date.getDate(),
    });

    setCategory("");
    setAmount("");
    setComment("");
    setDate(new Date());

    onClose();
  };

  const handleCategorySelect = (selected) => {
    setCategory(selected);
    setCategoryMenuVisible(false);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Внесення даних про розходи</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Категорія */}
          <Text style={styles.label}>Категорія</Text>
          <Pressable
            style={styles.input}
            onPress={() => setCategoryMenuVisible(true)}
          >
            <Text style={{ color: category ? "#000" : "#aaa" }}>
              {categories.find((c) => c.value === category)?.label || "Оберіть категорію"}
            </Text>
          </Pressable>

          {/* Сума */}
          <Text style={styles.label}>Сума розходу</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0.00"
          />

          {/* Коментар */}
          <Text style={styles.label}>Коментар</Text>
          <TextInput
            style={styles.commentInput}
            value={comment}
            onChangeText={setComment}
            multiline
            placeholder="Ваш коментар"
          />

          {/* Дата */}
          <Text style={styles.label}>Дата</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.dateInput}
          >
            <Text>{date.toLocaleDateString("uk-UA")}</Text>
            <Ionicons name="calendar-outline" size={20} color="#666" />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}

          {/* Кнопки */}
          <Pressable style={styles.submitButton} onPress={handleSave}>
            <Text style={styles.submitButtonText}>Внести дані</Text>
          </Pressable>

          <Pressable onPress={onClose}>
            <Text style={styles.cancelText}>Скасувати</Text>
          </Pressable>
        </View>
      </View>

      {/* Меню вибору категорії */}
      <Modal visible={categoryMenuVisible} transparent animationType="fade">
        <Pressable
          style={styles.menuOverlay}
          onPress={() => setCategoryMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <FlatList
              data={categories}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.menuItem}
                  onPress={() => handleCategorySelect(item.value)}
                >
                  <Text style={styles.menuItemText}>{item.label}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 20,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    height: 60,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: "#0066FF",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 12,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelText: {
    color: "#ff3333",
    textAlign: "center",
    fontSize: 15,
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
  },
  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  menuItemText: {
    fontSize: 16,
    color: "#000",
  },
});
