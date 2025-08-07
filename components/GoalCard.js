// import { View, Text, StyleSheet, Image } from "react-native";

// function GoalCard({ goal }) {
//   const monthlyPayment = (parseFloat(goal.amount) / parseFloat(goal.term)).toFixed(0);
//   return (
//     <View style={styles.card}>
//       <Image source={{ uri: goal.imageUri }} style={styles.image} />
//       <View style={styles.info}>
//         <Text style={styles.title}>На {goal.title}</Text>
//         <Text>Сума виконання цілі: {parseInt(goal.amount).toLocaleString()}</Text>
//         <Text>Строк цілі: {goal.term} місяців</Text>
//         <Text>Щомісячний платіж: {monthlyPayment}</Text>
//         <Text>Статус виконання цілі: {goal.progress}%</Text>
//         <View style={styles.progressBar}>
//           <View style={[styles.progressFill, { width: `${goal.progress}%` }]} />
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "white",
//     margin: 12,
//     borderRadius: 10,
//     overflow: "hidden",
//     flexDirection: "row",
//     elevation: 2,
//   },
//   image: {
//     width: 100,
//     height: 100,
//   },
//   info: {
//     padding: 10,
//     flex: 1,
//   },
//   title: {
//     fontWeight: "bold",
//     marginBottom: 4,
//   },
//   progressBar: {
//     height: 6,
//     backgroundColor: "#eee",
//     borderRadius: 3,
//     marginTop: 6,
//   },
//   progressFill: {
//     height: 6,
//     backgroundColor: "#007BFF",
//     borderRadius: 3,
//   },
// });

// export default GoalCard;

// GoalCard.js
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

function GoalCard({ goal, onDelete, onEdit }) {
  const navigation = useNavigation();

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
          <Text style={styles.title}>На {goal.title}</Text>
          <Text style={styles.text}>
            Сума виконання цілі: {parseInt(goal.amount).toLocaleString()}
          </Text>
          <Text style={styles.text}>Строк цілі: {goal.term} місяців</Text>
          <Text style={styles.text}>Щомісячний платіж: {monthlyPayment}</Text>
          <Text style={styles.text}>
            Статус виконання цілі: {goal.progress}%
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${goal.progress}%` }]}
            />
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
