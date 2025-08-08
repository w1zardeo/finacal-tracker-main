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
} from "react-native";
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
  initialDate = new Date().toLocaleDateString("uk-UA"),
}) {
  const [date, setDate] = useState(initialDate);
  const [category, setCategory] = useState(initialCategory);
  const [amount, setAmount] = useState(initialAmount.toString());
  const [comment, setComment] = useState(initialComment);
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);

  // Коли змінюються початкові пропси — оновлюємо стани
  useEffect(() => {
    setDate(initialDate);
    setCategory(initialCategory);
    setAmount(initialAmount.toString());
    setComment(initialComment);
  }, [initialCategory, initialAmount, initialComment, initialDate, visible]);

  const handleSave = () => {
    if (category && parseFloat(amount) > 0) {
      onSubmit({ category, amount: parseFloat(amount), comment, date });
      // Очистити стан після відправлення (можна, але не обов'язково)
      // setCategory("");
      // setAmount("");
      // setComment("");
      // setDate(new Date().toLocaleDateString("uk-UA"));
      onClose();
    }
  };

  const handleCategorySelect = (selected) => {
    setCategory(selected);
    setCategoryMenuVisible(false);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.modalTitle}>Внесення даних про розходи</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Вкажіть дату</Text>
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={setDate}
            placeholder="дд.мм.рррр"
          />

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 4 }}>
              <Text style={styles.label}>Виберіть категорію</Text>
              <Pressable
                style={styles.input}
                onPress={() => setCategoryMenuVisible(true)}
              >
                <Text style={{ color: category ? "#000" : "#aaa" }}>
                  {category
                    ? categories.find((c) => c.value === category)?.label
                    : "Категорія"}
                </Text>
              </Pressable>
            </View>
            <View style={{ flex: 1, marginLeft: 4 }}>
              <Text style={styles.label}>Сума розходу</Text>
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
              />
            </View>
          </View>

          <Text style={styles.label}>Ваш коментар</Text>
          <TextInput
            style={styles.commentInput}
            value={comment}
            onChangeText={setComment}
            multiline
          />

          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Внести дані</Text>
          </Pressable>

          <Pressable onPress={onClose}>
            <Text style={styles.cancelButtonText}>Відмінити</Text>
          </Pressable>
        </View>
      </View>

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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  label: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D1D6",
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 12,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#D1D1D6",
    borderRadius: 8,
    padding: 8,
    height: 60,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  cancelButtonText: {
    color: "red",
    fontWeight: "600",
    textAlign: "center",
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
