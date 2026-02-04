import { create } from "zustand";

type CounterStoreType = {
    count: number;
    increment: () => void;
    decrement: () => void;
}

export const useCounterStore = create<CounterStoreType>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
}));