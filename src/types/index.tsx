export type PetSituation = "abandoned" | "lost" | "bruised";

export type PetColor = "1" | "2" | "3";

export type PetSize = "small" | "medium" | "large";

export type Pet = {
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
  