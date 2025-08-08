import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useState } from "react";

export default function PaymentModal({ onClose, onSubmit }) {
  const [amount, setAmount] = useState("");

  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.title}>Введіть суму платежу</Text>
        <TextInput
          style={styles.input}
          placeholder="Сума"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <Pressable
          style={styles.button}
          onPress={() => {
            onSubmit(Number(amount));
            setAmount("");
          }}
        >
          <Text style={styles.buttonText}>Підтвердити</Text>
        </Pressable>
        <Pressable onPress={onClose}>
          <Text style={styles.cancelText}>Скасувати</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000099",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "80%",
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelText: {
    textAlign: "center",
    color: "#007BFF",
    marginTop: 6,
  },
});
