import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import {
  Alert,
  BackHandler,
  Platform,
  Pressable,
  View,
  ViewStyle,
  Image,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";
import { Header } from "../../components/Header";
import { database, storage } from "../../config/firebaseconfig";
import { usePetidoContext } from "../../context/PetidoContext";
import uuid from "react-native-uuid";

import * as ImagePicker from "expo-image-picker";
import { StackActions, useNavigation } from "@react-navigation/native";
import { ScreenProps } from "../../routes/app.stack.routes";
import { RFValue } from "react-native-responsive-fontsize";

interface FieldProps {
  label: string;
  placeholder: string;
  value?: string;
  setValue?: Dispatch<SetStateAction<string>>;
  style?: ViewStyle;
}

function Field({ label, placeholder, value, setValue, style }: FieldProps) {
  return (
    <View style={[style, { flexDirection: "column" }]}>
      <View style={{ width: "15%" }}>
        <Text style={{ fontSize: RFValue(14), fontWeight: "700" }}>
          {label}
        </Text>
      </View>

      <TextInput
        value={value}
        style={{
          width: "100%",
          borderBottomWidth: 1,
          borderColor: "#8d8d8d",
          fontSize: RFValue(14),
        }}
        placeholder={placeholder}
        onChangeText={setValue}
      />
    </View>
  );
}

type Props = ScreenProps<"profileConfig">;

export function ProfileConfig({ route }: Props) {
  const { firstLogin } = route.params;
  const navigation = useNavigation();

  const { colors } = useTheme();
  const { loggedUser } = usePetidoContext();
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [currentInfos, setCurrentInfos] =
    useState<{ name: string; username: string; photo?: string }>();

  const [image, setImage] = useState("");

  const getCurrentInfos = () => {
    const userRef = database.ref(`users/${loggedUser.uid}`);
    const firebasePets = userRef.on("value", (user) => {
      const userConfig = user.val() ?? {};
      console.log({ userConfig });

      setCurrentInfos(userConfig);
    });
  };

  useEffect(() => {
    getCurrentInfos();
  }, []);

  const backAction = () => {
    navigation.navigate("home");
  };

  async function uploadImage() {
    const path = `users/${loggedUser.uid}/config/${uuid.v4()}`;

    const response = await fetch(image);
    const blob = await response.blob();

    const ref = storage.ref().child(path);

    const result = await ref.put(blob);

    const url = await ref.getDownloadURL();

    return url;
  }

  async function handleUpdateConfig() {
    if ((!currentInfos?.name || !currentInfos.username) && (!name || !user)) {
      Alert.alert(
        "Informações Obrigatórias",
        "É necessário adicionar nome e usuário"
      );

      return;
    }

    let url = "";

    if (image) {
      url = await uploadImage();
    }

    const userRef = database.ref(`users/${loggedUser.uid}`);
    const firebasePets = await userRef.set({
      name: name || currentInfos?.name,
      username: user || currentInfos?.username,
      photo: url || currentInfos?.photo,
    });

    setName("");
    setUser("");
    if (firstLogin) {
      navigation.dispatch(StackActions.push("home"));
      return;
    }

    navigation.goBack();
  }

  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Desculpe, precisamos das permissões de câmera!");
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View>
      <Header
        onBack={backAction}
        showBack={!firstLogin}
        title="Editar Perfil"
        onPressConfirm={handleUpdateConfig}
      />
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            height: RFValue(70),
            width: RFValue(70),
            backgroundColor: colors.primary,
            borderRadius: RFValue(35),
          }}
        >
          <Image
            style={{ width: "100%", height: "100%", borderRadius: RFValue(35) }}
            source={{ uri: image || currentInfos?.photo || undefined }}
          />
        </View>
        <Pressable onPress={pickImage} style={{ marginTop: RFValue(8) }}>
          <Text
            style={{
              fontWeight: "700",
              fontSize: RFValue(14),
              color: colors.accent,
            }}
          >
            Alterar foto de perfil
          </Text>
        </Pressable>
      </View>

      <View style={{ paddingHorizontal: RFValue(16), marginTop: RFValue(16) }}>
        <Field
          setValue={setName}
          label="Nome"
          placeholder={currentInfos?.name || ""}
        />
        <Field
          setValue={setUser}
          label="Usuário"
          style={{ marginTop: RFValue(16) }}
          placeholder={currentInfos?.username || ""}
        />
      </View>
    </View>
  );
}
