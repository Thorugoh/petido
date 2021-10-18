import React, { useState } from "react";
import { RegisterOption } from "../../components/RegisterOption";
import { Button, Title, useTheme, IconButton } from "react-native-paper";
import { Alert, Image, View } from "react-native";
import { CameraCapturedPicture } from "expo-camera";
import {
  Pet,
  PetColor,
  PetSituation,
  PetSize,
} from "../../context/PetidoContext";
import { useLocation } from "../../hooks/useLocation";
import { useNavigation } from "@react-navigation/core";
import { TextInput } from "react-native-gesture-handler";
import { useRegister } from "../../hooks/useRegister";

export function Register() {
  // const [showCamera, setShowCamera] = useState(false);
  const navigation = useNavigation();
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);
  const [size, setSize] = useState<PetSize>("small");
  const [color, setColor] = useState<PetColor>("one");
  const [situation, setSituation] = useState<PetSituation>("abandoned");
  const { getCurrentPosition } = useLocation();

  const { registerPet } = useRegister();

  const { colors } = useTheme();

  const registerColorOptions = [
    {
      title: "1 cor",
      key: "1",
    },
    {
      title: "2 cor",
      key: "2",
    },
    {
      title: "3 cor",
      key: "3",
    },
  ];

  const registerSizeOptions = [
    {
      title: "Pequeno",
      key: "small",
    },
    {
      title: "Médio",
      key: "medium",
    },
    {
      title: "Grande",
      key: "large",
    },
  ];

  const registerSituationOptions = [
    {
      title: "Abandonado",
      key: "abandoned",
    },
    {
      title: "Perdido",
      key: "lost",
    },
    {
      title: "Machucado",
      key: "bruised",
    },
  ];

  function handleSavePhoto(capturedPhoto: CameraCapturedPicture) {
    setPhoto(capturedPhoto);
  }

  function clearForm() {
    setSize("small");
    setColor("one");
    setSituation("abandoned");
    setPhoto(null);
  }

  async function handleRegisterPet() {
    if (!description) {
      Alert.alert(
        "Descriçao não encontrada",
        "É necesário adicionar uma descrição."
      );
    }
    if (!size || !color || !situation || !photo) return;

    const location = await getCurrentPosition();
    if (!location) return;

    const pet: Pet = {
      size,
      description,
      color,
      situation,
      photo: photo.uri,
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    };

    await registerPet(pet);
    clearForm();
  }

  function showCamera() {
    navigation.navigate("camera", { save: handleSavePhoto });
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      <>
        <Title style={{ color: colors.primary }}>Registrar</Title>
        <View style={{ marginBottom: 40 }}>
          <RegisterOption
            getSelected={setSize as (opt: string) => void}
            title="Porte:"
            options={registerSizeOptions}
          />

          <RegisterOption
            getSelected={setColor as (opt: string) => void}
            title="Cor:"
            options={registerColorOptions}
          />

          <RegisterOption
            getSelected={setSituation as (opt: string) => void}
            title="Situação:"
            options={registerSituationOptions}
          />
          <TextInput
            onChangeText={setDescription}
            multiline
            placeholder="Adicione uma breve descrição"
            style={{
              borderColor: "#d8d8d8",
              borderWidth: 1,
              borderRadius: 5,
              height: 80,
              paddingLeft: 5,
              maxHeight: 80,
              marginTop: 20,
            }}
          />
        </View>

        <View
          style={{
            borderWidth: !photo ? 1 : undefined,
            borderColor: colors.primary,
            width: 60,
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            marginBottom: 50,
          }}
        >
          {!photo ? (
            <IconButton
              icon="camera"
              size={40}
              onPress={showCamera}
              color={colors.primary}
            />
          ) : (
            <Image
              style={{ height: "100%", width: "100%", borderRadius: 5 }}
              source={{ uri: photo.uri }}
            />
          )}
        </View>

        <Button
          color={colors.secundary}
          labelStyle={{ color: "#FFF" }}
          mode="contained"
          onPress={handleRegisterPet}
        >
          Confirmar
        </Button>
      </>
    </View>
  );
}
