import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../pages/Home";
import { Map } from "../pages/Map";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Register } from "../pages/Register";

const Tab = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
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
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Registrar" component={Register} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
