import Head from 'next/head'
import Layout from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import { getPostDateStr } from './posts/[id]'
import { Canvas, useFrame, useLoader, useThree, extend } from "@react-three/fiber"
import React, { useRef, Suspense, useCallback, MutableRefObject, MouseEventHandler, useEffect, UIEventHandler, RefObject, ReactNode, useMemo, useState } from 'react'
import { GLTFLoader } from 'three-stdlib';
import * as THREE from 'three'
import { Stats, useGLTF } from '@react-three/drei'
import state from '../lib/store' //metadata about the content on index
import { Block, useBlock } from '../components/blocks' //system for splitting content into blocks that fill the screen
import { GroupProps } from '@react-three/fiber/dist/declarations/src/three-types'
import lerp from '../lib/lerp' //common linear interpolation
import { SpringValue, useSpring } from 'react-spring'
import { EffectComposer, DepthOfField, Bloom, SSAO } from '@react-three/postprocessing'
import ReactDOM from 'react-dom'
import { PerspectiveCamera } from 'three'
import { useFadeOut } from '../lib/fade-out'

const baseCameraZ = 500;
const viewDistance = 500;
const baseScale = 894.9274309237762;
const minVFOV = 75;

function floatingModel() {}

function sineWave(time: number, amp: number, frequency: number, phase: number = 0) {
    return amp * Math.sin((frequency * time) + phase);
}

function deg2Rad(deg: number) {
    return deg * (Math.PI / 180);
}

interface MouseOverData {x: number, y: number, halfW: number, halfH: number, available?: boolean};
interface GyroData {beta: number, gamma: number, available?: boolean, center: { beta: number, gamma: number } }

function Sig({
    mouse, gyro, fadeTransitionRef
}:{
    mouse:MutableRefObject<MouseOverData>, gyro:MutableRefObject<GyroData>, fadeTransitionRef: React.MutableRefObject<FadeTransition>
}): JSX.Element {
    useEffect(() => {
        if (fadeTransitionRef.current)
            fadeTransitionRef.current();
    }, [])

    const group = useRef<GroupProps>();
    const gltf = useLoader(GLTFLoader, '/sig.glb');
    const material = new THREE.MeshBasicMaterial({ color: new THREE.Color('white') });

    const { size, gl, scene } = useThree();
    const ration = gl.getPixelRatio();

    let time = 0.0;
    const baseRotation = new THREE.Euler(Math.PI / 2, 0, 0);

    let { viewportWidth, viewportHeight } = useBlock();
    const aspect = viewportWidth / viewportHeight;

    useFrame((_, delta) => {
        time += delta;
        const newScale = baseScale / 3;
        if (group.current?.scale && ((group.current.scale) as THREE.Vector3).x != newScale) {
            let scale = (group.current.scale as THREE.Vector3);
            scale.x = newScale;
            scale.y = newScale;
            scale.z = newScale;
        }
        if (group.current?.rotation) {
            let rotation = (group.current.rotation as THREE.Euler);
            if (gyro.current.available) {
                const targetRotationX = baseRotation.z + deg2Rad(gyro.current.gamma);
                const targetRotationY = baseRotation.x - deg2Rad(gyro.current.beta);
                rotation.z = lerp(rotation.z, targetRotationX, delta);
                rotation.x = lerp(rotation.x, targetRotationY, delta);
            } else if (mouse.current?.available) {
                const targetRotationX = baseRotation.z - ((mouse.current.x / mouse.current.halfW)*(Math.PI/(8*2)));
                const targetRotationY = baseRotation.x + ((mouse.current.y / mouse.current.halfH)*(Math.PI/(4*2)));
                 //deltas to prevent crazy spinning
                const deltaRotationX = Math.abs(rotation.z - targetRotationX);
                const deltaRotationY = Math.abs(rotation.x - targetRotationY);
                const deltaLimit = Math.PI / 4;
                rotation.z = deltaRotationX < deltaLimit ? lerp(rotation.z, targetRotationX, delta) : targetRotationX;
                rotation.x = deltaRotationY < deltaLimit ? lerp(rotation.x, targetRotationY, delta) : targetRotationY;
            }
            rotation.y = baseRotation.y + sineWave(time, 0.1, 0.1);
        }
    });

    return <group ref={group} rotation={baseRotation} scale={new THREE.Vector3(1,1,1)} position={[0, 0, baseCameraZ - viewDistance]}>
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <mesh castShadow material={material} geometry={(gltf.nodes.Asset3DLoadersceneRoot as THREE.Mesh).geometry} />
    </group>;
}

function Cup({}): JSX.Element {
    const group = useRef<GroupProps>();
    const gltf = useLoader(GLTFLoader, '/cup.glb');
    
    const mesh = (gltf.nodes.cup as THREE.Mesh);
    const baseRotation = new THREE.Euler(1.627387, -0.65587553, 2.171643);
    let material = gltf.materials['Material.001'];

    material.dithering = true; //fixes color banding issues

    const scaleFactor = 0.043026 * baseScale;
    const scale = new THREE.Vector3(scaleFactor, scaleFactor, scaleFactor);
    const position = new THREE.Vector3(baseScale * 0.5, baseScale * 0, -900);

    const aspect = useThree(state => state.viewport.aspect);
    useEffect(() => {
        if (!group.current)
            return;
        let position = (group.current.position as THREE.Vector3);
        if (aspect < 1) {
            position.x = baseScale * 0.28;
            position.y = baseScale * 0.1;
        } else {
            position.x = baseScale * 0.3;
            position.y = baseScale * 0;
        }
    });

    useFrame((_, delta) => {
        if (!group.current)
            return;
        if (group.current.rotation) {
            let rotation = (group.current.rotation as THREE.Euler);
            rotation.x += delta * 0.05235988;
            rotation.y += delta * 0.06981317;
            rotation.z += delta * 0.04363323;
        }
    });

    return <group ref={group} rotation={baseRotation} scale={scale} position={position} dispose={null}>
        <mesh castShadow receiveShadow geometry={(gltf.nodes.cup as THREE.Mesh).geometry} material={material} />
    </group>
}

function Keyboard({}): JSX.Element {
    const group = useRef<GroupProps>(null!);
    const gltf = useGLTF('/keyboard.glb');
    
    const mesh = (gltf.nodes.keyboard as THREE.Mesh);
    const baseRotation = new THREE.Euler(0.028403261, -1.430315, -1.963495);
    const scaleFactor = 0.0227021 * baseScale;
    const scale = new THREE.Vector3(scaleFactor, scaleFactor, scaleFactor);
    const position = new THREE.Vector3(baseScale * 0, baseScale * 0, -3200);
    const VFOV = useThree(state => (state.camera as PerspectiveCamera).fov);

    useEffect(() => {
        if (!group.current)
            return;
        if (group.current.scale) {
            let scale = (group.current.scale as THREE.Vector3);
            const newScale = scaleFactor * (VFOV/minVFOV) * 1.5;
            scale.x = newScale; scale.y = newScale; scale.z = newScale;
        }
    });

    useFrame((_, delta) => {
        if (!group.current)
            return;
        if (group.current.rotation) {
            let rotation = (group.current.rotation as THREE.Euler);
            rotation.x += delta * 0.01745329;
            rotation.y += delta * 0.1047198;
            rotation.z += delta * 0.03490659;
        }
    });

    return <group ref={group} rotation={baseRotation} scale={scale} position={position} dispose={null}>
        <mesh castShadow receiveShadow geometry={mesh.geometry} rotation={[Math.PI / 2, 0, 0]} material={gltf.materials['Material.001']}>
            <meshStandardMaterial color={'hotpink'} />
        </mesh>
    </group>
}

function CPU({
    mouse, gyro
}:{
    mouse:MutableRefObject<MouseOverData>, gyro:MutableRefObject<GyroData>
}): JSX.Element {
    const group = useRef<THREE.Group>();
    const light = useRef<THREE.Group>();
    const { nodes, materials } = useGLTF("/cpu.glb");
    
    const baseRotation = new THREE.Euler(-2.9755246, 0.127342, -1.2194912);
    const scaleFactor = 0.0227021 * baseScale;
    const scale = new THREE.Vector3(scaleFactor, scaleFactor, scaleFactor);
    const position = new THREE.Vector3(baseScale * 0.10, baseScale * 0, -1600);
    let material = materials['Material.001'];
    material.dithering = true;

    const aspect = useThree(state => state.viewport.aspect);
    useEffect(() => {
        if (!group.current)
            return;
        let position = (group.current.position as THREE.Vector3);
        if (aspect < 1) {
            position.x = baseScale * 0;
            position.y = baseScale * -0.03;
            position.z = -1500;
        } else {
            position.x = baseScale * 0.06;
            position.y = baseScale * 0;
            position.z = -1600;
        }
    });

    useFrame((_, delta) => {
        if (!group.current)
            return;
        if (group.current.rotation) {
            let rotation = (group.current.rotation as THREE.Euler);
            rotation.y += delta * -0.05;
        }

        if (light.current?.rotation) {
            let rotation = (light.current.rotation as THREE.Euler);
            let targetRotationX = rotation.x;
            let targetRotationY = rotation.y;
            if (gyro.current.available) {
                targetRotationX = baseRotation.x + deg2Rad(gyro.current.beta);
                targetRotationY = baseRotation.y - deg2Rad(gyro.current.gamma);
            } else if (mouse.current?.available) {
                targetRotationX = baseRotation.x - ((mouse.current.y / mouse.current.halfW)*(Math.PI/(4*2)));
                targetRotationY = baseRotation.y + ((mouse.current.x / mouse.current.halfH)*(Math.PI/(4*2)));
            }
            //deltas to prevent crazy spinning
            const deltaRotationX = Math.abs(rotation.z - targetRotationX);
            const deltaRotationY = Math.abs(rotation.x - targetRotationY);
            const deltaLimit = Math.PI / 4;
            rotation.x = deltaRotationX < deltaLimit ? lerp(rotation.x, targetRotationX, delta * 3) : targetRotationX;
            rotation.y = deltaRotationY < deltaLimit ? lerp(rotation.y, targetRotationX, delta * 3) : targetRotationY;
        }
    });


    return <>
        <group ref={light} position={position} scale={scale}>
            <pointLight position={[15, -2.5, 5]} />
            <pointLight position={[-10, 0.5, 1]} />
        </group>
        <group ref={group} rotation={baseRotation} scale={scale} position={position} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={(nodes.CPU as THREE.Mesh).geometry}
                material={material}
            />
        </group>
    </>
}

function Paragraph({ }) {

}

//for some reason Next Link doesn't work so this is a work around by using a router hook
//from outside the canvas.
function PageLink({children, href, router}:{
    children: React.ReactNode,
    href: string,
    router: NextRouter
}): JSX.Element {
    const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.preventDefault();
        router.push(href);
    }
    return (
        <a href={href} onClick={handleClick}>{children}</a>
    )
}

function getZIndexFromPosition(positionZ: number): number {
    return positionZ + 10000;
}

type HtmlProps = {
    children?: React.ReactNode,
    positionZ: number,
    zRef?: React.MutableRefObject<number>,
};

type HtmlRef = {
    props: HtmlProps,
    page: HTMLDivElement,
};

function Html(props: HtmlProps): JSX.Element {
    const group = useRef<GroupProps>(null!);
    const camera = useThree(state => state.camera);
    const [page] = React.useState(() => document.createElement('div'));
    const gl = useThree(({ gl }) => gl);
    const scene = useThree(({ scene }) => scene);
    const target = gl.domElement.parentNode;
    if (props.zRef)
        props.zRef.current = props.positionZ;

    React.useEffect(() => {
        if (!group.current)
            return;
        scene.updateMatrixWorld();
        page.style.cssText = "position:absolute;top:0;left:0;transform-origin:0 0;height:100%;width:100%;";
        page.style.zIndex = `${getZIndexFromPosition(props.positionZ)}`;
        if (target) {
            target.appendChild(page);
        }
        return () => {
            if (target) target.removeChild(page);
        }
    }, [target]);

    const styles: React.CSSProperties = {
        position: 'absolute',
        transform: 'translate3d(-50%,-50%,0)',
        width: "100%",
        height: "100%",
        zIndex: "inherit",
    };

    React.useLayoutEffect(() => {
        ReactDOM.render(<div style={styles} children={props.children}/>, page);
    });

    useFrame(() => {
        const positionZ = props.zRef ? props.zRef.current : props.positionZ;
        //check if it should be on screen
        const appearZ = positionZ + 1100;
        if (appearZ < camera.position.z || camera.position.z < positionZ) {
            page.style.visibility = "hidden";
            page.style.display = "none";
            return;
        }
        if (page.style.visibility === "hidden") {
            page.style.visibility = "visible";
            page.style.display = "block";
        }
        //scale UI
        let distance = Math.abs(camera.position.z - positionZ);
        let newScale = viewDistance / distance;
        let baseFontSize = 1;
        let baseWidth = 100;
        page.style.width = `${baseWidth}vw`;
        page.style.fontSize = `${baseFontSize}em`;
        page.style.transform = `translate3d(50%,50%,0) scale(${newScale})`;
        page.style.zIndex = `${getZIndexFromPosition(positionZ)}`;
        //fade in as camera gets near
        const when1 = viewDistance + 100;
        const when0 = viewDistance + when1;
        page.style.opacity = (1 - ((distance - when1)/(when0 - when1))).toString();
    });
    
    return <group ref={group} />
}

function Page({
    children, positionZ
}:{
    children: React.ReactNode,
    positionZ: number
}): JSX.Element {
    const style: React.CSSProperties = {
        maxWidth: "37em",
        paddingLeft: "1em",
        paddingRight: "1em",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
    }

    return <Html positionZ={positionZ}>
        <div style={style}>
            {children}
        </div>
    </Html>
}

type ScrollHandler = {
    y: number
};

function useJumpLinks(scroll: ScrollHandler) {
    type JumpLinkProps = {
        id: string, children: React.ReactNode
    };
    const spring = useSpring<{z: number}>({
        from: {z: scroll.y},
        onRest: (result) => {
            scroll.y = result.value.z;
        },
        onChange: (e) => {
            scroll.y = e.z;
        }
    });
    spring.z.stop(); //stop auto play
    const onClickJump: (id: string) => React.MouseEventHandler<HTMLAnchorElement> = (id) => {
        return (e) => {
            e.preventDefault();
            //fixes issue where Next.js rerenders the site during transitions
            window.history.state.as = `/#${id}`; //by hacking Next.js's history states
            window.history.pushState(window.history.state, "", `/#${id}`);
            const scrollTop = scroll.y;
            const element = document.getElementById(id);
            const displacement = element?.getBoundingClientRect().top;
            if (displacement === undefined)
                return;
            const destination = scrollTop + displacement;
            spring.z.set(scrollTop);
            spring.z.start({to: destination});
        }
    }
    const styles: React.CSSProperties = {
        borderRadius: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        height: "4.5em",
        width: "4.5em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };
    const JumpLink = ({id, children}:JumpLinkProps) => {
        return <a href={`#${id}`} onClick={onClickJump(id)} style={styles}>{children}</a>
    };

    return JumpLink;
}

function FrontContent({
    backButtonRef, scroll
}:{
    backButtonRef: React.MutableRefObject<HTMLDivElement>,
    scroll: ScrollHandler
}): JSX.Element {
    const JumpLink = useJumpLinks(scroll);
    const camera = useThree(state => state.camera);
    const positionZ = baseCameraZ - viewDistance;

    useFrame(() => {
        if (!backButtonRef?.current)
            return;
        const distance = Math.abs(camera.position.z - (positionZ + viewDistance));
        const newOpacity = ((distance / viewDistance) - 1).toString();
        backButtonRef.current.style.opacity = newOpacity;
    });

    return <>
        <Html positionZ={positionZ}>
            <div style={{display:"flex", flexDirection: "column", height: "100%", width: "100%"}}>
                <div style={{height: "50%", display:"flex", flexDirection: "column",}}>
                    <div style={{flexGrow: 1}}></div>
                    <div style={{margin: "auto"}}>
                        <h3 style={{fontFamily: 'sans-serif'}}>Hao Qi Wu</h3>
                    </div>
                    <div style={{flexGrow: 1}}></div>
                </div>
                <div style={{flexGrow: 1}}></div>
                <div style={{
                    display:"flex",
                    justifyContent: "space-evenly",
                    fontFamily: '"Sulphur Point", sans-serif',
                    width: "100%",
                    maxWidth: "37em",
                    margin: "auto",
                }}>
                    <JumpLink id={"contact"}><h4>Contact</h4></JumpLink>
                    <JumpLink id={"portfolio"}><h4>Portfolio</h4></JumpLink>
                    <JumpLink id={"articles"}><h4>Articles</h4></JumpLink>
                </div>
                <div style={{flexGrow: 1}}></div>
            </div>
        </Html>
    </>;
}

function ContactInfo(): JSX.Element {
    return <>
        E-Mail: wuhao64@gmail.com <br />
        <a href={"https://github.com/yourWaifu"}>GitHub profile</a> <br />
        <a href={"https://www.linkedin.com/in/hao-qi-wu"}>LinkedIn profile</a><br />
        <a href={"https://discord.com/users/99259409045143552"}>Discord profile</a>
    </>;
}

function ContactContent(): JSX.Element {
    const aspect = useThree(state => state.viewport.aspect);
    const getStyle = ():React.CSSProperties => {
        return aspect < 1 ? {
            display: "flex",
            height: "100%",
            textAlign: "center",
            flexDirection: "column"
        } : {
            display: "flex",
            flexDirection: "row",
        };
    }
    const [style, setStyle] = useState<React.CSSProperties>(getStyle());
    useEffect(() => setStyle(getStyle()), [aspect < 1]);

    return <Page positionZ={baseCameraZ - viewDistance - 1900}>
        <div style={style}>
            <div style={{
                    display:"flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    flexBasis: "50%",
                    flexShrink: 1,
                }}>
                <div>
                    <h2>Hao Qi Wu</h2>
                    <ContactInfo />
                </div>
            </div>
            <div style={{ flexBasis: "50%" }} />
        </div>
    </Page>;
}

function Portfolio({removeMargins}: {removeMargins?: boolean}): JSX.Element {
    let style: React.CSSProperties = {};
    if (removeMargins) {
        style = {marginTop: 0}
    }
    return <>
        <h2 style={style}><a href="https://yourwaifu.dev/sleepy-discord/">Sleepy Discord</a></h2>
        I made a C++ Library for Discord <br />
        <h2><a href="https://www.heavyeyedgames.com/">Video Games</a></h2>
        <div>
            {/**Floatin element to keep the text from overlapping with the cup */}
            <div style={{float: "right", width: "25%", height:"2.5em"}}></div>
            Game engine with V8 JavaScript. <br />
            Mods for Dota 2.
        </div>
        <h2><a href="https://github.com/yourWaifu">Contributions to Open Source</a></h2>
        Added UI features to the Dolphin Emulator. <br />
        Fixed issues with libraries for Discord. <br />
    </>
}

function PortfolioContent(): JSX.Element {
    return <Page positionZ={baseCameraZ - viewDistance - 1000}>
        <Portfolio removeMargins={true}/>
    </Page>
}

type BackButtonProps = { scroll: ScrollHandler };
const BackButton = React.forwardRef<HTMLDivElement, BackButtonProps>((props, ref): JSX.Element => {
    const JumpLink = useJumpLinks(props.scroll);

    return <div ref={ref} style={{position: "fixed", bottom: "1em", right: "1em", zIndex: 99999999}}>
        <JumpLink id={"front"}><p>HOME</p></JumpLink>
    </div>;
});

function AdaptivePixelRatio() {
    const performance = useThree(state => state.performance);
    const setPixelRatio = useThree(state => state.setDpr);
    let oldCurrent = performance.current;
    useFrame(() => {
        if (oldCurrent != performance.current) {
            setPixelRatio(performance.current * window.devicePixelRatio);
        }
        oldCurrent = performance.current;
    });
    return null;
}

function AutoFOV() {
    const hFOV = 90;
    const viewport = useThree(state => state.viewport);
    const cameraMaybe = useThree(state => state.camera);
    if (!('isPerspectiveCamera' in cameraMaybe) || !cameraMaybe.isPerspectiveCamera)
        return null;
    const camera = cameraMaybe as THREE.PerspectiveCamera;
    useMemo(() => {
        const oldFOV = camera.fov;
        camera.fov = Math.atan( Math.tan( hFOV * Math.PI / 360 ) / camera.aspect ) * 360 / Math.PI;
        if (camera.fov < minVFOV)
            camera.fov = minVFOV;
        if (oldFOV !== camera.fov)
            camera.updateProjectionMatrix();
    }, [viewport.aspect]);
    return null;
}

function CameraPath({scroll}:{scroll: ScrollHandler}) {
    const camera = useThree(state => state.camera);
    useFrame(() => {
        camera.position.z = baseCameraZ - scroll.y;
    });
    return null;
}

function PostProcess() {
    const height = useThree(state => state.viewport.height);
    const group = useRef<GroupProps>(null!);
    return <EffectComposer>
        
    </EffectComposer>
}

function useFadeIn(element: React.MutableRefObject<HTMLDivElement>, options?: {delay?: number}) {
    return useSpring<{op: number}>({
        from: {op: 0},
        to: {op: 1},
        delay: options?.delay,
        onChange: (e) => {
            if (!element.current)
                return;
            element.current.style.opacity = String(e.op);
        }
    });
}


type FadeTransition = (flip?: boolean) => void;
function FadeFromEffect({backgroundColor, transitionRef, router}: {
    backgroundColor: string, transitionRef: React.MutableRefObject<FadeTransition>,
    router: NextRouter
}) {
    let element = useRef<HTMLDivElement>(null!);
    let LoadingText = useRef<HTMLDivElement>(null!);
    let isLoading = useRef<boolean>(true);
    const start = 1;
    const end = 0;
    const screenSpring = useSpring<{op: number}>({
        from: {op: start},
        onRest: () => {
            isLoading.current = false;
        },
        onChange: (e) => {
            if (!element.current)
                return;
            element.current.style.opacity = String(e.op);
        }
    });
    useFadeIn(LoadingText, {delay: 200});

    screenSpring.op.stop();
    transitionRef.current = (flip?: boolean) => {
        const {from, to} = !flip ?
            {from: start, to: end} : {from: end, to: start};
        screenSpring.op.set(from);
        screenSpring.op.start({to});
    }

    const softlockCheck = () => {
        if (isLoading.current === false && screenSpring.op.goal !== end) {
            //keeps the website from soft-locking
            setTimeout(() => {
                screenSpring.op.start({to: end});
            }, 200)
        }
    }

    useEffect(softlockCheck);
    useFadeOut(screenSpring.op, 0, 1, router);

    return <div ref={element} style={{
        backgroundColor: backgroundColor,
        width: "100vw", height: "100vh",
        opacity: 1,
        zIndex: 9999999999999,
        pointerEvents: "none",
        position: "fixed",
        top: 0, left: 0,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }}>
        <p ref={LoadingText} style={{opacity: 0}}>
            LOADING
        </p>
    </div>
}

type AllPostData = {
    data: string,
    title: string,
    id: string,
    date: string,
}[];

type HomeProps = {
    allPostsData: AllPostData;
};

type ArticlesListProps = {
    allPostsData: AllPostData;
    LinkComponent: (props:{href: string, children: React.ReactNode}) => JSX.Element;
}

function ArticlesList(props: ArticlesListProps) {
    return <>
        {props.allPostsData.map((data) => (<div key={data.id}>
            <props.LinkComponent href={`/posts/${data.id}`}>
                {data.title}
            </props.LinkComponent>
            &nbsp;<div style={{float: "right"}}>{getPostDateStr(data.date)}</div>
            <br/>
        </div>))}
    </>
}

function ThreeDeHome({
    allPostsData
}: HomeProps) {
    const router = useRouter();

    const mouse = useRef<MouseOverData>({x: 0, y:0, halfW: 0, halfH: 0});
    const onMouseMove: MouseEventHandler<HTMLDivElement> = useCallback(({ clientX: x, clientY: y }) => 
        (mouse.current = {
            x: x - window.innerWidth / 2,
            y: y - window.innerHeight / 2,
            halfW: window.innerWidth / 2,
            halfH: window.innerHeight / 2,
            available: true
        })
    , []);

    const emptyGyro: GyroData = {
        beta: 0,
        gamma: 0,
        available: false,
        center: {
            beta: 0,
            gamma: 0,
        },
    };
    let gyro = useRef<GyroData>(emptyGyro);
    useEffect(() => {
        const handleOrientation = (data: DeviceOrientationEvent) => {
            if (data.beta !== null && data.gamma !== null) {
                //define center orientation
                if (!gyro.current.available) {
                    gyro.current.center = {
                        beta: data.beta,
                        gamma: data.gamma,
                    };
                }
                gyro.current = {
                    beta: data.beta - gyro.current.center.beta,
                    gamma: data.gamma - gyro.current.center.gamma,
                    available: true,
                    center: gyro.current.center,
                };
            } else {
                gyro.current = emptyGyro;
            }
        };

        window.addEventListener('deviceorientation', handleOrientation);
        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
        }
    });

    const loadingElement = <Html positionZ={0}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
            Loading...
        </div>
    </Html>;

    const backgroundColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--backgroundColor');

    useEffect(() => {
        if (window.location.hash) {
            const elementID = window.location.hash.substring(1);
            document.getElementById(elementID)?.scrollIntoView();
        }
    }, []);

    let backButtonRef = useRef<HTMLDivElement>(null!);
    let fadeTransitionRef = useRef<FadeTransition>(null!);

    let scroll = useRef<HTMLDivElement>(null!);
    useEffect(() => {
        if (!scroll.current)
            return;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        }
    }, []);
    const scrollHandler: ScrollHandler = {
        get y(): number {
            return scroll.current?.scrollTop || document.documentElement.scrollTop;
        },
        set y(value: number) {
            scroll.current?.scrollTo(0, value);
        }
    }

    return <div ref={scroll} style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: -20,
        minWidth: "100%", overflowY: "scroll", display: "flex", flexDirection: "row",
        overflowX: "hidden",
    }}>
        <div
            onMouseMove={onMouseMove}
            style={{
                height: "100vh",
                width: "100vw",
                position: "sticky",
                zIndex: 2,
                top: 0,
                left: 0,
                backgroundColor: backgroundColor,
                flexShrink: 0,
                flexGrow: 0,
            }}
        >
            <Canvas
                orthographic={false}
                shadows
                linear
                camera={{ position: [0, 0, baseCameraZ] }}
                dpr={[0.4, window.devicePixelRatio]}
            >
                <ambientLight intensity={0.5} />

                <Suspense fallback={loadingElement}>
                    <Sig mouse={mouse} gyro={gyro} fadeTransitionRef={fadeTransitionRef} />
                </Suspense>
                <Suspense fallback={null}>
                    <Cup />
                </Suspense>
                <Suspense fallback={null}>
                    <CPU mouse={mouse} gyro={gyro} />
                </Suspense>
                <Suspense fallback={null}>
                    <Keyboard />
                </Suspense>

                <FrontContent backButtonRef={backButtonRef} scroll={scrollHandler} />
                <PortfolioContent />
                <ContactContent />
                <Page positionZ={baseCameraZ - viewDistance - 2700}>
                    <div style={{ textShadow: "2px 2px 5px black" }}>
                        <ArticlesList allPostsData={allPostsData} LinkComponent={(props) => {
                            const forwardProps = { router, ...props };
                            return <PageLink {...forwardProps} />
                        }} />
                    </div>
                </Page>

                <fog attach="fog" args={[backgroundColor, 600, 1000]} />

                <AdaptivePixelRatio />
                <AutoFOV />
                <CameraPath scroll={scrollHandler} />
            </Canvas>
            <BackButton ref={backButtonRef} scroll={scrollHandler} />
            <FadeFromEffect backgroundColor={backgroundColor} transitionRef={fadeTransitionRef} router={router} />
        </div>
        <div style={{
            top: 0, height: "100vh", position: "relative", flexGrow: 1, flexBasis: 1, flexShrink: 0, pointerEvents: "none"
        }}>
            <div id={"front"} style={{ height: "1000px" }} /> {/* front page */}
            <div id={"portfolio"} style={{ height: "900px" }} /> {/* portfolio page */}
            <div id={"contact"} style={{ height: "800px" }} /> {/* contact page */}
            <div id={"articles"} style={{ height: "100%" }} /> {/* the last screen */}
        </div>
    </div>
}

interface StaticContentProps extends HomeProps {
    errorMessage?: JSX.Element,
}

function StaticContent(props: StaticContentProps) {
    return <div style={{maxWidth: "37em", padding: "0 1em", margin: "auto"}}>
        <h1>Hao Qi Wu</h1>
        {props.errorMessage}
        
        <Portfolio />
        <h2>Contact</h2>
        <ContactInfo />
        <h2>Articles</h2>
        <ArticlesList allPostsData={props.allPostsData} LinkComponent={Link} />
        <div style={{height: "1em"}} />
    </div>;
}

//to do make this site wide
function FadeStaticContent(props: StaticContentProps) {
    let content = useRef<HTMLDivElement>(null!);
    let spring = useFadeIn(content);
    const router = useRouter();
    useFadeOut(spring.op, 1, 0, router);

    return <div ref={content} style={{height: "100%", overflowY: "auto"}}>
        <StaticContent {...props} />
    </div>
}

export default function Home(props: HomeProps) {
    const [canUseWebGL, setUseWebGL] = useState<null | boolean>(null);
    useEffect(() => {
        if (canUseWebGL === null) {
            let hasWebGL: boolean = false;
            if (window.WebGLRenderingContext) {
                let canvas = document.createElement("canvas");
                var context = canvas.getContext("webgl")
                    || canvas.getContext("experimental-webgl");
                hasWebGL = Boolean(context && context instanceof WebGLRenderingContext);
            }
    
            setUseWebGL(false);
        }
    }, []);

    const hasJavaScript = canUseWebGL !== null;

    const errorMessage = !hasJavaScript ?
        <p>Please enable JavaScript to view the home page</p>
    : canUseWebGL === false ? 
        <p>
            Please enable WebGL or use a browser with it enabled to view the home page.
            Visit <a href="https://get.webgl.org/">https://get.webgl.org/</a> for more info.
        </p>
    :
        <p>Couldn't display home page, using fail safe</p>
    ;

    const staticContentProps: StaticContentProps = {
        errorMessage,
        ...props
    }

    const errorContent = !hasJavaScript ?
        <noscript>
            <StaticContent {...staticContentProps} />
        </noscript>
    :
        <FadeStaticContent {...staticContentProps} />
    ;
        
    //create a fixed position to prevent overflow
    return <Layout key={"home"}>
        <Head>
            <title>Hao Qi Wu</title>
        </Head>
        <div style={{width: "100vw", height: "100vh", position: "fixed"}}>
            {(canUseWebGL === true) &&  <ThreeDeHome {...props}/> }
            {errorContent}
        </div>
    </Layout>
}

export const getStaticProps: GetStaticProps = async () => {
    const allPostsData = await getSortedPostsData();
    return {
        props: {
            allPostsData
        }
    }
}