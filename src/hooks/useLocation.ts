import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { useState, useEffect } from "react";

function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState("");

  async function getCurrentPosition() {
    console.log("get position");

    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log({ status });

    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    setLocation(location);

    return location;
  }

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return {
    getCurrentPosition,
    location,
    errorMsg,
  };
}

export { useLocation };
