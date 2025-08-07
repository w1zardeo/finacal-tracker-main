// import { View, Text, StyleSheet, Pressable, Modal } from "react-native";
// import { useState } from "react";
// import AddGoalModal from "../components/AddGoalModal";
// import GoalCard from "../components/GoalCard";
// import Incomes from "../components/Incomes";

// function GoalsScreen() {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [goals, setGoals] = useState([]);

//   return (
//     <View style={styles.container}>
//       {goals.length === 0 ? (
//         <Incomes
//           title=""
//           data="У вас ще немає ні одної мети!"
//           text="Для того щоб створити свою першу мету і відстежувати її статус, вам необхідно натиснути кнопку нижче, потім заповнити всі необхідні поля"
//           buttonTitle="Добавити нову мету"
//           onPress={() => setModalVisible(true)}
//         />
//       ) : (
//         <>
//           {goals.map((goal) => (
//             <GoalCard key={goal.id} goal={goal} />
//           ))}
//           <Pressable style={styles.newGoalButton} onPress={() => setModalVisible(true)}>
//             <Text style={styles.newGoalButtonText}>Добавити нову ціль</Text>
//           </Pressable>
//         </>
//       )}

//       <Modal visible={modalVisible} animationType="slide" transparent>
//         <AddGoalModal
//           onClose={() => setModalVisible(false)}
//           onAddGoal={(goal) => {
//             setGoals((prevGoals) => [...prevGoals, goal]);
//             setModalVisible(false);
//           }}
//         />
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#EFF9FC",
//   },
//   newGoalButton: {
//     backgroundColor: "#007BFF",
//     margin: 16,
//     padding: 14,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   newGoalButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });

// export default GoalsScreen;
import { View, Text, StyleSheet, Pressable, Modal, ScrollView } from "react-native";
import { useState } from "react";
import AddGoalModal from "../components/AddGoalModal";
import GoalCard from "../components/GoalCard";
import Incomes from "../components/Incomes";

function GoalsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);

  const handleDeleteGoal = (goalId) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
  };

  const handleEditGoal = (goalToEdit) => {
    setEditingGoal(goalToEdit);
    setModalVisible(true);
  };

  const handleSaveGoal = (goal) => {
    if (editingGoal) {
      setGoals((prevGoals) =>
        prevGoals.map((g) => (g.id === goal.id ? goal : g))
      );
      setEditingGoal(null);
    } else {
      setGoals((prevGoals) => [...prevGoals, goal]);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {goals.length === 0 ? (
          <Incomes
            title=""
            data="У вас ще немає ні одної мети!"
            text="Для того щоб створити свою першу мету і відстежувати її статус, вам необхідно натиснути кнопку нижче, потім заповнити всі необхідні поля"
            buttonTitle="Добавити нову мету"
            onPress={() => setModalVisible(true)}
          />
        ) : (
          <>
            {goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onDelete={handleDeleteGoal}
                onEdit={handleEditGoal}
              />
            ))}
            <Pressable
              style={styles.newGoalButton}
              onPress={() => {
                setEditingGoal(null);
                setModalVisible(true);
              }}
            >
              <Text style={styles.newGoalButtonText}>Добавити нову ціль</Text>
            </Pressable>
          </>
        )}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <AddGoalModal
          onClose={() => {
            setModalVisible(false);
            setEditingGoal(null);
          }}
          onAddGoal={handleSaveGoal}
          initialGoal={editingGoal}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF9FC",
  },
  newGoalButton: {
    backgroundColor: "#007BFF",
    margin: 16,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  newGoalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default GoalsScreen;