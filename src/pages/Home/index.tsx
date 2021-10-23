import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { StaticMap } from "../../components/StaticMap";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import {
  Pet,
  PetSituation,
  usePetidoContext,
} from "../../context/PetidoContext";
import FoodIcon from "../../../resources/pet_food.svg";
import FastImage from "react-native-fast-image";

type MenuFilter = PetSituation | "all";

export function HomeScreen() {
  const navigation = useNavigation();
  const { pets } = usePetidoContext();
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<MenuFilter>("all");
  const { colors: themeColors } = useTheme();

  const MENU_FILTER = [
    { key: "all", title: "TODOS" },
    { key: "lost", title: "PERDIDOS" },
    { key: "abandoned", title: "ABANDONADOS" },
    { key: "bruised", title: "MACHUCADOS" },
  ];

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

  const renderTopMenuFilter = (menuItem: {
    key: MenuFilter;
    title: string;
  }) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedFilter(menuItem.key)}
        style={{ marginRight: 8, paddingBottom: 15 }}
      >
        <Text
          style={{
            ...styles.menuTitles,
            fontWeight: menuItem.key === selectedFilter ? "bold" : "normal",
            color: themeColors.primary,
          }}
        >
          {menuItem.title}
        </Text>

        {menuItem.key === selectedFilter && (
          <View
            style={{
              height: 3,
              width: "100%",
              backgroundColor: themeColors.primary,
            }}
          />
        )}
      </TouchableOpacity>
    );
  };

  function openDetails(pet: Pet) {
    navigation.navigate("petDetails", { pet: pet });
  }

  const renderPet = (pet: Pet) => {
    return (
      <TouchableOpacity
        onPress={() => {
          openDetails(pet);
        }}
      >
        <View
          style={{
            borderWidth: 1,
            marginTop: 15,
            borderColor: "#8d8d8d",
          }}
        >
          <View style={{ height: 200 }}>
            <FastImage
              style={{
                width: "100%",
                height: "100%",
              }}
              source={{ uri: pet.photo }}
            />
          </View>
          <StaticMap
            style={{ width: "100%", height: 100, borderRadius: 10 }}
            show
            latitude={pet.location.latitude}
            longitude={pet.location.longitude}
          />
        </View>
        <View
          style={{
            flex: 1,
            paddingTop: 6,
            marginBottom: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FoodIcon fill={themeColors.primary} />
            <Text style={styles.dogInfo}>{`Porte ${sizes[
              pet.size
            ].toLowerCase()}`}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="pets" color={themeColors.primary} size={17} />
            <Text style={styles.dogInfo}>{`Aparenta estar ${situation[
              pet.situation
            ].toLowerCase()}`}</Text>
          </View>
          <Text style={styles.dogDescription}>{pet.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (pets) {
      const filtered = pets.filter((pet) => {
        return selectedFilter === "all"
          ? pet
          : pet.situation === selectedFilter;
      });
      setFilteredPets(filtered);
    }
  }, [selectedFilter, pets]);

  return (
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={MENU_FILTER}
          renderItem={({ item }) => renderTopMenuFilter(item)}
        />
      </View>

      <FlatList
        data={filteredPets}
        renderItem={({ item }) => renderPet(item)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dogDescription: {
    fontSize: 14,
  },
  dogInfo: {},
  menuTitles: {
    fontSize: 18,
  },
});
