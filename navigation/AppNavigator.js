import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator
    screenOptions={{
          // Колір фону для всіх екранів
          cardStyle: { backgroundColor: '#EFF9FC' },
        }}>
      <Stack.Screen
        name="Tabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
