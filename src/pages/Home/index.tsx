import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import { Text, View, ImageBackground, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import {
  Pet,
  PetSituation,
  usePetidoContext,
} from "../../context/PetidoContext";

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
    one: "1 cor",
    two: "2 cores",
    three: "3 cores",
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
        <View style={{ marginTop: 6, height: 120 }}>
          <ImageBackground
            style={{ width: "100%", height: "100%" }}
            imageStyle={{ borderRadius: 10 }}
            source={{ uri: pet.photo.uri }}
          >
            <View style={{ flex: 1, paddingLeft: 6, paddingTop: 6 }}>
              <Text style={styles.dogDescription}>Cachorro caramelo</Text>

              <Text style={styles.dogInfo}>
                {`${colors[pet.color]} - ${sizes[pet.size]} \n${
                  situation[pet.situation]
                }`}
              </Text>
            </View>
          </ImageBackground>
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
    color: "#FFF",
    fontSize: 25,
    marginBottom: 5,
  },
  dogInfo: {
    color: "#FFF",
  },
  menuTitles: {
    fontSize: 18,
  },
});
