// import React, { useState } from "react";
// import {
//   Modal,
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   Pressable,
//   TouchableOpacity,
//   Platform,
// } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { Ionicons } from "@expo/vector-icons";

// export default function IncomeModal({ visible, onClose, onSubmit }) {
//   const [date, setDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [amount, setAmount] = useState("");

//   const handleSave = () => {
//     if (!amount) return;
//     const formattedDate = date.toLocaleDateString("uk-UA");
//     const day = date.getDate();
//     onSubmit({ date: formattedDate, amount: parseFloat(amount), day: day });
//     setAmount("");
//     onClose();
//   };

//   return (
//     <Modal visible={visible} transparent animationType="fade">
//       <View style={styles.overlay}>
//         <View style={styles.modal}>
//           <Text style={styles.title}>Внесення даних о доходах</Text>

//           <Text style={styles.label}>Укажіть дату</Text>
//           <TouchableOpacity
//             onPress={() => setShowDatePicker(true)}
//             style={styles.dateInput}
//           >
//             <Text>{date.toLocaleDateString("uk-UA")}</Text>
//             <Ionicons name="calendar-outline" size={20} color="#666" />
//           </TouchableOpacity>
//           {showDatePicker && (
//             <DateTimePicker
//               value={date}
//               mode="date"
//               display={Platform.OS === "ios" ? "spinner" : "default"}
//               onChange={(event, selectedDate) => {
//                 setShowDatePicker(false);
//                 if (selectedDate) setDate(selectedDate);
//               }}
//             />
//           )}

//           <Text style={styles.label}>Укажіть суму доходу</Text>
//           <TextInput
//             style={styles.input}
//             value={amount}
//             onChangeText={setAmount}
//             keyboardType="numeric"
//             placeholder="0.00"
//           />

//           <Pressable style={styles.submitButton} onPress={handleSave}>
//             <Text style={styles.submitButtonText}>Внести дані</Text>
//           </Pressable>

//           <Pressable onPress={onClose}>
//             <Text style={styles.cancelText}>Скасувати</Text>
//           </Pressable>
//         </View>
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "rgba(0,0,0,0.4)",
//     paddingHorizontal: 20,
//   },
//   modal: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 20,
//     elevation: 10,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   label: {
//     fontSize: 14,
//     marginBottom: 6,
//   },
//   dateInput: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 6,
//     padding: 12,
//     marginBottom: 16,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 6,
//     padding: 12,
//     marginBottom: 20,
//   },
//   submitButton: {
//     backgroundColor: "#0066FF",
//     padding: 14,
//     borderRadius: 6,
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   submitButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   cancelText: {
//     color: "#ff3333",
//     textAlign: "center",
//     fontSize: 15,
//   },
// });

import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

export default function IncomeModal({ visible, onClose, onSubmit }) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");

  const handleSave = () => {
    if (!amount || !name) return;

    const formattedDate = date.toLocaleDateString("uk-UA");
    const formattedTime = date.toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
    });

    onSubmit({
      name,
      date: formattedDate,
      time: formattedTime,
      amount: parseFloat(amount),
      day: date.getDate(),
    });

    setAmount("");
    setName("");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Внесення даних про доходи</Text>

          {/* Назва доходу */}
          <Text style={styles.label}>Назва доходу</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Наприклад: Заробітна плата"
          />

          {/* Дата */}
          <Text style={styles.label}>Укажіть дату</Text>
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

          {/* Сума доходу */}
          <Text style={styles.label}>Сума доходу</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0.00"
          />

          {/* Кнопки */}
          <Pressable style={styles.submitButton} onPress={handleSave}>
            <Text style={styles.submitButtonText}>Внести дані</Text>
          </Pressable>

          <Pressable onPress={onClose}>
            <Text style={styles.cancelText}>Скасувати</Text>
          </Pressable>
        </View>
      </View>
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
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 20,
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
});
