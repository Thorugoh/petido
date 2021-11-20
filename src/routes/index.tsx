import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppStackRoutes } from "./app.stack.routes";
import { AuthRoutes } from "./app.auth.routes";
import { usePetidoContext } from "../context/PetidoContext";
import { auth } from "../config/firebaseconfig";
import { ActivityIndicator } from "react-native-paper";

export function Routes() {
  const { loggedUser, setLoggedUser } = usePetidoContext();
  const [initializing, setInitializing] = useState<boolean>(true);

  function onAuthStateChanged() {
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);
    return unsubscribe(); // unsubscribe on unmount
  }, []);

  if (initializing) return <ActivityIndicator size="large" />;

  return (
    <NavigationContainer>
      {loggedUser ? <AppStackRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
