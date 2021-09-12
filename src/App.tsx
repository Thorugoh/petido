import { NativeBaseProvider } from "native-base";
import React from "react";
import { AppRoutes } from "./routes";

export default function App() {
  return (
    <NativeBaseProvider>
      <AppRoutes />
    </NativeBaseProvider>
  );
}
