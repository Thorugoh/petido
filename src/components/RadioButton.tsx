import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

type Props = {
  options: string[];
  selected: string;
};

export function RadioButton({ options, selected }: Props) {
  return (
    <View>
      {options.map((option) => (
        <TouchableOpacity key={option}>
          <Text style={{ fontSize: RFValue(14) }}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
