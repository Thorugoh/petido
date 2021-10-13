import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../pages/Home";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Register } from "../pages/Register";
import { useTheme } from "react-native-paper";

const Tab = createBottomTabNavigator();

export function AppTabRoutes() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          }
          if (route.name === "Map") {
            iconName = "map";
          }
          if (route.name === "Registrar") {
            iconName = "add";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Registrar" component={Register} />
    </Tab.Navigator>
  );
}
