import React from "react";
import { StatusBar } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { PetidoProvider } from "./context/PetidoContext";
import { AuthProvider } from "./hooks/useAuth";
import { Routes } from "./routes/index";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#F4A604",
    secundary: "#D43264",
    accent: "yellow",
  },
};

export default function App() {
  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#f6f8f8" }} />
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />
      <PaperProvider theme={theme}>
        <AuthProvider>
          <PetidoProvider>
            <Routes />
          </PetidoProvider>
        </AuthProvider>
      </PaperProvider>
    </>
  );
}
