import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Alert, View, KeyboardAvoidingView } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import PetidoeSvg from "../../../resources/petido.svg";
import { auth } from "../../config/firebaseconfig";
import { usePetidoContext } from "../../context/PetidoContext";

export function Login({ navigation }) {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedUser } = usePetidoContext();
  const [loading, setLoading] = useState(false);

  async function handleLoginWithEmail() {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await AsyncStorage.setItem("@petido:user", JSON.stringify(user));
        setLoggedUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Erro", errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleGoToSignIn() {
    navigation.navigate("SignIn");
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <PetidoeSvg width={200} height={75} />
        <Text style={{ textAlign: "center", marginTop: 40, fontSize: 20 }}>
          {`Realize seu login\n`}
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
          </KeyboardAvoidingView>
        </View>
        <Button
          disabled={loading}
          loading={loading}
          mode="contained"
          labelStyle={{ color: "#FFF" }}
          onPress={handleLoginWithEmail}
        >
          Entrar
        </Button>
        <Button style={{ marginTop: 5 }} onPress={handleGoToSignIn}>
          Quero me cadastrar!
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
