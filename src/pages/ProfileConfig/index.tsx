import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Pressable, View, ViewStyle } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";
import { Header } from "../../components/Header";
import { database } from "../../config/firebaseconfig";
import { usePetidoContext } from "../../context/PetidoContext";

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
        <Text style={{ fontWeight: "700" }}>{label}</Text>
      </View>

      <TextInput
        value={value}
        style={{ width: "100%", borderBottomWidth: 1, borderColor: "#8d8d8d" }}
        placeholder={placeholder}
        onChangeText={setValue}
      />
    </View>
  );
}

export function ProfileConfig() {
  const { colors } = useTheme();
  const { loggedUser } = usePetidoContext();
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
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

  useEffect(() => {
    getCurrentInfos();
  }, []);

  async function handleUpdateConfig() {
    const userRef = database.ref(`users/${loggedUser.uid}`);
    const firebasePets = await userRef.set({
      name,
      username: user,
    });

    setName("");
    setUser("");
  }

  return (
    <View>
      <Header title="Editar Perfil" onPressConfirm={handleUpdateConfig} />
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            height: 70,
            width: 70,
            backgroundColor: colors.primary,
            borderRadius: 35,
          }}
        />
        <Pressable style={{ marginTop: 8 }}>
          <Text style={{ fontWeight: "700", color: colors.secundary }}>
            Alterar foto de perfil
          </Text>
        </Pressable>
      </View>

      <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
        <Field
          setValue={setName}
          label="Nome"
          placeholder={currentInfos?.name || ""}
        />
        <Field
          setValue={setUser}
          label="Usuário"
          style={{ marginTop: 16 }}
          placeholder={currentInfos?.username || ""}
        />
      </View>
    </View>
  );
}
