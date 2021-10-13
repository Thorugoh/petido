import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { PetidoProvider } from "./context/PetidoContext";
import { AuthProvider } from "./hooks/useAuth";
import { Routes } from "./routes/index";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#F4A604",
    accent: "yellow",
  },
};

export default function App() {
  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f8f8" }}>
    //   <StatusBar
    //     barStyle="dark-content"
    //     backgroundColor={theme.colors.background}
    //   />
    <PaperProvider theme={theme}>
      <AuthProvider>
        <PetidoProvider>
          <Routes />
        </PetidoProvider>
      </AuthProvider>
    </PaperProvider>
    // </SafeAreaView>
  );
}
