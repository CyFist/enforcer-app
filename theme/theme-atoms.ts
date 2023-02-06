import { atom, AtomEffect } from "recoil";

export type ThemeMode = "light" | "dark";

const store = typeof window !== "undefined" ? window.localStorage : null;

export const localStorageEffect: (key: string) => AtomEffect<any> =
  (key) =>
  ({ setSelf, onSet }) => {
    if (store) {
      const savedValue = store.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? store.removeItem(key)
          : store.setItem(key, JSON.stringify(newValue));
      });
    }
  };

export const appThemeMode = atom<ThemeMode>({
  key: "AppThemeMode",
  default: "dark",
  effects: [localStorageEffect("theme-mode")],
});
