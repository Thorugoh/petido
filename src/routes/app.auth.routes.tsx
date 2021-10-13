import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { SignIn } from "../pages/SignIn";
import { Login } from "../pages/Login";

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator headerMode="none" initialRouteName="SignIn">
      <Screen name="SignIn" component={SignIn} />
      <Screen name="Login" component={Login} />
    </Navigator>
  );
}
