import React, { useEffect, useState } from "react";
import { Dimensions, Image, StatusBar, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";
import firebase from "../../../config/firebaseconfig";
import { Pet, usePetidoContext } from "../../../context/PetidoContext";

const WIDTH = Dimensions.get("window").width;
const PHOTO_BOX_SIZE = (WIDTH - 10) * 0.3333;
const SPACE_BETWEEN = 10 / 4;

export function MyProfile() {
  const { colors } = useTheme();
  const database = firebase.firestore();
  const { loggedUser } = usePetidoContext();
  const [pets, setPets] = useState<Pet[]>([]);

  const getRegisteredPetsFromUser = () => {
    database
      .collection("user_pets")
      .doc(loggedUser.uid)
      .collection("pets")
      .onSnapshot((query) => {
        const list: Pet[] = [];
        query.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });
        setPets(list);
      });
  };

  useEffect(() => {
    getRegisteredPetsFromUser();
  }, []);

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
          <Text style={{ fontWeight: "500" }}>Victor Hugo</Text>
          <Text>Pets Localizados: 2</Text>
          <Text>Pets Adotados: 0</Text>
        </View>
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
                style={{
                  marginBottom: SPACE_BETWEEN,
                  marginLeft: SPACE_BETWEEN,
                  width: PHOTO_BOX_SIZE,
                  height: PHOTO_BOX_SIZE,
                }}
              >
                <Image
                  style={{ width: "100%", height: "100%" }}
                  source={{ uri: pet.photo }}
                />
              </View>
            );
          })}
      </View>
    </View>
  );
}
