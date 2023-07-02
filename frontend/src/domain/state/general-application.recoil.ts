import { DefaultValue, atom, selector } from "recoil";

export interface ApplicationStateInterface {
  live: boolean;
  tildId: string;
}

export const applicationState = atom<ApplicationStateInterface>({
  key: "appState",
  default: {
    live: false,
    tildId: "EMPTY_ID",
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

export const tildIdLiveSelector = selector({
  key: "tildId",
  get: ({ get }) => get(applicationState).tildId,
  set: ({ set, get }, newValue) => {
    if (newValue instanceof DefaultValue) return;
    set(applicationState, { ...get(applicationState), tildId: newValue });
  },
});
