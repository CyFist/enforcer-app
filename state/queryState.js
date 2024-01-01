import { atom } from "recoil";

export const queryAtom = atom({
  key: "queryAtom",
  default: [],
});

export const searchBarAtom = atom({
  key: "searchBarAtom",
  default: [],
});

export const query_LMAtom = atom({
  key: "query_LMAtom",
  default: [],
});

export const searchBar_LMAtom = atom({
  key: "searchBar_LMAtom",
  default: [],
});
