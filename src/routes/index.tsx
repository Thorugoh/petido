import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppStackRoutes } from "./app.stack.routes";
import { View } from "react-native";
import { AuthRoutes } from "./app.auth.routes";
import { usePetidoContext } from "../context/PetidoContext";

export function Routes() {
  const { loggedUser } = usePetidoContext();
  return (
    <NavigationContainer>
      {loggedUser ? <AppStackRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
