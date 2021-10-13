import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Appbar } from "react-native-paper";

interface Props {
  title: string;
}

export function Header({ title }: Props) {
  const navigation = useNavigation();
  return (
    <Appbar.Header style={{ backgroundColor: "transparent" }}>
      <Appbar.BackAction onPress={navigation.goBack} />
      <Appbar.Content
        title={title}
        titleStyle={{ color: "#333", fontSize: 16, fontWeight: "500" }}
      />
    </Appbar.Header>
  );
}
