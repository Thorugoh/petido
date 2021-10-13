import React from "react";
import { Platform, StyleSheet, ViewStyle } from "react-native";
import { TouchableRipple } from "react-native-paper";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

interface Props {
  show: boolean;
  latitude: number;
  longitude: number;
  style: ViewStyle;
  onPress?: () => void;
}

export const StaticMap = ({
  show,
  latitude,
  longitude,
  style,
  onPress,
}: Props) => {
  if (!show) return null;

  return (
    <TouchableRipple
      testID="google-content-image-map"
      onPress={onPress}
      style={style}
    >
      <MapView
        testID="mapview"
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : null}
        style={{ ...StyleSheet.absoluteFillObject }}
        pitchEnabled={false}
        rotateEnabled={false}
        scrollEnabled={false}
        zoomEnabled={false}
        zoomControlEnabled={false}
        liteMode={true}
        showsMyLocationButton={false}
        tintColor="#e94e0f"
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0035,
          longitudeDelta: 0.001,
        }}
      >
        <Marker testID="marker" coordinate={{ latitude, longitude }} />
      </MapView>
    </TouchableRipple>
  );
};
