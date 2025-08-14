// import React from "react";
// import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { useSelector } from "react-redux";

// function GoalCard({ goal, onDelete, onEdit }) {
//   const navigation = useNavigation();

//   // Вибираємо платежі з Redux за goal.id
//   const payments = useSelector(
//     (state) => state.payments.paymentsByGoal?.[goal.id] || []
//   );

//   // Обчислюємо суму сплаченого і прогрес
//   const totalPaid = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
//   const target = parseFloat(goal.amount || goal.targetAmount || 0);
//   const progress = target > 0 ? Math.min((totalPaid / target) * 100, 100).toFixed(0) : 0;

//   const monthlyPayment = (
//     parseFloat(goal.amount) / parseFloat(goal.term)
//   ).toFixed(0);

//   return (
//     <View style={styles.card}>
//       <View style={styles.row}>
//         <TouchableOpacity
//           onPress={() => navigation.navigate("GoalDetails", { goal })}
//         >
//           <Image source={{ uri: goal.imageUri }} style={styles.image} />
//         </TouchableOpacity>
//         <View style={styles.info}>
//           <Text style={styles.title}>{goal.title}</Text>
//           <Text style={styles.text}>
//             Сума виконання цілі: {parseInt(goal.amount).toLocaleString()}
//           </Text>
//           <Text style={styles.text}>Строк цілі: {goal.term} місяців</Text>
//           <Text style={styles.text}>Щомісячний платіж: {monthlyPayment}</Text>
//           <Text style={styles.text}>Статус виконання цілі: {progress}%</Text>

//           {/* Прогрес-бар */}
//           <View style={styles.progressBar}>
//             <View style={[styles.progressFill, { width: `${progress}%` }]} />
//           </View>
//         </View>
//         <View style={styles.actions}>
//           <Ionicons
//             name="pencil"
//             size={20}
//             color="#333"
//             style={styles.icon}
//             onPress={() => onEdit(goal)}
//           />
//           <Ionicons
//             name="trash"
//             size={20}
//             color="red"
//             style={styles.icon}
//             onPress={() => onDelete(goal.id)}
//           />
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "#fff",
//     marginHorizontal: 12,
//     marginTop: 12,
//     borderRadius: 12,
//     overflow: "hidden",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     padding: 12,
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//   },
//   image: {
//     width: 90,
//     height: 90,
//     borderRadius: 8,
//     marginRight: 10,
//   },
//   info: {
//     flex: 1,
//   },
//   title: {
//     fontWeight: "bold",
//     fontSize: 16,
//     marginBottom: 6,
//   },
//   text: {
//     fontSize: 13,
//     marginBottom: 2,
//   },
//   progressBar: {
//     height: 8,
//     backgroundColor: "#E0E0E0",
//     borderRadius: 4,
//     overflow: "hidden",
//     marginTop: 6,
//   },
//   progressFill: {
//     height: 8,
//     backgroundColor: "#007BFF",
//   },
//   actions: {
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginLeft: 8,
//   },
//   icon: {
//     marginVertical: 4,
//   },
// });

// export default GoalCard;


import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function GoalCard({ goal, onDelete, onEdit }) {
  const navigation = useNavigation();

  // Беремо всі платежі для цієї цілі з Redux
  const allPayments = useSelector((state) => state.payments.paymentsByGoal?.[goal.id] || []);

  // Рахуємо скільки вже заплатили
  let totalPaid = 0;
  for (let i = 0; i < allPayments.length; i++) {
    totalPaid += Number(allPayments[i].amount || 0);
  }

  // Загальна сума цілі
  const targetAmount = parseFloat(goal.amount || goal.targetAmount || 0);

  // Відсоток прогресу
  let progress = 0;
  if (targetAmount > 0) {
    progress = (totalPaid / targetAmount) * 100;
    if (progress > 100) progress = 100;
    progress = progress.toFixed(0);
  }

  // Щомісячний платіж
  let monthlyPayment = 0;
  if (goal.term > 0) {
    monthlyPayment = (parseFloat(goal.amount) / parseFloat(goal.term)).toFixed(0);
  }

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {/* Картинка */}
        <TouchableOpacity onPress={() => navigation.navigate("GoalDetails", { goal })}>
          <Image source={{ uri: goal.imageUri }} style={styles.image} />
        </TouchableOpacity>

        {/* Інформація */}
        <View style={styles.info}>
          <Text style={styles.title}>{goal.title}</Text>
          <Text style={styles.text}>Сума виконання цілі: {parseInt(goal.amount).toLocaleString()}</Text>
          <Text style={styles.text}>Строк цілі: {goal.term} місяців</Text>
          <Text style={styles.text}>Щомісячний платіж: {monthlyPayment}</Text>
          <Text style={styles.text}>Статус виконання цілі: {progress}%</Text>

          {/* Прогрес-бар */}
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: progress + "%" }]} />
          </View>
        </View>

        {/* Кнопки */}
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

// Стилі ті ж самі
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
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 6,
  },
  progressFill: {
    height: 8,
    backgroundColor: "#007BFF",
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
