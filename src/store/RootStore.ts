import { createContext } from "react";
import GithubStore from "./CatStore";

export class RootStore {
  GithubStore = new GithubStore(this);
}

export const rootStore = new RootStore();

export const RootStoreContext = createContext(rootStore);
