import { atom } from 'recoil';

export const ModalAtom = atom({
  key: 'ModalAtom',
  default: false
});

export const ModalTitleAtom = atom({
  key: 'ModalTitleAtom',
  default: ''
});

export const ModalUserAtom = atom({
  key: 'ModalUserAtom',
  default: []
});
