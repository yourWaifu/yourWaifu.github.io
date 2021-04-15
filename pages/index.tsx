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
import { useSpring } from 'react-spring'
import { EffectComposer, DepthOfField, Bloom, SSAO } from '@react-three/postprocessing'
import ReactDOM from 'react-dom'

const baseCameraZ = 500;
const viewDistance = 500;

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
    mouse, gyro
}:{
    mouse:MutableRefObject<MouseOverData>, gyro:MutableRefObject<GyroData>
}): JSX.Element {
    const group = useRef<GroupProps>();
    const gltf = useLoader(GLTFLoader, '/sig.glb');
    const material = new THREE.MeshBasicMaterial({ color: new THREE.Color('white') });

    const { size, gl, scene } = useThree();
    const ration = gl.getPixelRatio();

    let time = 0.0;
    const baseRotation = new THREE.Euler(Math.PI / 2, 0, 0);

    let { viewportWidth, viewportHeight, canvasWidth, canvasHeight, baseScale } = useBlock();
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

    const { baseScale } = useBlock();
    
    const mesh = (gltf.nodes.cup as THREE.Mesh);
    const baseRotation = new THREE.Euler(1.627387, -0.65587553, 2.171643);

    const scaleFactor = 0.043026 * baseScale;
    const scale = new THREE.Vector3(scaleFactor, scaleFactor, scaleFactor);
    const position = new THREE.Vector3(
        baseScale * 0.5,
        baseScale * 0,
        baseScale * -1
    )

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
        <mesh castShadow receiveShadow geometry={(gltf.nodes.cup as THREE.Mesh).geometry} material={gltf.materials['Material.001']} />
    </group>
}

function Keyboard({}): JSX.Element {
    const group = useRef<GroupProps>(null!);
    const gltf = useGLTF('/keyboard.glb');

    const { baseScale } = useBlock();
    
    const mesh = (gltf.nodes.keyboard as THREE.Mesh);
    const baseRotation = new THREE.Euler(0.028403261, -1.430315, -1.963495);
    const scaleFactor = 0.0227021 * baseScale;
    const scale = new THREE.Vector3(scaleFactor, scaleFactor, scaleFactor);
    const position = new THREE.Vector3(
        baseScale * -0.9,
        baseScale * 0,
        baseScale * -3.20
    );

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

function CPU(): JSX.Element {
    const group = useRef<THREE.Group>();
    const { nodes, materials } = useGLTF("/cpu.glb");

    const { baseScale } = useBlock();
    
    const baseRotation = new THREE.Euler(-2.9755246, 0.127342, -1.2194912);
    const scaleFactor = 0.0227021 * baseScale;
    const scale = new THREE.Vector3(scaleFactor, scaleFactor, scaleFactor);
    const position = new THREE.Vector3(
        baseScale * 0,
        baseScale * 0.3,
        baseScale * -2
    );

    useFrame((_, delta) => {
        if (!group.current)
            return;
        if (group.current.rotation) {
            let rotation = (group.current.rotation as THREE.Euler);
            rotation.y += delta * -0.02;
        }
    });

    return <group ref={group} rotation={baseRotation} scale={scale} position={position} dispose={null}>
        <mesh
            castShadow
            receiveShadow
            geometry={(nodes.CPU as THREE.Mesh).geometry}
            material={materials['Material.001']}
        />
    </group>
}

function Paragraph({ }) {

}

//for some reason Next Link doesn't work so this is a work around by using a router hook
//from outside the canvas.
function PageLink({children, href, router}:{
    children: React.ReactNode,
    href: string;
    router: NextRouter;
}): JSX.Element {
    const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.preventDefault();
        console.log(router);
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
    }, [target])

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

function useJumpLinks() {
    type JumpLinkProps = {
        id: string, children: React.ReactNode
    };
    const spring = useSpring<{z: number}>({
        from: {z: document.documentElement.scrollTop},
        onRest: (result) => {
            document.body.scrollTo(0, result.value.z);
            document.documentElement.scrollTo(0, result.value.z);
        },
        onChange: (e) => {
            document.documentElement.scrollTop = e.z;
        }
    });
    const onClickJump: (id: string) => React.MouseEventHandler<HTMLAnchorElement> = (id) => {
        return (e) => {
            e.preventDefault();
            history.pushState({}, "", `#${id}`);
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
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
    backButtonRef
}:{
    backButtonRef: React.MutableRefObject<HTMLDivElement>
}): JSX.Element {
    const JumpLink = useJumpLinks();
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
                    <JumpLink id={"contact"}><h3>Contact</h3></JumpLink>
                    <JumpLink id={"portfolio"}><h3>Portfolio</h3></JumpLink>
                    <JumpLink id={"articles"}><h3>Articles</h3></JumpLink>
                </div>
                <div style={{flexGrow: 1}}></div>
            </div>
        </Html>
    </>;
}

function ContactContent(): JSX.Element {
    return <Page positionZ={baseCameraZ - viewDistance - 1900}>
        <h2>Hao Qi Wu</h2>
        <p>E-Mail: wuhao64@gmail.com</p>
        <a href={"https://discord.com/users/99259409045143552"}>Discord: Sleepy Flower Girl</a>
    </Page>;
}

function PortfolioContent(): JSX.Element {
    return <Page positionZ={baseCameraZ - viewDistance - 1000}>
        <h2><a href="https://yourwaifu.dev/sleepy-discord/">Sleepy Discord</a></h2>
        C++ Library for Discord. I'm the author of this library.
        <a href="https://yourwaifu.dev/sleepy-discord/">More info here.</a>
        <h2>Contributions to Open Source</h2>
        <a href="https://github.com/yourWaifu">See my Github Profile</a>
        <h2><a href="https://yourwaifu.dev/is-your-waifu-legal/">Is Your Waifu Legal</a></h2>
        Website listing the ages of people in anime and video games
    </Page>
}

type BackButtonProps = { };
const BackButton = React.forwardRef<HTMLDivElement, BackButtonProps>((_, ref): JSX.Element => {
    const JumpLink = useJumpLinks();

    return <div ref={ref} style={{position: "fixed", bottom: "1em", right: "1em", zIndex: 99999999}}>
        <JumpLink id={"front"}>Home</JumpLink>
    </div>;
});

function AdaptivePixelRatio() {
    const performance = useThree(state => state.performance);
    const setPixelRatio = useThree(state => state.setDpr);
    let oldCurrent = performance.current;
    useFrame(() => {
        if (oldCurrent != performance.current) {
            setPixelRatio(performance.current * window.devicePixelRatio);
            console.log("update res");
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
        if (camera.fov < 75)
            camera.fov = 75;
        if (oldFOV !== camera.fov)
            camera.updateProjectionMatrix();
    }, [viewport.aspect]);
    return null;
}

function CameraPath({}:{}) {
    const camera = useThree(state => state.camera);
    useFrame(() => {
        let scrollPos = document.body.scrollTop || document.documentElement.scrollTop;
        camera.position.z = baseCameraZ - (scrollPos);
    });
    return null;
}

function PostProcess() {
    const height = useThree(state => state.viewport.height);
    const group = useRef<GroupProps>(null!);
    return <EffectComposer>
        
    </EffectComposer>
}

export default function Home({
    allPostsData
}: {
    allPostsData: {
        data: string,
        title: string,
        id: string,
        date: string,
    }[]
}) {
    const router = useRouter();

    const [useCanvas, setUseCanvas] = useState(false);
    useEffect(() => {
        setUseCanvas(true);
    });

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

    let backButtonRef = useRef<HTMLDivElement>(null!);

    return <Layout key={"home"}>
        <Head>
            <title>Hao Qi Wu</title>
        </Head>
        { ( useCanvas ) && <>
            <div
                onMouseMove={onMouseMove}
                style={{
                    height: "100vh",
                    width: "100%",
                    position: "fixed",
                    zIndex:2,
                    top: 0,
                    left:0,
                    right:0,
                    backgroundColor: "var(--backgroundColor)",
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
                    
                    <Suspense fallback={<Html positionZ={0}><div style={{display:"flex", justifyContent: "space-around"}}>Loading...</div></Html>}>
                        <Sig mouse={mouse} gyro={gyro}/>
                    </Suspense>
                    <Suspense fallback={null}>
                        <Cup />
                    </Suspense>
                    <Suspense fallback={null}>
                        <CPU />
                    </Suspense>
                    <Suspense fallback={null}>
                        <Keyboard />
                    </Suspense>

                    <FrontContent backButtonRef={backButtonRef} />
                    <PortfolioContent />
                    <ContactContent />
                    <Page positionZ={baseCameraZ - viewDistance - 2700}>
                        {allPostsData.map((data) => (<div key={data.id}>
                            <PageLink href={`/posts/${data.id}`} router={router}>
                                {data.title}
                            </PageLink>
                            &nbsp;{getPostDateStr(data.date)}
                            <br/>
                        </div>))}
                    </Page>

                    <AdaptivePixelRatio />
                    <AutoFOV />
                    <CameraPath/>
                </Canvas>
                <BackButton ref={backButtonRef} />
            </div>
            <div style={{width: "100%", height: "100%", position: "absolute", zIndex:-9, top: 0 }} >
                <div id={"front"} style={{height: "1000px"}} /> {/* front page */}
                <div id={"portfolio"} style={{height: "900px"}} /> {/* portfolio page */}
                <div id={"contact"} style={{height: "800px"}} /> {/* contact page */}
                <div id={"articles"} style={{height: "100%"}} /> {/* the last screen */}
            </div>
        </>}
        <h1>Hao Qi Wu</h1>
        Please enable JavaScript to view the home page
        <a href="https://github.com/yourWaifu">Github Profile</a>
        <h2>Contact</h2>
        E-Mail: wuhao64@gmail.com
        <a href={"https://discord.com/users/99259409045143552"}>Discord: Sleepy Flower Girl</a>
        <h2>Articles</h2>
        {allPostsData.map((data) => (<div key={data.id}>
            <Link href={`/posts/${data.id}`}>
                <a>{data.title}</a>
            </Link>
            &nbsp;{getPostDateStr(data.date)}
            <br/>
        </div>))}
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