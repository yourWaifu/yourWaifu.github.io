import React, { createContext, useRef, useContext } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { OneFactor, Vector3 } from "three";
import lerp from "../lib/lerp"
import state from "../lib/store"
import { GroupProps } from "@react-three/fiber/dist/declarations/src/three-types";

const offsetContext = createContext(0);

export function useBlock() {
    const { sections, pages, zoom } = state;
    const { size, viewport } = useThree();
    const offset = useContext(offsetContext);
    const viewportWidth = viewport.width * zoom;
    const viewportHeight = viewport.height * zoom;
    const canvasWidth = viewportWidth / zoom;
    const canvasHeight = viewportHeight / zoom;
    const mobile = size.width < 700;
    const margin = canvasWidth * (mobile ? 0.2 : 0.1);
    const contentMaxWidth = canvasWidth * (mobile ? 0.8 : 0.6);
    const sectionHeight = canvasWidth * ((pages - 1) / (sections - 1));
    const offsetFactor = (offset + 1.0) / sections;

    return {
        viewport,
        offset,
        viewportWidth,
        viewportHeight,
        canvasWidth,
        canvasHeight,
        mobile,
        margin,
        contentMaxWidth,
        sectionHeight,
        offsetFactor,
        baseScale: 894.9274309237762,
    };
}

export function Block({
    children, factor, offset, ...props
}: {
    children: React.ReactNode,
    factor: number
    offset: number
}): JSX.Element {
    const { offset: parentOffset, sectionHeight } = useBlock();
    const ref = useRef<React.ReactNode & GroupProps>();
    offset = offset !== undefined ? offset : parentOffset;
    useFrame(() => {
        if (!ref.current?.position)
            return;
        const curY = (ref.current.position as Vector3).y;
        //const curTop: any = state.top.current;
        //(ref.current.position as Vector3).y = lerp(curY, (curTop/state.zoom) * factor, 0.1);
    });
    return (
        <offsetContext.Provider value={offset}>
            <group {...props} position={[0, -sectionHeight * offset * factor, 0]}>
                <group ref={ref}>{children}</group>
            </group>
        </offsetContext.Provider>
    );
}