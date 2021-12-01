import { useFocusEffect, useNavigation } from "@react-navigation/core";
import React, { useState, useCallback, useEffect } from "react";
import { Dimensions, Pressable, View } from "react-native";
import FastImage from "react-native-fast-image";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";
import { database } from "../../config/firebaseconfig";
import { usePetidoContext } from "../../context/PetidoContext";
import { Pet } from "../../types";

const WIDTH = Dimensions.get("window").width;
const PHOTO_BOX_SIZE = (WIDTH - 10) * 0.3333;
const SPACE_BETWEEN = 10 / 4;

export function MyProfile() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { loggedUser } = usePetidoContext();
  const [pets, setPets] = useState<Pet[]>([]);
  const [rescuedPets, setRescuedPets] = useState<Pet[]>([]);
  const [currentInfos, setCurrentInfos] =
    useState<{ name: string; username: string }>();
  const [selectedMenu, setSelectedMenu] = useState<
    "registeredPets" | "rescuedPets"
  >("registeredPets");

  const getCurrentInfos = () => {
    const userRef = database.ref(`users/${loggedUser.uid}`);
    const firebasePets = userRef.on("value", (user) => {
      const userConfig = user.val() ?? {};
      console.log(userConfig);

      setCurrentInfos(userConfig);
    });
  };

  const getRescuedPetsFromUser = async () => {
    database
      .ref(`user_pets/${loggedUser.uid}/rescued_pets`)
      .on("value", (pet) => {
        const databasePets = pet.val();
        const firebasePets = databasePets ?? {};

        const parsedPets = Object.entries<Pet>(firebasePets).map(
          ([key, value]) => {
            return {
              id: key,
              colors: value.colors,
              description: value.description,
              location: value.location,
              photo: value.photo,
              situation: value.situation,
              size: value.size,
            };
          }
        );

        setRescuedPets(parsedPets);
      });
  };

  const getRegisteredPetsFromUser = async () => {
    database.ref(`user_pets/${loggedUser.uid}/pets`).on("value", (pet) => {
      const databasePets = pet.val();
      const firebasePets = databasePets ?? {};

      const parsedPets = Object.entries<Pet>(firebasePets).map(
        ([key, value]) => {
          return {
            id: key,
            colors: value.colors,
            description: value.description,
            location: value.location,
            photo: value.photo,
            situation: value.situation,
            size: value.size,
          };
        }
      );

      setPets(parsedPets);
    });
  };

  useEffect(() => {
    getCurrentInfos();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getRegisteredPetsFromUser();
      getRescuedPetsFromUser();
    }, [])
  );

  function handleEditPerfil() {
    navigation.navigate("profileConfig", { firstLogin: false });
  }

  function renderHeader() {
    return (
      <>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: 70,
              width: 70,
              backgroundColor: colors.primary,
              borderRadius: 35,
            }}
          >
            <FastImage
              style={{ width: "100%", height: "100%", borderRadius: 35 }}
              source={{ uri: currentInfos?.photo }}
            />
          </View>
          <View style={{ marginLeft: 8 }}>
            <Text style={{ fontWeight: "700" }}>
              {currentInfos?.name || loggedUser.email}
            </Text>
            <Text>{`Pets Localizados: ${pets.length}`}</Text>
            <Text>Pets Resgatados: {rescuedPets.length}</Text>
          </View>
        </View>
        <View
          style={{
            marginLeft: 5,
            width: 90,
            padding: 3,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
            borderRadius: 5,
            backgroundColor: colors.accent,
          }}
        >
          <Pressable onPress={handleEditPerfil}>
            <Text style={{ color: "#FFF" }}>Edit Profile</Text>
          </Pressable>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity
            onPress={() => setSelectedMenu("registeredPets")}
            style={{ marginRight: 8, marginBottom: 15 }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight:
                  selectedMenu === "registeredPets" ? "700" : undefined,
                color:
                  selectedMenu === "registeredPets" ? colors.accent : "#4D4D4D",
              }}
            >
              Postados
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedMenu("rescuedPets")}
            style={{ marginRight: 8, paddingBottom: 15 }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: selectedMenu === "rescuedPets" ? "700" : undefined,
                color:
                  selectedMenu === "rescuedPets" ? colors.accent : "#4D4D4D",
              }}
            >
              Resgatados
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  function renderPhotos(pet: Pet) {
    return (
      <View
        style={{
          marginBottom: SPACE_BETWEEN,
          marginLeft: SPACE_BETWEEN,
          width: PHOTO_BOX_SIZE,
          height: PHOTO_BOX_SIZE,
        }}
      >
        <FastImage
          style={{ width: "100%", height: "100%" }}
          source={{
            uri: pet.photo,
            priority: FastImage.priority.high,
          }}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={renderHeader()}
        keyExtractor={(item) => item.id}
        numColumns={3}
        data={selectedMenu === "registeredPets" ? pets : rescuedPets}
        renderItem={({ item }) => renderPhotos(item)}
      />
    </View>
  );
}
