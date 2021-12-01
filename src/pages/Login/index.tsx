import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Alert, View, KeyboardAvoidingView, StyleSheet } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import PetidoeSvg from "../../../resources/petido.svg";
import { auth } from "../../config/firebaseconfig";
import { usePetidoContext } from "../../context/PetidoContext";
import { ScreenAuthProps } from "../../routes/app.auth.routes";

type LoginProps = ScreenAuthProps<"login">;

export function Login({ navigation }: LoginProps) {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedUser } = usePetidoContext();
  const [loading, setLoading] = useState(false);

  async function handleLoginWithEmail() {
    if (!email || !password) {
      Alert.alert("É necessário adicionar email e senha");
      return;
    }

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

        switch (errorCode) {
          case "auth/invalid-email":
            Alert.alert(
              "O endereço de e-mail é inválido",
              "Insira um endereço de e-mail válido para continuar."
            );
            break;
          case "auth/user-not-found":
            Alert.alert(
              "Usuário Inválido",
              "Insira um usuário válido para continuar."
            );
          case "auth/wrong-password":
            Alert.alert("Senha Inválida", "A senha digitada está incorreta.");
          default:
            return;
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleGoToSignIn() {
    navigation.navigate("signin");
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView />
      <View style={styles.innerContainer}>
        <PetidoeSvg width={200} height={75} />
        <Text style={styles.title}>{`Realize seu login\n`}</Text>

        <View style={styles.inputContainer}>
          <KeyboardAvoidingView style={{ flex: 1, width: 250 }}>
            <TextInput
              label="Email:"
              style={styles.emailPasswordInput}
              onChangeText={setEmail}
            />
            <TextInput
              label="Senha:"
              onChangeText={setPassword}
              style={styles.passwordInput}
              secureTextEntry
            />
          </KeyboardAvoidingView>
        </View>
        <Button
          disabled={loading}
          loading={loading}
          mode="contained"
          labelStyle={styles.loginButtonLabel}
          onPress={handleLoginWithEmail}
        >
          Entrar
        </Button>
        <Button style={styles.registerButton} onPress={handleGoToSignIn}>
          Quero me cadastrar!
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  title: { textAlign: "center", marginTop: 40, fontSize: 20 },
  inputContainer: { height: "40%", marginTop: 40 },
  emailPasswordInput: { height: 60, width: "100%" },
  passwordInput: { height: 60, width: "100%", marginTop: 8 },
  loginButtonLabel: { color: "#FFF" },
  registerButton: { marginTop: 5 },
});
