
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import LoginScreen from "../screens/auth/Login";
import DigiGoldOnboarding from "../screens/onboard/Onboard"; 
const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false, 
      }}
    >
  <Stack.Screen name="Onboard" component={DigiGoldOnboarding} />
      <Stack.Screen name="Login" component={LoginScreen} />
    
    </Stack.Navigator>
  );
}
