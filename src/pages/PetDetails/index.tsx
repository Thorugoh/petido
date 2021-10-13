import React from "react";
import { Image, View } from "react-native";
import { Text, Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components/Header";
import { StaticMap } from "../../components/StaticMap";
import { Pet } from "../../context/PetidoContext";

interface Props {
  pet: Pet;
}

export function PetDetails({ route }) {
  const { pet } = route.params as Props;
  return (
    <>
      <Header title="Detalhes" />
      <View
        style={{
          flex: 1,
          paddingTop: 5,
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: pet.photo.uri }}
          style={{ width: "95%", height: "40%", borderRadius: 5 }}
        />
        <StaticMap
          style={{ width: "95%", height: 100 }}
          show
          latitude={pet.location.latitude}
          longitude={pet.location.longitude}
        />
        <View>
          <Text style={{}}>{pet.color}</Text>
          <Text style={{}}>{pet.size}</Text>
          <Text style={{}}>{pet.situation}</Text>
        </View>
      </View>
    </>
  );
}
