import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, Appbar, IconButton } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
interface Props {
  title: string;
  onPressConfirm?: () => Promise<void>;
  showBack?: boolean;
  onBack?: () => void;
}

export function Header({
  title,
  onPressConfirm,
  onBack,
  showBack = true,
}: Props) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const handleOnPressConfirm = async () => {
    setLoading(true);
    onPressConfirm && (await onPressConfirm());
    setLoading(false);
  };

  function handleBack() {
    onBack ? onBack() : navigation.goBack();
  }

  return (
    <Appbar.Header style={{ backgroundColor: "transparent" }}>
      {showBack && <Appbar.BackAction onPress={handleBack} />}

      <Appbar.Content
        title={title}
        titleStyle={{ color: "#333", fontSize: RFValue(16), fontWeight: "500" }}
      />
      {onPressConfirm &&
        (!loading ? (
          <IconButton
            icon={"check"}
            color="#06D"
            onPress={handleOnPressConfirm}
          />
        ) : (
          <View style={{ marginRight: RFValue(10) }}>
            <ActivityIndicator size="small" color={"#06D"} />
          </View>
        ))}
    </Appbar.Header>
  );
}
