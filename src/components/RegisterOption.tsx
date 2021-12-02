import React from "react";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, RadioButton, useTheme } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  title: string;
  options: { title: string; key: string }[];
  extraInfo?: string;
  getSelected: (option: string) => void;
}

export function RegisterOption({
  title,
  options,
  extraInfo,
  getSelected,
  ...rest
}: Props) {
  const [value, setValue] = useState(options[0].key);
  const { colors } = useTheme();

  return (
    <View style={{ ...styles.container, marginTop: RFValue(16) }}>
      <Text style={{ fontSize: RFValue(14), marginBottom: RFValue(4) }}>
        {title}
      </Text>

      <RadioButton.Group
        onValueChange={(nextValue) => {
          setValue(nextValue);
          getSelected(nextValue);
        }}
        value={value}
      >
        <View style={{ flexDirection: "row" }}>
          {options.map((option) => (
            <View
              key={option.key}
              style={{ alignItems: "center", flexDirection: "row" }}
            >
              <RadioButton color={colors.primary} value={option.key} />
              <Text style={{ fontSize: RFValue(14) }}>{option.title}</Text>
            </View>
          ))}
        </View>
      </RadioButton.Group>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: RFValue(8),
    borderColor: "#d8d8d8",
    borderWidth: RFValue(1),
    borderRadius: RFValue(5),
  },
});
