import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { database, storage } from "../config/firebaseconfig";
import { Pet, usePetidoContext } from "../context/PetidoContext";
import uuid from "react-native-uuid";

function useRegister() {
  const { loggedUser, setPets } = usePetidoContext();

  async function uploadImage(uri: string, path: string) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = storage.ref().child(path);

    const result = await ref.put(blob);

    const url = await ref.getDownloadURL();

    return url;
  }

  async function registerPet(pet: Omit<Pet, "id">) {
    const { situation, colors, size, photo, location } = pet;
    if (!photo) {
      Alert.alert(
        "Foto obrigatória",
        "Parece que você nao adicionou uma foto."
      );
      return;
    }
    if (!situation || !colors || !size || !location) return;

    try {
      const path = `users/${loggedUser.uid}/pets/${uuid.v4()}`;
      const urlImage = await uploadImage(pet.photo, path);

      const userPetsRef = database.ref(`user_pets/${loggedUser.uid}/pets`);
      await userPetsRef.push({
        description: pet.description,
        colors: pet.colors,
        size: pet.size,
        location: pet.location,
        photo: urlImage,
        situation: pet.situation,
      });

      const petsRef = database.ref("pets");
      const firebasePets = await petsRef.push({
        description: pet.description,
        colors: pet.colors,
        size: pet.size,
        location: pet.location,
        photo: urlImage,
        situation: pet.situation,
        user_id: loggedUser.uid,
      });

      setPets((pets) => [...pets, { ...pet, id: String(uuid.v4()) }]);
    } catch (err) {
      console.log(err);
    }
  }

  return {
    registerPet,
  };
}

export { useRegister };
