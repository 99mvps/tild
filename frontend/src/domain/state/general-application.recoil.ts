import { atom, selector } from "recoil";

export const applicationState = atom({
  key: "appState",
  default: {
    live: false,
  },
});

export const liveSelector = selector({
  key: "live",
  get: ({ get }) => get(applicationState).live,
  set: ({ set, get }) =>
    set(applicationState, (prevState) => ({
      ...prevState,
      live: !get(applicationState).live,
    })),
});
