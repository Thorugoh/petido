import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View } from "react-native";
import { Button, Drawer as PaperDrawer } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePetidoContext } from "../context/PetidoContext";

export function Drawer() {
  const { setLoggedUser } = usePetidoContext();

  async function logout() {
    await AsyncStorage.removeItem("@petido:user");
    setLoggedUser(null);
  }

  return (
    <SafeAreaView>
      <PaperDrawer.Section
        style={{ backgroundColor: "#F9F9F9", width: "100%", height: "100%" }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            marginVertical: RFValue(15),
          }}
        >
          <Button
            mode="text"
            onPress={logout}
            labelStyle={{ color: "#4D4D4D" }}
          >
            Sair
          </Button>
        </View>
      </PaperDrawer.Section>
    </SafeAreaView>
  );
}
