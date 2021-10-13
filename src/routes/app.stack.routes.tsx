import React from "react";
import { Camera } from "../components/Camera";
import { AppDrawerRoutes } from "./app.drawer.routes";

import { createStackNavigator } from "@react-navigation/stack";
import { CameraCapturedPicture } from "expo-camera";
import { PetDetails } from "../pages/PetDetails";
import { Pet } from "../context/PetidoContext";
import { View } from "react-native";

type StackRouteParams = {
  home: undefined;
  camera: { save: (capturedPhoto: CameraCapturedPicture) => void };
  petDetails: { pet: Pet };
};

const { Navigator, Screen } = createStackNavigator<StackRouteParams>();

export function AppStackRoutes() {
  return (
    <Navigator headerMode="none">
      <Screen
        name="home"
        component={AppDrawerRoutes}
        options={{ headerShown: false }}
      />
      <Screen name="camera" component={Camera} />
      <Screen name="petDetails" component={PetDetails} />
    </Navigator>
  );
}
