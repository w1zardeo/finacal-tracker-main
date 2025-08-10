import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import GoalDetailScreen from "../components/GoalDetailScreen";
import IncomeDetailScreen from "../components/IcnomeDetailScreen";
import ExpenseDetailScreen from "../components/ExpenseDetailScreen";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { store } from "../store/store";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Provider store={store}>
    <Stack.Navigator
      screenOptions={{
        // Колір фону для всіх екранів
        cardStyle: { backgroundColor: "#EFF9FC" },
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GoalDetails"
        component={GoalDetailScreen}
        options={({ navigation }) => ({
          title: "Ціль",
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#fff",
          headerLeft: () => (
            <Ionicons
              name="arrow-back-outline"
              size={24}
              color="#fff"
              style={{ marginLeft: 15 }}
              onPress={() => navigation.goBack("HomeScreen")} // або 'HomeScreen' залежно від назви
            />
          ),
        })}
      />
      <Stack.Screen
        name="IncomeDetail"
        component={IncomeDetailScreen}
        options={({ navigation }) => ({
          title: "Всі доходи",
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#fff",
          headerLeft: () => (
            <Ionicons
              name="arrow-back-outline"
              size={24}
              color="#fff"
              style={{ marginLeft: 15 }}
              onPress={() => navigation.goBack("HomeScreen")} // або 'HomeScreen' залежно від назви
            />
          ),
        })}
      />
      <Stack.Screen
        name="EpxenseDetail"
        component={ExpenseDetailScreen}
        options={({ navigation }) => ({
          title: "Всі розходи",
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#fff",
          headerLeft: () => (
            <Ionicons
              name="arrow-back-outline"
              size={24}
              color="#fff"
              style={{ marginLeft: 15 }}
              onPress={() => navigation.goBack("HomeScreen")} // або 'HomeScreen' залежно від назви
            />
          ),
        })}
      />
    </Stack.Navigator>
    </Provider>
  );
}

export default AppNavigator;
