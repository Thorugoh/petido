import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/core";
import React, {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { database } from "../config/firebaseconfig";

export type PetSituation = "abandoned" | "lost" | "bruised";
export type PetColor = "1" | "2" | "3";
export type PetSize = "small" | "medium" | "large";

export interface Pet {
  id: string;
  description: string;
  situation: PetSituation;
  colors: PetColor;
  size: PetSize;
  photo: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

interface PetidoContextData {
  loggedUser: any;
  setLoggedUser: Dispatch<SetStateAction<any>>;
  pets: Pet[];
  setPets: Dispatch<SetStateAction<Pet[]>>;
}

interface PetidoProviderProps {
  children: ReactNode;
}

const PetidoContext = createContext({} as PetidoContextData);

const PetidoProvider = ({ children }: PetidoProviderProps) => {
  const [loggedUser, setLoggedUser] = useState();
  const [pets, setPets] = useState<Pet[]>([]);

  const getPets = async () => {
    const result = await AsyncStorage.getItem("@petido:pets");
    if (result) {
      setPets(JSON.parse(result));
    }
    return [];
  };

  async function getLoggedUser() {
    const result = await AsyncStorage.getItem("@petido:user");
    if (result) {
      const user = JSON.parse(result);
      setLoggedUser(user);
    }
  }

  useEffect(() => {
    getLoggedUser();
  }, []);

  const getAllRegisteredPets = async () => {
    const petsRef = await database.ref("pets").on("value", (pet) => {
      const databasePets = pet.val();
      const firebasePets = databasePets ?? {};

      const parsedPets = Object.entries(firebasePets).map(([key, value]) => {
        return {
          id: key,
          colors: value.colors,
          description: value.description,
          location: value.location,
          photo: value.photo,
          situation: value.situation,
          size: value.size,
        };
      });

      setPets(parsedPets);
    });

    // database.collection("pets").onSnapshot((query) => {
    //   const list: Pet[] = [];
    //   query.forEach((doc) => {
    //     list.push({ ...doc.data(), id: doc.id });
    //   });

    //   setPets(list);
    // });
  };

  useEffect(() => {
    getAllRegisteredPets();
  }, []);

  useEffect(() => {
    getPets();
  }, []);

  useEffect(() => {
    const cleanStorage = async () => {
      await AsyncStorage.removeItem("@petido:pets");
    };

    cleanStorage();
  }, []);

  return (
    <PetidoContext.Provider
      value={{ setPets, pets, loggedUser, setLoggedUser }}
    >
      {children}
    </PetidoContext.Provider>
  );
};

function usePetidoContext() {
  const { pets, setPets, loggedUser, setLoggedUser } =
    useContext(PetidoContext);

  return { pets, setPets, loggedUser, setLoggedUser };
}

export { PetidoProvider, usePetidoContext };
