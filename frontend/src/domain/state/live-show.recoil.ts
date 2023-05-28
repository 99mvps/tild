import { atom } from "recoil";

export type LiveShowStateType = {
  participants: {
    count: number;
  };
};

export const liveShowState = atom<LiveShowStateType>({
  key: "liveShowState",
  default: {
    participants: {
      count: 0,
    },
  },
});
