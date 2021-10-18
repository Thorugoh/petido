import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { Alert, View, KeyboardAvoidingView } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import PetidoeSvg from "../../../resources/petido.svg";
import firebase from "../../config/firebaseconfig";

export function SignIn() {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  async function handleSignInWithEmail() {
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

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await AsyncStorage.setItem("@petido:user", JSON.stringify(user));
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Erro", errorMessage);
        // ..
      });
  }

  function handleGoToLogin() {
    navigation.navigate("Login");
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <PetidoeSvg width={200} height={75} />
        <Text style={{ textAlign: "center", marginTop: 40, fontSize: 20 }}>
          {`Cadastre-se e faça parte de \numa rede do bem`}
        </Text>
        <View style={{ height: "40%", marginTop: 40 }}>
          <KeyboardAvoidingView style={{ flex: 1, width: 250 }}>
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
          </KeyboardAvoidingView>
        </View>
        <Button
          mode="contained"
          labelStyle={{ color: "#FFF" }}
          onPress={handleSignInWithEmail}
        >
          Cadastrar
        </Button>
        <Button style={{ marginTop: 5 }} onPress={handleGoToLogin}>
          Já possuo uma conta, Entrar!
        </Button>

        {/* <Pressable
          style={{
            width: 200,
            borderWidth: 1,
            padding: 5,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            borderRadius: 5,
            marginTop: 40,
          }}
        >
          <AppleSvg width={25} height={25} />
          <Text style={{ fontSize: 18, marginLeft: 6 }}>Entrar com Apple</Text>
        </Pressable>

        <Pressable
          style={{
            width: 200,
            borderWidth: 1,
            padding: 5,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            borderRadius: 5,
            marginTop: 5,
          }}
          onPress={handleSignInWithGoogle}
        >
          <GoogleSvg width={25} height={25} />
          <Text style={{ fontSize: 18, marginLeft: 6 }}>Entrar com Google</Text>
        </Pressable> */}
      </View>
    </View>
  );
}
