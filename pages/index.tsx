import Head from 'next/head'
import Layout from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import { getPostDateStr } from './posts/[id]'
import { Canvas, useFrame, useLoader, useThree, extend } from "@react-three/fiber"
import React, { useRef, Suspense, useCallback, MutableRefObject, MouseEventHandler, useEffect, UIEventHandler, RefObject, ReactNode } from 'react'
import { GLTFLoader, EffectComposer, RenderPass, ShaderPass } from 'three-stdlib';
import * as THREE from 'three'
import { Html, Stats } from '@react-three/drei'
import state from '../lib/store' //metadata about the content on index
import { Block, useBlock } from '../components/blocks' //system for splitting content into blocks that fill the screen
import { GroupProps } from '@react-three/fiber/dist/declarations/src/three-types'
import lerp from '../lib/lerp' //common linear interpolation
import { useSpring } from 'react-spring'

const baseCameraZ = 500;

extend({ EffectComposer, ShaderPass, RenderPass });

function PostProcess() { //can't seem to get this to work
    const { scene, camera, size } = useThree();
    return null;
}

function sineWave(time: number, amp: number, frequency: number, phase: number = 0) {
    return amp * Math.sin((frequency * time) + phase);
}

function deg2Rad(deg: number) {
    return deg * (Math.PI / 180);
}

interface MouseOverData {x: number, y: number, halfW: number, halfH: number, available?: boolean};
interface GyroData {beta: number, gamma: number, available?: boolean, center: { beta: number, gamma: number } }

const dummy = new THREE.Object3D();
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

    dummy.position.set(0, 0, 0);
    dummy.rotation.set(Math.PI / 2, 0, 0);

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

    return <group ref={group} rotation={baseRotation} scale={new THREE.Vector3(1,1,1)}>
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <mesh material={material} geometry={(gltf.nodes.Asset3DLoadersceneRoot as THREE.Mesh).geometry} />
    </group>;
}

function Cup({}): JSX.Element {
    const group = useRef<GroupProps>();
    const gltf = useLoader(GLTFLoader, '/cup.glb');

    const { baseScale } = useBlock();
    
    const mesh = (gltf.nodes.Circle as THREE.Mesh);
    const baseRotation = new THREE.Euler(1.627387, -0.65587553, 2.171643);

    useFrame((_, delta) => {
        if (!group.current)
            return;
        const newScale = 0.043026 * baseScale;
        if (group.current.scale && ((group.current.scale) as THREE.Vector3).x != newScale) {
            let scale = (group.current.scale as THREE.Vector3);
            scale.x = newScale;
            scale.y = newScale;
            scale.z = newScale;

            if (group.current.position) {
                let position = (group.current.position as THREE.Vector3);
                position.x = baseScale * 0.1;
                position.y = baseScale * -0.11;
                position.z = baseScale * 0.4;
            }
        }
        if (group.current.rotation) {
            let rotation = (group.current.rotation as THREE.Euler);
            rotation.x += delta * 0.05235988;
            rotation.y += delta * 0.06981317;
            rotation.z += delta * 0.04363323;
        }
    });

    return <group ref={group} rotation={baseRotation}>
        <mesh geometry={mesh.geometry}>
            <meshStandardMaterial color={'slategray'} />
        </mesh>
    </group>
}

function Keyboard({}): JSX.Element {
    const group = useRef<GroupProps>(null!);
    const gltf = useLoader(GLTFLoader, '/keyboard.glb');

    const { baseScale } = useBlock();
    
    const mesh = (gltf.nodes.Cube as THREE.Mesh);
    const baseRotation = new THREE.Euler(0.028403261, -1.430315, -1.963495);

    useFrame((_, delta) => {
        if (!group.current)
            return;
        const newScale = 0.0227021 * baseScale;
        if (group.current.scale && ((group.current.scale) as THREE.Vector3).x != newScale) {
            let scale = (group.current.scale as THREE.Vector3);
            scale.x = newScale;
            scale.y = newScale;
            scale.z = newScale;

            if (group.current.position) {
                let position = (group.current.position as THREE.Vector3);
                position.x = baseScale * -0.1;
                position.y = baseScale * 0.25;
                position.z = baseScale * -0.3;
            }
        }
        if (group.current.rotation) {
            let rotation = (group.current.rotation as THREE.Euler);
            rotation.x += delta * 0.01745329;
            rotation.y += delta * 0.1047198;
            rotation.z += delta * 0.03490659;
        }
    })

    return <group ref={group} rotation={baseRotation}>
        <mesh geometry={mesh.geometry}>
            <meshStandardMaterial color={'hotpink'} />
        </mesh>
    </group>
}

function Box(props: JSX.IntrinsicElements['mesh']) {
    // This reference will give us direct access to the mesh
    const mesh = useRef<THREE.Mesh>(null!)
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => {
        mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    })
    return (
        <mesh
            {...props}
            ref={mesh}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={'orange'} />
        </mesh>
    )
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

function FrontContent({}:{}): JSX.Element {
    const page = useRef<HTMLDivElement>(null!);
    const pageChild = useRef<HTMLDivElement>(null!);
    const camera = useThree(state => state.camera);
    const positionZ = 0;

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

    useFrame(() => {
        if (!page.current)
            return;
        //check if it should be on screen
        if (camera.position.z < positionZ) {
            page.current.style.visibility = "hidden";
            return;
        } else if (page.current.style.visibility === "hidden") {
            page.current.style.visibility = "visible";
        }
        //scale UI
        let distance = Math.abs(camera.position.z - positionZ);
        let newScale = baseCameraZ / distance;
        let baseFontSize = 1;
        let baseWidth = 100;
        page.current.style.width = `${baseWidth /** newScale*/}vw`;
        page.current.style.fontSize = `${baseFontSize /** newScale*/}em`;
        pageChild.current.style.transform = `scale(${newScale})`;
    });

    const onClickJump: (z: number) => React.MouseEventHandler<HTMLAnchorElement> = (z) => {
        return (e) => {
            e.preventDefault();
            spring.z.set(document.documentElement.scrollTop || document.body.scrollTop);
            spring.z.start({to: z});
        }
    }

    return <group>
        <Html center ref={page}>
            <div ref={pageChild} style={{display:"flex", justifyContent: "space-around", fontFamily: '"Sulphur Point", sans-serif'}}>
                <a href={"#"} onClick={onClickJump(1900)}><h3>Contact</h3></a>
                <a href={"#"} onClick={onClickJump(1000)}><h3>Portfolio</h3></a>
                <a href={"#"} onClick={onClickJump(2700)}><h3>Articles</h3></a>
            </div>
        </Html>
    </group>;
}

function Page({
    children, positionZ
}:{
    children: React.ReactNode,
    positionZ: number
}): JSX.Element {
    const page = useRef<HTMLDivElement>(null!);
    const pageChild = useRef<HTMLDivElement>(null!); //need for transform
    const camera = useThree(state => state.camera);

    useFrame(() => {
        if (!page.current)
            return;
        //check if it should be on screen
        const appearZ = positionZ + 1100;
        if (appearZ < camera.position.z || camera.position.z < positionZ) {
            page.current.style.visibility = "hidden";
            return;
        }
        if (page.current.style.visibility === "hidden") {
            page.current.style.visibility = "visible";
        }
        //scale UI
        let distance = Math.abs(camera.position.z - positionZ);
        let newScale = baseCameraZ / distance;
        let baseFontSize = 1;
        let baseWidth = 100;
        page.current.style.width = `${baseWidth}vw`;
        page.current.style.fontSize = `${baseFontSize}em`;
        pageChild.current.style.transform = `scale(${newScale})`;
        //fade in as camera gets near
        const when0 = 1100;
        const when1 = 600;
        page.current.style.opacity = (1 - ((distance - when1)/(when0 - when1))).toString();
    });
    
    return <Html center ref={page}>
        <div ref={pageChild}>
            {children}
        </div>
    </Html>;
}

function ContactContent(): JSX.Element {
    return <Page positionZ={-2000}>
        <h2>Hao Qi Wu</h2>
        <p>GitHub, E-Mail, Linked-In, Discord</p>
    </Page>;
}

function PortfolioContent(): JSX.Element {
    return <Page positionZ={-1100}>
        <h2>Take a look at my Github</h2>
        <a href="https://github.com/yourWaifu">Link</a>
    </Page>
}

function AdaptivePixelRatio() {
    const current = useThree(state => state.performance.current);
    const setPixelRatio = useThree(state => state.setDpr);
    useEffect(() => {
        setPixelRatio(current * window.devicePixelRatio);
    }, [current]);
    return null;
}

function AutoFOV() {
    const hFOV = 90;
    const cameraMaybe = useThree(state => state.camera);
    if (!('isPerspectiveCamera' in cameraMaybe) || !cameraMaybe.isPerspectiveCamera)
        return null;
    const camera = cameraMaybe as THREE.PerspectiveCamera;
    useFrame(() => {
        const oldFOV = camera.fov;
        camera.fov = Math.atan( Math.tan( hFOV * Math.PI / 360 ) / camera.aspect ) * 360 / Math.PI;
        if (camera.fov < 30)
            camera.fov = 30;
        if (oldFOV !== camera.fov)
            camera.updateProjectionMatrix();
    });
    return null;
}

function CameraPath({}:{}) {
    const camera = useThree(state => state.camera);
    useFrame(() => {
        let scrollPos = document.body.scrollTop || document.documentElement.scrollTop;
        camera.position.z = baseCameraZ - (scrollPos);
        //for some reason, going under 0 causes issues with drei's Html
        //if (camera.position.z <= 0)
        //    camera.position.z = 0.00000001;
    });
    return null;
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
    const useCanvas = true;

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
    if (process.browser) {
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
    }

    return <Layout key={"index"}>
        { ( process.browser && useCanvas ) && <>
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
                    camera={{ position: [0, 0, baseCameraZ] }}
                    dpr={[0.4, window.devicePixelRatio]}
                >
                    <ambientLight intensity={0.5} />
                    
                    <Suspense fallback={<Html center className="loading" children="Loading..." />}>
                        <Sig mouse={mouse} gyro={gyro}/>
                        <Cup />
                        <Keyboard />
                    </Suspense>

                    <FrontContent/>
                    <PortfolioContent />
                    <ContactContent />
                    <Page positionZ={-2800}>
                        {allPostsData.map((data) => (<>
                            <PageLink href={`posts/${data.id}`} router={router}>
                                {data.title}
                            </PageLink>
                            &nbsp;{getPostDateStr(data.date)}
                            <br/>
                        </>))}
                    </Page>

                    <AdaptivePixelRatio />
                    <AutoFOV />
                    <Stats />
                    <CameraPath/>
                </Canvas>
            </div>
            <div style={{width: "100%", height: "100%", position: "absolute", zIndex:-9 }} >
                <div style={{height: "1000px"}} /> {/* front page */}
                <div style={{height: "900px"}} /> {/* portfolio page */}
                <div style={{height: "800px"}} /> {/* contact page */}
                <div style={{height: "100%"}} /> {/* the last screen */}
            </div>
        </>}
        <h1>Hao Qi Wu</h1>
        <h2>Contact</h2>
        <h2>Articles</h2>
        {allPostsData.map((data) => (<>
            <Link href={`posts/${data.id}`}>
                <a>{data.title}</a>
            </Link>
            &nbsp;{getPostDateStr(data.date)}
            <br/>
        </>))}
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