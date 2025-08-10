import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import CalculatorScreen from "../screens/CalculatorScreen";
import GoalsScreen from "../screens/GoalsScreen";
import TipsScreen from "../screens/TipsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CustomHeader from "../components/Header";
import { store } from "../store/store";
import { Provider } from "react-redux";

import { GlobalStyles } from "../constants/colors";

const BottomTabs = createBottomTabNavigator();

function BottomTabsNavigator({ navigation }) {
  return (
    <Provider store={store}>
      <BottomTabs.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.header },
          headerTintColor: "white",
          tabBarStyle: {
            backgroundColor: GlobalStyles.colors.tabBarBackground,
          },
          tabBarActiveTintColor: GlobalStyles.colors.activeIcon,
          tabBarInactiveTintColor: GlobalStyles.colors.inactiveIcon,
          tabBarLabelStyle: { fontSize: 9 },
        }}
      >
        <BottomTabs.Screen
          name="Головна"
          component={HomeScreen}
          options={{
            headerTitle: () => <CustomHeader />,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="Калькулятор"
          component={CalculatorScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calculator" size={size} color={color} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="Цілі"
          component={GoalsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="checkmark-done" size={size} color={color} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="Поради"
          component={TipsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bulb" size={size} color={color} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="Налаштування"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      </BottomTabs.Navigator>
    </Provider>
  );
}

export default BottomTabsNavigator;
