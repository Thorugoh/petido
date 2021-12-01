import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";

import PetidoeSvg from "../../../resources/petido.svg";
import { auth } from "../../config/firebaseconfig";
import { usePetidoContext } from "../../context/PetidoContext";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export function SignIn() {
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
          case "auth/weak-password":
            Alert.alert(
              "Senha fraca",
              "Insira uma senha forte para continuar."
            );
          default:
            return;
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleGoToLogin() {
    navigation.navigate("login");
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
          onPress={handleSignInWithEmail}
        >
          Cadastrar
        </RegisterButton>
        <Button onPress={handleGoToLogin}>Já possuo uma conta, Entrar!</Button>
      </InputContainer>
    </Container>
  );
}

const Container = styled(KeyboardAwareScrollView).attrs(() => ({
  contentContainerStyle: {
    paddingTop: 60,
    paddingBottom: 60,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
}))``;

const Title = styled.Text`
  text-align: center;
  margin-top: 40px;
  font-size: 20px;
`;

const InputContainer = styled.View`
  flex: 1;
  height: 100%;
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

const RegisterButton = styled(Button).attrs(() => ({
  labelStyle: { color: "#FFF" },
}))`
  margin-top: 25px;
  width: 60%;
  color: #fff;
`;
