import AsyncStorage from "@react-native-async-storage/async-storage";

import React, {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";
import { database } from "../config/firebaseconfig";
import { useLocation } from "../hooks/useLocation";
import { getDistanceBetweenCoordinates } from "../utils/getDistanceBetweenCoordinates";
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
  distance?: number;
  user_id?: string;
}

interface PetidoContextData {
  loggedUser: any;
  setLoggedUser: Dispatch<SetStateAction<any>>;
  pets: Pet[];
  petsInDistance: Pet[];
  setPets: Dispatch<SetStateAction<Pet[]>>;
  distanceFilter: number;
  setDistanceFilter: Dispatch<SetStateAction<number>>;
  orderByDistance: "lowest" | "highest";
  setOrderByDistance: Dispatch<SetStateAction<"lowest" | "highest">>;
  rescuePet: (pet: Pet) => Promise<void>;
}

interface PetidoProviderProps {
  children: ReactNode;
}

const PetidoContext = createContext({} as PetidoContextData);

const PetidoProvider = ({ children }: PetidoProviderProps) => {
  const [loggedUser, setLoggedUser] = useState();
  const [pets, setPets] = useState<Pet[]>([]);
  const [petsInDistance, setPetsInDistance] = useState<Pet[]>([]);
  const [distanceFilter, setDistanceFilter] = useState(3);
  const [orderByDistance, setOrderByDistance] = useState<"lowest" | "highest">(
    "lowest"
  );

  const { location } = useLocation();

  const petsWithDistance = useMemo(() => {
    if (!location) return pets;

    return pets.map((pet: Pet) => {
      const distanceInKm = getDistanceBetweenCoordinates(
        location.coords,
        pet.location
      );

      return { ...pet, distance: distanceInKm };
    });
  }, [pets, location]);

  async function filterByDistance(pets: Pet[]) {
    if (pets && location?.coords) {
      const filtered = pets.filter((pet) => {
        return pet.distance ? pet.distance < distanceFilter : true;
      });

      if (!filtered.every((pet) => !!pet.distance)) {
        setPetsInDistance(filtered);
        return;
      }

      const sorted =
        orderByDistance === "lowest"
          ? filtered.slice().sort((a, b) => a.distance! - b.distance!)
          : filtered.slice().sort((a, b) => b.distance! - a.distance!);

      setPetsInDistance(sorted);
    }
  }
  useEffect(() => {
    filterByDistance(petsWithDistance);
  }, [pets, distanceFilter, orderByDistance]);

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
    const petsRef = await database.ref("pets").on("value", async (pet) => {
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
          user_id: value.user_id,
        };
      });

      setPets(parsedPets);
    });
  };

  async function rescuePet(pet: Pet) {
    const petMarkedAsRescued = {
      ...pet,
      situation: "rescued",
      rescuer_id: loggedUser.uid,
    };

    const userPetsRef = database.ref(`user_pets/${pet.user_id}/pets/${pet.id}`);
    await userPetsRef.set(petMarkedAsRescued);

    const userRescuedPetsRef = database.ref(
      `user_pets/${loggedUser.uid}/rescued_pets/${pet.id}`
    );
    await userRescuedPetsRef.set(petMarkedAsRescued);

    const petRef = database.ref(`pets/${pet.id}`);
    await petRef.remove();
  }

  useEffect(() => {
    getAllRegisteredPets();
  }, []);

  useEffect(() => {
    const cleanStorage = async () => {
      await AsyncStorage.removeItem("@petido:pets");
    };

    cleanStorage();
  }, []);

  return (
    <PetidoContext.Provider
      value={{
        setPets,
        pets,
        loggedUser,
        setLoggedUser,
        petsInDistance,
        distanceFilter,
        setDistanceFilter,
        orderByDistance,
        setOrderByDistance,
        rescuePet,
      }}
    >
      {children}
    </PetidoContext.Provider>
  );
};

function usePetidoContext() {
  const {
    pets,
    setPets,
    loggedUser,
    setLoggedUser,
    petsInDistance,
    distanceFilter,
    setDistanceFilter,
    orderByDistance,
    setOrderByDistance,
    rescuePet,
  } = useContext(PetidoContext);

  return {
    pets,
    setPets,
    loggedUser,
    setLoggedUser,
    petsInDistance,
    distanceFilter,
    setDistanceFilter,
    orderByDistance,
    setOrderByDistance,
    rescuePet,
  };
}

export { PetidoProvider, usePetidoContext };
