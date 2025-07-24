import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import PlannerScreen from './screens/PlannerScreen';
import TodoScreen from './screens/TodoScreen';
import { requestNotificationPermissions } from './storage/notifications';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Todo" component={TodoScreen} />
        <Stack.Screen name="Planner" component={PlannerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

useEffect(() => {
  const checkPermissions = async () => {
    try {
      await requestNotificationPermissions();
    } catch (error) {
      console.error('Notification permission error:', error);
    }
  };
  checkPermissions();
}, []);