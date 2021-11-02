import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { Alert, View, StyleSheet } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

import PetidoeSvg from "../../../resources/petido.svg";
import { auth } from "../../config/firebaseconfig";
import { usePetidoContext } from "../../context/PetidoContext";
import styled from "styled-components/native";

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
    <Container>
      <PetidoeSvg width={200} height={75} />
      <Title>{`Cadastre-se e faça parte de \numa rede do bem`}</Title>

      <InputContainer>
        <InputEmail label="Email:" onChangeText={setEmail} />
        <InputPassword
          label="Senha:"
          onChangeText={setPassword}
          secureTextEntry
        />
        <InputPassword
          label="Repita a Senha:"
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <RegisterButton
          disabled={loading}
          loading={loading}
          mode="contained"
          labelStyle={styles.labelButton}
          onPress={handleSignInWithEmail}
        >
          Cadastrar
        </RegisterButton>
        <Button onPress={handleGoToLogin}>Já possuo uma conta, Entrar!</Button>
      </InputContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  text-align: center;
  margin-top: 40px;
  font-size: 20px;
`;

const InputContainer = styled.View`
  height: 40%;
  width: 80%;
  align-items: center;
`;

const InputEmail = styled(TextInput)`
  height: 60px;
  width: 100%;
`;

const InputPassword = styled(TextInput)`
  height: 60px;
  width: 100%;
  margin-top: 8px;
`;

const RegisterButton = styled(Button)`
  margin-top: 25px;
  width: 60%;
  color: #fff;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { textAlign: "center", marginTop: 40, fontSize: 20 },
  inputsContainer: { height: "40%", width: "80%", alignItems: "center" },
  inputEmail: { height: 60, width: "100%" },
  inputPassword: { height: 60, width: "100%", marginTop: 8 },
  registerButton: { marginTop: 15, width: "40%" },
  labelButton: { color: "#FFF" },
});
