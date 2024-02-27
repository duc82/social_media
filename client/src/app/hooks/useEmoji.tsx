import { create } from "zustand";
import { Feeling } from "../types/emoji";

interface EmojiState {
  feeling: Feeling | null;
  activity: null;
  handleFeeling: (feeling: Feeling) => void;
}

const useEmoji = create<EmojiState>((set) => ({
  feeling: null,
  activity: null,
  handleFeeling: (feeling) => set({ feeling }),
}));

export default useEmoji;
