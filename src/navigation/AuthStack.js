import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../views/signup';
import LoginScreen from '../views/login';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen name='Signup' component={SignupScreen} />
    </Stack.Navigator>
  );
}
