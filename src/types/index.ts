export interface Destination {
  id: string;
  name: string;
  subregion: "Occidente" | "Norte";
  climate: string;
  difficulty: "Baja" | "Media" | "Alta";
  activities: string[];
  summary: string;
  extendedDetails: {
    recommendedGear: string;
    bestSeason: string;
    localHighlights: string[];
  };
  image: string; // Solo el nombre del archivo, ej. "santa-fe-antioquia.webp"
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "naturaleza" | "aventura" | "cultural" | "aguas";
  location: string;
  alt: string;
  description: string;
  image: string; // Solo el nombre del archivo, ej. "gal-01.webp"
}

export interface SuggestedRoute {
  id: string;
  name: string;
  zone: "Occidente fluvial/colonial" | "Occidente de cordillera" | "Norte verde";
  approximateDuration: string;
  roadType: string;
  effortLevel: "Bajo" | "Moderado" | "Exigente";
  description: string;
  stops: string[];
}
