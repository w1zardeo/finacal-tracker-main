import { View, Text, StyleSheet, Image, Pressable, Modal } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SwipeListView } from "react-native-swipe-list-view";
import PaymentModal from "../components/PaymentModal";
import { Ionicons } from "@expo/vector-icons";

export default function GoalDetailsScreen() {
  const route = useRoute();
  const { goal } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [payments, setPayments] = useState([]);
  const [total, setTotal] = useState(0);
  const [progress, setProgress] = useState(0);
  const [editingPayment, setEditingPayment] = useState(null);

  const storageKey = `payments_${goal.id}`;

  // 1. Завантаження збережених платежів
  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const savedPayments = await AsyncStorage.getItem(storageKey);
      if (savedPayments) {
        const parsed = JSON.parse(savedPayments);
        setPayments(parsed);
        setTotal(parsed.reduce((sum, p) => sum + Number(p.amount) || 0, 0));
      }
    } catch (error) {
      console.error("Error loading payments:", error);
    }
  };

  // 2. Автоматичний підрахунок прогресу
  useEffect(() => {
    const target = parseFloat(goal.amount || goal.targetAmount || 0);
    if (target > 0) {
      setProgress(Math.min((total / target) * 100, 100).toFixed(0));
    } else {
      setProgress(0);
    }
  }, [total, goal.amount, goal.targetAmount]);

  // 3. Збереження в AsyncStorage
  const savePayments = async (updatedPayments) => {
    setPayments(updatedPayments);
    setTotal(updatedPayments.reduce((sum, p) => sum + Number(p.amount) || 0, 0));
    await AsyncStorage.setItem(storageKey, JSON.stringify(updatedPayments));
  };

  // 4. Додавання/редагування платежів
  const handleAddOrEditPayment = (amount) => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) return;

    if (editingPayment) {
      const updatedPayments = payments.map((p) =>
        p.id === editingPayment.id ? { ...p, amount: Number(amount) } : p
      );
      savePayments(updatedPayments);
      setEditingPayment(null);
    } else {
      const newPayment = {
        id: Date.now().toString(),
        amount: Number(amount),
        date: new Date().toLocaleString(),
      };
      savePayments([...payments, newPayment]);
    }

    setModalVisible(false);
  };

  // 5. Видалення
  const handleDeletePayment = (id) => {
    const filtered = payments.filter((p) => p.id !== id);
    savePayments(filtered);
  };

  const openEditModal = (payment) => {
    setEditingPayment(payment);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: goal.imageUri }} style={styles.image} />
      <Text style={styles.title}>{goal.title}</Text>
      <Text style={styles.text}>
        Минулий платіж:{" "}
        {payments.length > 0 ? payments[payments.length - 1].amount : 0}
      </Text>
      <Text style={styles.text}>Статус виконання цілі: {progress}%</Text>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      <Pressable
        style={styles.primaryButton}
        onPress={() => {
          setEditingPayment(null);
          setModalVisible(true);
        }}
      >
        <Text style={styles.primaryButtonText}>Внести платіж</Text>
      </Pressable>

      <Text style={styles.historyTitle}>Історія платежів</Text>

      <SwipeListView
        data={payments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.paymentItem}>
            <Text style={{ fontSize: 12 }}>{item.date}</Text>
            <Text style={{ color: "green", fontWeight: "bold", marginLeft: "auto" }}>
              + {item.amount}
            </Text>
          </View>
        )}
        renderHiddenItem={({ item }) => (
          <View style={styles.rowBack}>
            <Pressable
              style={[styles.backButton, { backgroundColor: "orange" }]}
              onPress={() => openEditModal(item)}
            >
              <Ionicons name="create-outline" size={24} color="#fff" />
            </Pressable>
            <Pressable
              style={[styles.backButton, { backgroundColor: "red" }]}
              onPress={() => handleDeletePayment(item.id)}
            >
              <Ionicons name="trash-outline" size={24} color="#fff" />
            </Pressable>
          </View>
        )}
        leftOpenValue={0}
        rightOpenValue={-150}
      />

      <Modal visible={modalVisible} transparent animationType="slide">
        <PaymentModal
          onClose={() => {
            setModalVisible(false);
            setEditingPayment(null);
          }}
          onSubmit={handleAddOrEditPayment}
          initialAmount={editingPayment?.amount?.toString() || ""}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#EFF9FC", flex: 1, padding: 16 },
  image: { width: "100%", height: 160, borderRadius: 12, marginBottom: 12 },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 6 },
  text: { fontSize: 14, marginBottom: 6 },
  progressBar: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressFill: { height: 8, backgroundColor: "#007BFF" },
  primaryButton: {
    backgroundColor: "#007BFF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  primaryButtonText: { color: "#fff", fontWeight: "bold" },
  historyTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  paymentItem: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#ddd",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 8,
    borderRadius: 6,
  },
  backButton: {
    width: 75,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
