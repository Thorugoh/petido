import React from "react";
import { Image, View } from "react-native";
import { Appbar, IconButton } from "react-native-paper";

export function NavBar({ navigation }) {
  return (
    <Appbar.Header
      style={{
        marginTop: 0,
        backgroundColor: "#F9F9F9",
        elevation: 0,
        justifyContent: "space-between",
      }}
    >
      <IconButton
        icon="menu"
        color="#808080"
        size={30}
        onPress={() => navigation.openDrawer()}
      />
      <Image
        source={require("../../resources/petido.png")}
        fadeDuration={0}
        style={{ width: 100, height: 30, resizeMode: "contain" }}
      />
    </Appbar.Header>
  );
}
