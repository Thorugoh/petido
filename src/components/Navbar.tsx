import React from "react";
import { Image } from "react-native";
import { Appbar, IconButton } from "react-native-paper";
import { ScreenDrawerProps } from "../routes/app.drawer.routes";

type Props = ScreenDrawerProps<"tabs">;

export function NavBar({ navigation }: Props) {
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
