import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import firebase from "../config/firebaseconfig";
import { Pet, usePetidoContext } from "../context/PetidoContext";

function useRegister() {
  const database = firebase.firestore();
  const { loggedUser, setPets } = usePetidoContext();

  const storage = firebase.storage;

  // async function uploadImage(uri: string, path: string) {
  //   const response = await fetch(uri);
  //   const blob = await response.blob();
  //   var ref = storage().ref().child(path);

  //   const result = ref.put(blob);

  //   const url = await ref.getDownloadURL();

  //   return url;
  // }

  async function uploadImage(uri: string, path: string) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = storage().ref().child(path);

    const result = await ref.put(blob);

    const url = await ref.getDownloadURL();

    return url;
  }

  async function registerPet(pet: Pet) {
    const { situation, color, size, photo, location } = pet;

    if (!photo) {
      Alert.alert(
        "Foto obrigatória",
        "Parece que você nao adicionou uma foto."
      );
      return;
    }

    if (!situation || !color || !size || !location) return;

    const response = await AsyncStorage.getItem("@petido:pets");

    if (response) {
      const pets = JSON.parse(response) as Pet[];
      const savePets = [...pets, pet];
      try {
        const result = await database.collection("pets").add({
          description: pet.description,
          colors: parseInt(pet.color),
          size: pet.size,
          location: pet.location,
          photo: null,
          situation: pet.situation,
        });
        const path = `users/${loggedUser.uid}/pets/${result.id}`;
        const urlImage = await uploadImage(pet.photo, path);

        const updatePhotoResult = await database
          .collection("pets")
          .doc(result.id)
          .update({
            photo: urlImage,
          });

        const res = await database
          .collection("user_pets")
          .doc(loggedUser.uid)
          .collection("pets")
          .doc(result.id)
          .set({
            description: pet.description,
            colors: parseInt(pet.color),
            size: pet.size,
            location: pet.location,
            photo: urlImage,
            situation: pet.situation,
          });
      } catch (err) {
        console.log(err);
      }

      await AsyncStorage.setItem("@petido:pets", JSON.stringify(savePets));
      setPets((pets) => [...pets, pet]);

      return;
    }

    await AsyncStorage.setItem("@petido:pets", JSON.stringify([pet]));
    setPets((pets) => [...pets, pet]);
  }

  return {
    registerPet,
  };
}

export { useRegister };
