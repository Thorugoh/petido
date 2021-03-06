import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pet, PetSituation } from "../../types";
import { DistanceDialog } from "../../components/DistanceDialog";
import { usePetidoContext } from "../../context/PetidoContext";
import { useTheme } from "react-native-paper";
import { PetCard } from "../../components/PetCard";
import { RFValue } from "react-native-responsive-fontsize";

type MenuFilter = PetSituation | "all";

const MENU_FILTER = [
  { key: "all", title: "TODOS" },
  { key: "lost", title: "PERDIDOS" },
  { key: "abandoned", title: "ABANDONADOS" },
  { key: "bruised", title: "MACHUCADOS" },
];

export function HomeScreen() {
  const {
    petsInDistance: pets,
    distanceFilter,
    setDistanceFilter,
    orderByDistance,
    setOrderByDistance,
  } = usePetidoContext();

  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<MenuFilter>("all");
  const [showDialog, setShowDialog] = useState(false);
  const { colors: themeColors } = useTheme();

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
            fontSize: RFValue(16),
          }}
        >
          {menuItem.title}
        </Text>

        {menuItem.key === selectedFilter && (
          <View
            style={{
              height: RFValue(3),
              width: "100%",
              backgroundColor: themeColors.primary,
            }}
          />
        )}
      </TouchableOpacity>
    );
  };

  function onDistanceFilterChange(distance: string) {
    setDistanceFilter(parseFloat(distance));
  }

  function handleCloseDialog() {
    setShowDialog(false);
  }

  const renderPet = (pet: Pet) => {
    return <PetCard pet={pet} />;
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
    <View style={styles.container}>
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={MENU_FILTER}
          renderItem={({ item }) => renderTopMenuFilter(item)}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Pressable style={styles.buttonOrderBy} onPress={changeOrderBy}>
          <MaterialIcons
            size={RFValue(20)}
            name="swap-vert"
            color={themeColors.accent}
          />
          <Text
            style={{
              fontWeight: "700",
              color: themeColors.accent,
              fontSize: RFValue(14),
            }}
          >
            {orderByDistance === "highest" ? `Mais distantes` : "Mais pr??ximos"}
          </Text>
        </Pressable>
        <Pressable
          style={styles.filterButton}
          onPress={() => setShowDialog(true)}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: RFValue(14),
              color: themeColors.accent,
            }}
          >
            {`Filtro de dist??ncia: ${distanceFilter}km`}
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
  container: {
    flex: 1,
    paddingHorizontal: RFValue(16),
  },
  dogDescription: {
    fontSize: RFValue(14),
  },
  filterButton: {
    maxWidth: RFValue(500),
    marginBottom: RFValue(10),
    alignSelf: "flex-end",
    alignItems: "center",
  },
  buttonOrderBy: {
    maxWidth: RFValue(500),
    marginBottom: RFValue(10),
    alignSelf: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  dogInfo: {},
  menuTitles: {
    fontSize: RFValue(18),
  },
});
