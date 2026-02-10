import axios from "axios";

export interface Anime {
  mal_id: number;
  title: string;
  image: string;
}

export const fetchCurrentSeasonAnime = async (): Promise<Anime[]> => {
  try {
    const response = await axios.get("https://api.jikan.moe/v4/seasons/now?page=1");
    const data = response.data.data; 

    return data.map((anime: any) => ({
      mal_id: anime.mal_id,
      title: anime.title,
      image: anime.images.jpg.image_url
    }));
  } catch (error) {
    console.error("Error fetching anime:", error);
    return [];
  }
};
