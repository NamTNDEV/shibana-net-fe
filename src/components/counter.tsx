'use client';

import { useCounterStore } from "@/stores/counter.store";
import { Button } from "./ui/button";

export default function CounterComponent() {
    const { count, increment, decrement } = useCounterStore();
    return (
        <div className="w-full bg-white p-4 rounded-lg shadow-md flex flex-col items-center gap-2">
            <h2 className="text-lg font-bold">Counter</h2>
            <p className="text-2xl font-bold">{count}</p>
            <div className="flex gap-2 w-full justify-between">
                <Button className="bg-blue-500 text-white p-2 rounded-md flex-1" onClick={() => increment()}>Increment</Button>
                <Button className="bg-red-500 text-white p-2 rounded-md flex-1" onClick={() => decrement()}>Decrement</Button>
            </div>
        </div>
    )
}
