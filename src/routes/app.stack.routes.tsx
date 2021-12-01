import React from "react";
import { Camera } from "../components/Camera";
import { AppDrawerRoutes, DrawerRouteParams } from "./app.drawer.routes";

import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { CameraCapturedPicture } from "expo-camera";
import { PetDetails } from "../pages/PetDetails";
import { ProfileConfig } from "../pages/ProfileConfig";
import { LoadInitial } from "../pages/LoadInitial";
import { Pet } from "../types";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/core";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { StackScreenProps } from "@react-navigation/stack";

export type StackRouteParams = {
  home: NavigatorScreenParams<DrawerRouteParams>;
  camera: { save: (capturedPhoto: CameraCapturedPicture) => void };
  petDetails: { pet: Pet };
  profileConfig: { firstLogin: boolean };
  initial: undefined;
};

// export type ScreenProps<RouteName extends keyof StackRouteParams> =
//   NativeStackScreenProps<StackRouteParams, RouteName>;

export type ScreenProps<RouteName extends keyof StackRouteParams> =
  CompositeScreenProps<
    StackScreenProps<StackRouteParams, RouteName>,
    DrawerScreenProps<DrawerRouteParams>
  >;

const { Navigator, Screen } = createNativeStackNavigator<StackRouteParams>();

export function AppStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
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
