import { NextRouter } from "next/router";
import { useEffect } from "react";
import { SpringValue } from "react-spring";

let listOfValuesToFadeOut = new Map<number, {
    value: SpringValue<number>, from: number, to: number
}>();

export function fadeOut() {
    Array.from(listOfValuesToFadeOut.values()).map(
        value => {value.value.start({to: value.to})});
}

export function fadeIn() {
    Array.from(listOfValuesToFadeOut.values()).map(
        value => {value.value.start({to: value.from})});
}

let fadeOutCounter = 0;
export function useFadeOut(value: SpringValue<number>, from: number, to: number, router: NextRouter) {
    useEffect(() => {
        const index = fadeOutCounter;
        listOfValuesToFadeOut.set(index, {value, from, to});
        fadeOutCounter += 1;
        return () => {
            listOfValuesToFadeOut.delete(index);
        }
    }, []);
}