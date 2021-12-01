import React from "react";
import { Image, View } from "react-native";
import { Text } from "react-native-paper";
import { Header } from "../../components/Header";
import { StaticMap } from "../../components/StaticMap";
import { ScreenProps } from "../../routes/app.stack.routes";

type Props = ScreenProps<"petDetails">;

export function PetDetails({ route }: Props) {
  const { pet } = route.params;
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
          source={{ uri: pet.photo }}
          style={{ width: "95%", height: "40%", borderRadius: 5 }}
        />
        <StaticMap
          style={{ width: "95%", height: 100 }}
          show
          latitude={pet.location.latitude}
          longitude={pet.location.longitude}
        />
        <View>
          <Text style={{}}>{pet.size}</Text>
          <Text style={{}}>{pet.situation}</Text>
        </View>
      </View>
    </>
  );
}
