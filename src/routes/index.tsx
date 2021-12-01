import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppStackRoutes, StackRouteParams } from "./app.stack.routes";
import { AuthRoutes, StackAuthRouteParams } from "./app.auth.routes";
import { usePetidoContext } from "../context/PetidoContext";
import { ActivityIndicator } from "react-native-paper";
import { TabsRouteParams } from "./app.tab.routes";

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends StackRouteParams,
        StackAuthRouteParams,
        TabsRouteParams {}
  }
}

export function Routes() {
  const { loggedUser } = usePetidoContext();

  if (loggedUser === undefined) return <ActivityIndicator size="large" />;

  return (
    <NavigationContainer>
      {loggedUser ? <AppStackRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
