import React from "react";
import { Drawer as PaperDrawer } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export function Drawer() {
  return (
    <SafeAreaView>
      <PaperDrawer.Section
        style={{ backgroundColor: "#F9F9F9", width: "100%", height: "100%" }}
      >
        <PaperDrawer.Item label="Configurações" />
      </PaperDrawer.Section>
    </SafeAreaView>
  );
}
