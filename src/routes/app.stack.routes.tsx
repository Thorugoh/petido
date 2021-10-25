import React from "react";
import { Camera } from "../components/Camera";
import { AppDrawerRoutes } from "./app.drawer.routes";

import { createStackNavigator } from "@react-navigation/stack";
import { CameraCapturedPicture } from "expo-camera";
import { PetDetails } from "../pages/PetDetails";
import { Pet } from "../context/PetidoContext";
import { ProfileConfig } from "../pages/ProfileConfig";
import { LoadInitial } from "../pages/LoadInitial";

type StackRouteParams = {
  home: undefined;
  camera: { save: (capturedPhoto: CameraCapturedPicture) => void };
  petDetails: { pet: Pet };
  profileConfig: undefined;
  initial: undefined;
};

const { Navigator, Screen } = createStackNavigator<StackRouteParams>();

export function AppStackRoutes() {
  return (
    <Navigator headerMode="none">
      <Screen
        name="initial"
        component={LoadInitial}
        options={{ headerShown: false }}
      />
      <Screen
        name="home"
        component={AppDrawerRoutes}
        options={{ headerShown: false }}
      />
      <Screen name="camera" component={Camera} />
      <Screen name="petDetails" component={PetDetails} />
      <Screen name="profileConfig" component={ProfileConfig} />
    </Navigator>
  );
}
