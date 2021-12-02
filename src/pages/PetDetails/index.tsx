import React from "react";
import { Image, View } from "react-native";
import { Text } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
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
          paddingTop: RFValue(5),
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: pet.photo }}
          style={{ width: "95%", height: "40%", borderRadius: RFValue(5) }}
        />
        <StaticMap
          style={{ width: "95%", height: RFValue(100) }}
          show
          latitude={pet.location.latitude}
          longitude={pet.location.longitude}
        />
        <View>
          <Text style={{ fontSize: RFValue(14) }}>{pet.size}</Text>
          <Text style={{ fontSize: RFValue(14) }}>{pet.situation}</Text>
        </View>
      </View>
    </>
  );
}
