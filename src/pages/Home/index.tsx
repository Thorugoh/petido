import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Button, useTheme } from "react-native-paper";
import { StaticMap } from "../../components/StaticMap";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import {
  Pet,
  PetSituation,
  usePetidoContext,
} from "../../context/PetidoContext";
import FoodIcon from "../../../resources/pet_food.svg";
import { DistanceDialog } from "../../components/DistanceDialog";
import FastImage from "react-native-fast-image";

type MenuFilter = PetSituation | "all";

export function HomeScreen() {
  const navigation = useNavigation();
  const {
    petsInDistance: pets,
    distanceFilter,
    setDistanceFilter,
    orderByDistance,
    setOrderByDistance,
    rescuePet,
  } = usePetidoContext();
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<MenuFilter>("all");
  const [showDialog, setShowDialog] = useState(false);
  const [rescuePetLoading, setRescuePetLoading] = useState<string[]>([]);
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
        style={{ marginRight: 8, paddingBottom: 5 }}
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

  function onDistanceFilterChange(distance: string) {
    setDistanceFilter(parseFloat(distance));
  }

  function handleCloseDialog() {
    setShowDialog(false);
  }

  async function handleRescuePet(pet: Pet) {
    setRescuePetLoading((current) => [...current, pet.id]);

    await rescuePet(pet);

    setRescuePetLoading((current) => current.filter((id) => id !== pet.id));
  }

  function isLoading(petId: string) {
    return !!rescuePetLoading.find((id) => petId === id);
  }

  const renderPet = (pet: Pet) => {
    return (
      <View>
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
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FoodIcon fill={themeColors.primary} />
              <Text style={styles.dogInfo}>{`Porte ${sizes[
                pet.size
              ].toLowerCase()}`}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons
                name="pets"
                color={themeColors.primary}
                size={17}
              />
              <Text style={styles.dogInfo}>{`Aparenta estar ${situation[
                pet.situation
              ].toLowerCase()}`}</Text>
            </View>
            <Text style={styles.dogDescription}>{pet.description}</Text>
          </View>

          <Button
            disabled={isLoading(pet.id)}
            loading={isLoading(pet.id)}
            mode="contained"
            onPress={() => handleRescuePet(pet)}
            color={themeColors.secundary}
          >
            Resgatar
          </Button>
          {/* <Pressable
            style={{
              borderRadius: 5,
              backgroundColor: themeColors.secundary,
              padding: 10,
              marginRight: 10,
            }}
            onPress={() => setShowDialog(true)}
          >
            <Text style={{ fontWeight: "700", color: "#FFF" }}>Resgatar</Text>
          </Pressable> */}
        </View>
      </View>
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

  function changeOrderBy() {
    setOrderByDistance((current) =>
      current === "highest" ? "lowest" : "highest"
    );
  }

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
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Pressable
          style={{
            maxWidth: 500,
            marginBottom: 10,
            alignSelf: "flex-end",
            alignItems: "center",
            flexDirection: "row",
          }}
          onPress={changeOrderBy}
        >
          <MaterialIcons
            size={20}
            name="swap-vert"
            color={themeColors.secundary}
          />
          <Text style={{ fontWeight: "700", color: themeColors.secundary }}>
            {orderByDistance === "highest" ? `Mais distantes` : "Mais próximos"}
          </Text>
        </Pressable>
        <Pressable
          style={{
            maxWidth: 500,
            marginBottom: 10,
            alignSelf: "flex-end",
            alignItems: "center",
          }}
          onPress={() => setShowDialog(true)}
        >
          <Text style={{ fontWeight: "700", color: themeColors.secundary }}>
            {`Filtro de distância: ${distanceFilter}km`}
          </Text>
        </Pressable>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredPets}
        renderItem={({ item }) => renderPet(item)}
      />
      {showDialog && (
        <DistanceDialog
          onDismiss={handleCloseDialog}
          onConfirm={onDistanceFilterChange}
        />
      )}
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
