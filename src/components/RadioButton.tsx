import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  options: string[];
  selected: string;
};

export function RadioButton({ options, selected }: Props) {
  return (
    <View>
      {options.map((option) => (
        <TouchableOpacity key={option} >
          <Text>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
