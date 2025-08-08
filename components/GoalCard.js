import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function GoalCard({ goal, onDelete, onEdit }) {
  const navigation = useNavigation();

  const [paidAmount, setPaidAmount] = useState(0);
  const [progress, setProgress] = useState(0);

  const storageKey = `payments_${goal.id}`;

  useEffect(() => {
    // Завантаження платежів для цієї цілі
    const loadPayments = async () => {
      try {
        const savedPayments = await AsyncStorage.getItem(storageKey);
        if (savedPayments) {
          const parsed = JSON.parse(savedPayments);
          const totalPaid = parsed.reduce((sum, p) => sum + Number(p.amount), 0);
          setPaidAmount(totalPaid);

          const target = parseFloat(goal.amount || goal.targetAmount || 0);
          if (target > 0) {
            setProgress(Math.min((totalPaid / target) * 100, 100).toFixed(0));
          } else {
            setProgress(0);
          }
        } else {
          setPaidAmount(0);
          setProgress(0);
        }
      } catch (error) {
        console.error("Error loading payments in GoalCard:", error);
      }
    };

    loadPayments();
  }, [goal.id, goal.amount, goal.targetAmount]);

  const monthlyPayment = (
    parseFloat(goal.amount) / parseFloat(goal.term)
  ).toFixed(0);

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => navigation.navigate("GoalDetails", { goal })}
        >
          <Image source={{ uri: goal.imageUri }} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.info}>
          <Text style={styles.title}>{goal.title}</Text>
          <Text style={styles.text}>
            Сума виконання цілі: {parseInt(goal.amount).toLocaleString()}
          </Text>
          <Text style={styles.text}>Строк цілі: {goal.term} місяців</Text>
          <Text style={styles.text}>Щомісячний платіж: {monthlyPayment}</Text>
          <Text style={styles.text}>Статус виконання цілі: {progress}%</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>
        <View style={styles.actions}>
          <Ionicons
            name="pencil"
            size={20}
            color="#333"
            style={styles.icon}
            onPress={() => onEdit(goal)}
          />
          <Ionicons
            name="trash"
            size={20}
            color="red"
            style={styles.icon}
            onPress={() => onDelete(goal.id)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
  },
  text: {
    fontSize: 13,
    marginBottom: 2,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    marginTop: 6,
  },
  progressFill: {
    height: 6,
    backgroundColor: "#007BFF",
    borderRadius: 3,
  },
  actions: {
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 8,
  },
  icon: {
    marginVertical: 4,
  },
});

export default GoalCard;
