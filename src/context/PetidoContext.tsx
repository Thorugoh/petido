import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import firebase from "../config/firebaseconfig";

export type PetSituation = "abandoned" | "lost" | "bruised";
export type PetColor = "one" | "two" | "three";
export type PetSize = "small" | "medium" | "large";

export interface Pet {
  situation: PetSituation;
  color: PetColor;
  size: PetSize;
  photo: { uri: string; base64: string };
  location: {
    latitude: number;
    longitude: number;
  };
}

interface PetidoContextData {
  loggedUser: any;
  setLoggedUser: Dispatch<SetStateAction<any>>;
  registerPet: (pet: Pet) => Promise<void>;
  pets: Pet[];
}

interface PetidoProviderProps {
  children: ReactNode;
}

const PetidoContext = createContext({} as PetidoContextData);

const PetidoProvider = ({ children }: PetidoProviderProps) => {
  const [loggedUser, setLoggedUser] = useState();
  const [pets, setPets] = useState<Pet[]>([]);
  const database = firebase.firestore();
  const storage = firebase.storage;

  async function uploadImage(uri: string) {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = storage().ref().child("teste-image");
    return ref.put(blob);
  }

  async function registerPet(pet: Pet) {
    const { situation, color, size, photo, location } = pet;
    console.log("register", situation, color, size);

    if (!situation || !color || !size || !photo) return;

    const response = await AsyncStorage.getItem("@petido:pets");

    const newPet: Pet = {
      situation: situation,
      color: color,
      size: size,
      photo: {
        uri: photo.uri,
        base64: photo.base64!,
      },
      location: location,
    };

    if (response) {
      const pets = JSON.parse(response) as Pet[];
      const savePets = [...pets, newPet];
      try {
        const firebaseTest = {
          ...newPet,
          photo: "newPet.photo.base64",
        };

        const res = await uploadImage(newPet.photo.uri);
        console.log("res", res);

        const result = await database.collection("pets").add({
          description: "Pet caramelo",
          colors: 0,
          size: newPet.size,
          location: newPet.location,
          photo: "newPet.photo.base64",
          situation: newPet.situation,
        });
        console.log(result.collection.toString());
      } catch (err) {
        console.log(err);
      }

      await AsyncStorage.setItem("@petido:pets", JSON.stringify(savePets));
      setPets((pets) => [...pets, newPet]);

      return;
    }

    await AsyncStorage.setItem("@petido:pets", JSON.stringify([newPet]));
    setPets((pets) => [...pets, newPet]);
  }

  const getPets = async () => {
    const result = await AsyncStorage.getItem("@petido:pets");
    if (result) {
      setPets(JSON.parse(result));
    }
    return [];
  };

  useEffect(() => {
    database.collection("pets").onSnapshot((query) => {
      const list = [];
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });

      console.log(list);
    });
  }, []);

  useEffect(() => {
    getPets();
  }, []);

  return (
    <PetidoContext.Provider
      value={{ registerPet, pets, loggedUser, setLoggedUser }}
    >
      {children}
    </PetidoContext.Provider>
  );
};

function usePetidoContext() {
  const { registerPet, pets, loggedUser, setLoggedUser } =
    useContext(PetidoContext);

  return { registerPet, pets, loggedUser, setLoggedUser };
}

export { PetidoProvider, usePetidoContext };
