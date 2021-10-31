import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { database, storage } from "../config/firebaseconfig";
import { Pet, usePetidoContext } from "../context/PetidoContext";
import uuid from "react-native-uuid";
import { transformSync } from "@babel/core";

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
    const { situation, colors, size, location } = pet;

    if (!situation || !colors || !size || !location) return;

    try {
      const path = `users/${loggedUser.uid}/pets/${uuid.v4()}`;
      const urlImage = await uploadImage(pet.photo, path);

      const userPetsRef = database.ref(`/user_pets/${loggedUser.uid}/pets`);

      try {
        userPetsRef.push({
          description: pet.description,
          colors: pet.colors,
          size: pet.size,
          location: pet.location,
          photo: urlImage,
          situation: pet.situation,
        });
      } catch {
        console.log("error");
      }

      const petsRef = database.ref("/pets");
      try {
        const firebasePets = await petsRef.push({
          description: pet.description,
          colors: pet.colors,
          size: pet.size,
          location: pet.location,
          photo: urlImage,
          situation: pet.situation,
          user_id: loggedUser.uid,
        });
      } catch {
        console.log("error");
      }

      setPets((pets) => [...pets, { ...pet, id: String(uuid.v4()) }]);
    } catch (err) {
      console.error("error", err);
    }
  }

  return {
    registerPet,
  };
}

export { useRegister };
