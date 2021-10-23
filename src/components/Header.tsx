import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Appbar, IconButton } from "react-native-paper";
interface Props {
  title: string;
  onPressConfirm?: () => void;
}

export function Header({ title, onPressConfirm }: Props) {
  const navigation = useNavigation();
  const handleOnPressConfirm = () => {
    onPressConfirm && onPressConfirm();
  };
  return (
    <Appbar.Header style={{ backgroundColor: "transparent" }}>
      <Appbar.BackAction onPress={navigation.goBack} />
      <Appbar.Content
        title={title}
        titleStyle={{ color: "#333", fontSize: 16, fontWeight: "500" }}
      />
      {onPressConfirm && (
        <IconButton icon="check" color="#06D" onPress={handleOnPressConfirm} />
      )}
    </Appbar.Header>
  );
}
