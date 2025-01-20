import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";

export interface ICat {
  id: string;
  url: string;
  width: number;
  height: number;
  favorite: boolean;
}

class GithubStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  cats: ICat[] = [];

  isFavoritePage: boolean = false;

  loading: boolean = false;

  setCats = (data: ICat[]) => {
    this.cats = data;
  };

  setIsFavoritePage = (favorite: boolean) => {
    this.isFavoritePage = favorite;
  };

  toggleFavorite = (catId: string) => {
    const cat = this.cats.find((i) => i.id === catId);
    if (cat) {
      cat.favorite = !cat.favorite;
    }
  };

  getGithubCats = async (page: number): Promise<ICat[] | null> => {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `live_ZOfxf6Jt0WMudfbWFCv1mBKFhH0GBCDqn0lIqg1EkSCJElySLEz872OK5jkxJwLm`,
      },
    };
    if (page === 1) {
      this.cats = [];
    }
    this.loading = true;
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?page=${page}&limit=10`,
        requestOptions
      );
      const data = await response.json();
      this.loading = false;
      if (response.ok) {
        this.cats = [...this.cats, ...data];
      }
      return data;
    } catch (error) {
      console.log(error);
      this.loading = false;
      return null;
    }
  };
}

export default GithubStore;
