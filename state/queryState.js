import { atom } from 'recoil';

export const queryAtom = atom({
  key: 'queryAtom',
  default: []
});

export const searchBarAtom = atom({
  key: 'searchBarAtom',
  default: []
});
