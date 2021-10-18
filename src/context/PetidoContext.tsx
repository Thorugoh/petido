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
export type PetColor = "1" | "2" | "3";
export type PetSize = "small" | "medium" | "large";

export interface Pet {
  id: string;
  description: string;
  situation: PetSituation;
  color: PetColor;
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
  const database = firebase.firestore();

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

  const getAllRegisteredPets = () => {
    database.collection("pets").onSnapshot((query) => {
      const list: Pet[] = [];
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });

      setPets(list);
    });
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
