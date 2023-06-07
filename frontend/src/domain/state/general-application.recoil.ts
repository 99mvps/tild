import { atom, selector } from "recoil";

export const tildApplicationState = atom({
  key: "appState",
  default: {
    isLive: false,
  },
});

export const isLiveSelector = selector({
  key: "isLive",
  get: ({ get }) => get(tildApplicationState).isLive,
  set: ({ set, get }) =>
    set(tildApplicationState, (prevState) => ({
      ...prevState,
      isLive: !get(tildApplicationState).isLive,
    })),
});
