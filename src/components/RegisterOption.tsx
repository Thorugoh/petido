import React from "react";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, RadioButton, useTheme } from "react-native-paper";

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
    <View style={{ ...styles.container, marginTop: 16 }}>
      <Text style={{ marginBottom: 4 }}>{title}</Text>

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
              <Text>{option.title}</Text>
            </View>
          ))}
        </View>
      </RadioButton.Group>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderColor: "#d8d8d8",
    borderWidth: 1,
    borderRadius: 5,
  },
});
