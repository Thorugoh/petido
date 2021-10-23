import { useFocusEffect } from "@react-navigation/core";
import React, { useState, useCallback, useEffect } from "react";
import { Dimensions, Pressable, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";
import { database } from "../../../config/firebaseconfig";
import { Pet, usePetidoContext } from "../../../context/PetidoContext";
import FastImage from "react-native-fast-image";

const WIDTH = Dimensions.get("window").width;
const PHOTO_BOX_SIZE = (WIDTH - 10) * 0.3333;
const SPACE_BETWEEN = 10 / 4;

export function MyProfile({ navigation }) {
  const { colors } = useTheme();
  const { loggedUser } = usePetidoContext();
  const [pets, setPets] = useState<Pet[]>([]);
  const [currentInfos, setCurrentInfos] =
    useState<{ name: string; username: string }>();

  const getCurrentInfos = () => {
    const userRef = database.ref(`users/${loggedUser.uid}`);
    const firebasePets = userRef.on("value", (user) => {
      const userConfig = user.val() ?? {};
      console.log(userConfig);

      setCurrentInfos(userConfig);
    });
  };

  const getRegisteredPetsFromUser = async () => {
    const petsRef = database
      .ref(`user_pets/${loggedUser.uid}/pets`)
      .on("value", () => {
        const petsRef = database
          .ref(`user_pets/${loggedUser.uid}/pets`)
          .on("value", (pet) => {
            const databasePets = pet.val();
            const firebasePets = databasePets ?? {};

            const parsedPets = Object.entries(firebasePets).map(
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
      });
  };

  useEffect(() => {
    getCurrentInfos();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getRegisteredPetsFromUser();
    }, [])
  );

  function handleEditPerfil() {
    navigation.navigate("profileConfig");
  }

  return (
    <View style={{ flex: 1 }}>
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
        />
        <View style={{ marginLeft: 8 }}>
          <Text style={{ fontWeight: "700" }}>
            {currentInfos?.name || loggedUser.email}
          </Text>
          <Text>{`Pets Localizados: ${pets.length}`}</Text>
          <Text>Pets Adotados: 0</Text>
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
          backgroundColor: colors.secundary,
        }}
      >
        <Pressable onPress={handleEditPerfil}>
          <Text style={{ color: "#FFF" }}>Edit Profile</Text>
        </Pressable>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <TouchableOpacity style={{ marginRight: 8, paddingBottom: 15 }}>
          <Text style={{ fontSize: 16 }}>Postados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: 8, paddingBottom: 15 }}>
          <Text style={{ fontSize: 16 }}>Adotados</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {pets &&
          pets.map((pet) => {
            return (
              <View
                key={pet.id}
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
                    priority: FastImage.priority.normal,
                  }}
                />
              </View>
            );
          })}
      </View>
    </View>
  );
}
