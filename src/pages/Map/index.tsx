import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 200,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export function Map() {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        pitchEnabled={false}
        rotateEnabled={false}
        scrollEnabled={false}
        zoomEnabled={false}
        zoomControlEnabled={false}
        liteMode={true}
        minZoomLevel={100}
        showsMyLocationButton={false}
        showsUserLocation
        region={{
          latitude: -27.6026605,
          longitude: -48.6366921,
          latitudeDelta: 0.003,
          longitudeDelta: 0.001,
        }}
      >
        <Marker
          coordinate={{ latitude: -27.6026605, longitude: -48.6366921 }}
        />
        <Marker
          coordinate={{ latitude: -27.6026605, longitude: -48.6366921 }}
        />
      </MapView>
    </View>
  );
}
