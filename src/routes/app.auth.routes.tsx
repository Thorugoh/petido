import React from "react";

import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { SignIn } from "../pages/SignIn";
import { Login } from "../pages/Login";

export type StackAuthRouteParams = {
  signin: undefined;
  login: undefined;
};

export type ScreenAuthProps<RouteName extends keyof StackAuthRouteParams> =
  NativeStackScreenProps<StackAuthRouteParams, RouteName>;

const { Navigator, Screen } =
  createNativeStackNavigator<StackAuthRouteParams>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="signin">
      <Screen name="signin" component={SignIn} />
      <Screen name="login" component={Login} />
    </Navigator>
  );
}
