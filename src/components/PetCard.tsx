import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import FastImage from "react-native-fast-image";
import { StaticMap } from "./StaticMap";
import FoodIcon from "../../resources/pet_food.svg";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pet } from "../types";
import { useTheme, Button } from "react-native-paper";
import { usePetidoContext } from "../context/PetidoContext";
import { RFValue } from "react-native-responsive-fontsize";

type PetProps = {
  pet: Pet;
};

const sizes = {
  small: "Pequeno",
  medium: "Médio",
  large: "Grande",
};

const colors = {
  "1": "1 cor",
  "2": "2 cores",
  "3": "3 cores",
};

const situation = {
  abandoned: "Abandonado",
  bruised: "Machucado",
  lost: "Perdido",
};

export function PetCard({ pet }: PetProps) {
  const { colors: themeColors } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const { rescuePet } = usePetidoContext();

  async function confirmRescuePet() {
    setLoading(true);
    await rescuePet(pet);
    setLoading(false);
  }
  async function handleRescuePet(pet: Pet) {
    Alert.alert("Resgatar Pet", "Você confirma que retirou esse pet da rua?", [
      {
        text: "Não",
        style: "cancel",
      },
      { text: "Sim", onPress: confirmRescuePet },
    ]);
  }

  return (
    <View>
      <View style={styles.cardContainer}>
        <View style={{ height: RFValue(200) }}>
          <FastImage style={styles.image} source={{ uri: pet.photo }} />
        </View>
        <StaticMap
          style={{ width: "100%", height: 100, borderRadius: RFValue(10) }}
          show
          latitude={pet.location.latitude}
          longitude={pet.location.longitude}
        />
      </View>
      <View style={styles.containerDetails}>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FoodIcon fill={themeColors.primary} />
            <Text style={{ fontSize: RFValue(14) }}>{`Porte ${sizes[
              pet.size
            ].toLowerCase()}`}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons
              name="pets"
              color={themeColors.primary}
              size={RFValue(17)}
            />
            <Text
              style={{ fontSize: RFValue(14) }}
            >{`Aparenta estar ${situation[pet.situation].toLowerCase()}`}</Text>
          </View>
          <Text style={styles.dogDescription}>{pet.description}</Text>
        </View>

        <Button
          disabled={loading}
          loading={loading}
          mode="contained"
          onPress={() => handleRescuePet(pet)}
          color={themeColors.accent}
        >
          Resgatar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dogDescription: {
    fontSize: RFValue(14),
  },
  image: {
    width: "100%",
    height: "100%",
  },
  containerDetails: {
    flex: 1,
    paddingTop: RFValue(6),
    marginBottom: RFValue(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardContainer: {
    borderWidth: RFValue(1),
    marginTop: RFValue(15),
    borderColor: "#8d8d8d",
  },
  menuTitles: {
    fontSize: RFValue(18),
  },
});
