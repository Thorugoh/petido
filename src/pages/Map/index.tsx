import React from "react";
import { StyleSheet, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: RFValue(200),
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export function Map() {
  return <View style={styles.container}></View>;
}
