import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../pages/Home";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Register } from "../pages/Register";
import { useTheme } from "react-native-paper";
import { MyProfile } from "../pages/MyProfile";
import AddIcon from "../../resources/add_pet.svg";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type TabsRouteParams = {
  home: undefined;
  profile: undefined;
  register: undefined;
};

const Tab = createBottomTabNavigator<TabsRouteParams>();

export type ScreenTabProps<RouteName extends keyof TabsRouteParams> =
  NativeStackScreenProps<TabsRouteParams, RouteName>;

export function AppTabRoutes() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: "home" | "person" | undefined = undefined;
          if (route.name === "home") {
            iconName = "home";
          }
          if (route.name === "register") {
            // iconName = "add";
            return <AddIcon width={size} height={size} fill={color} />;
          }
          if (route.name === "profile") {
            iconName = "person";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="register" component={Register} />
      <Tab.Screen name="profile" component={MyProfile} />
    </Tab.Navigator>
  );
}
