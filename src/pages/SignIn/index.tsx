import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

import PetidoeSvg from "../../../resources/petido.svg";
import { auth } from "../../config/firebaseconfig";
import { usePetidoContext } from "../../context/PetidoContext";

export function SignIn() {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { setLoggedUser } = usePetidoContext();

  async function handleSignInWithEmail() {
    if (!password || !confirmPassword) return;

    if (password !== confirmPassword) {
      Alert.alert("Senhas divergentes", "As senhas devem ser iguais");
      return;
    }

    if (!email) {
      Alert.alert(
        "E-mail inválido",
        "É necessário adicionar um e-mail válido para prosseguir"
      );
    }

    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email.trim(), password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await AsyncStorage.setItem("@petido:user", JSON.stringify(user));
        setLoggedUser(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Erro", errorMessage);
        // ..
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleGoToLogin() {
    navigation.navigate("Login");
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
      }}
    >
      <PetidoeSvg width={200} height={75} />
      <Text style={{ textAlign: "center", marginTop: 40, fontSize: 20 }}>
        {`Cadastre-se e faça parte de \numa rede do bem`}
      </Text>

      <View style={{ height: "40%", width: "80%", alignItems: "center" }}>
        <TextInput
          label="Email:"
          style={{ height: 60, width: "100%" }}
          onChangeText={setEmail}
        />
        <TextInput
          label="Senha:"
          onChangeText={setPassword}
          style={{ height: 60, width: "100%", marginTop: 8 }}
          secureTextEntry
        />
        <TextInput
          label="Repita a Senha:"
          onChangeText={setConfirmPassword}
          style={{ height: 60, width: "100%", marginTop: 8 }}
          secureTextEntry
        />

        <Button
          disabled={loading}
          loading={loading}
          style={{ marginTop: 15, width: "40%" }}
          mode="contained"
          labelStyle={{ color: "#FFF" }}
          onPress={handleSignInWithEmail}
        >
          Cadastrar
        </Button>
        <Button onPress={handleGoToLogin}>Já possuo uma conta, Entrar!</Button>
      </View>
    </View>
  );
}
