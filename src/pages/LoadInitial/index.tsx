import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { database } from "../../config/firebaseconfig";
import { usePetidoContext } from "../../context/PetidoContext";

export function LoadInitial() {
  const { loggedUser } = usePetidoContext();
  const [userInfos, setUserInfos] = useState();
  const [loading, setLoading] = useState(true);
  const { navigate } = useNavigation();

  const getCurrentInfos = async () => {
    setLoading(true);
    const userRef = database.ref(`users/${loggedUser.uid}`);
    userRef.on("value", (user) => {
      const userConfig = user.val() ?? {};
      console.log({ userConfig });

      setUserInfos(userConfig);

      if (userConfig?.name && userConfig?.username) {
        navigate("home");
        return;
      } else {
        navigate("profileConfig", { firstLogin: true });
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    getCurrentInfos();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
