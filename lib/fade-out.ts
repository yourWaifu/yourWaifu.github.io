import { NextRouter } from "next/router";
import { useEffect } from "react";
import { SpringValue } from "react-spring";

let listOfValuesToFadeOut = new Map<number, {
    value: SpringValue<number>, to: number
}>();

export function fadeOut() {
    Array.from(listOfValuesToFadeOut.values()).map(
        value => {value.value.start({to: value.to})});
}

let fadeOutCounter = 0;
export function useFadeOut(value: SpringValue<number>, to: number, router: NextRouter) {
    useEffect(() => {
        const index = fadeOutCounter;
        listOfValuesToFadeOut.set(index, {value, to});
        fadeOutCounter += 1;
        return () => {
            listOfValuesToFadeOut.delete(index);
        }
    }, []);
    useEffect(() => {
        window.addEventListener("beforeunload", fadeOut);
    })
}