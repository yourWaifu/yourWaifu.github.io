(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(1383)}])},2351:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(5893),i=n(9008),o=n.n(i),s=n(7294);function l(e){let{children:t}=e;return s.useEffect(()=>{document.documentElement.lang="en"}),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(o(),{children:[(0,r.jsx)("meta",{charSet:"utf-8"}),(0,r.jsx)("link",{rel:"apple-touch-icon",sizes:"180x180",href:"/apple-touch-icon.png"}),(0,r.jsx)("link",{rel:"icon",type:"image/png",sizes:"32x32",href:"/favicon-32x32.png"}),(0,r.jsx)("link",{rel:"icon",type:"image/png",sizes:"16x16",href:"/favicon-16x16.png"}),(0,r.jsx)("link",{rel:"manifest",href:"/site.webmanifest"}),(0,r.jsx)("meta",{name:"msapplication-TileColor",content:"#da532c"}),(0,r.jsx)("meta",{name:"theme-color",content:"#ffffff"}),(0,r.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"})]}),(0,r.jsx)("main",{style:{top:0,left:0,right:0,bottom:0,position:"absolute"},children:t}),(0,r.jsx)("noscript",{})]})}},1383:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return A},default:function(){return O}});var r=n(5893),i=n(9008),o=n.n(i),s=n(2351),l=n(1664),a=n.n(l),c=n(1163),u=n(3477),d=n(4694),h=n(7294),f=n(7607),x=n(2212),p=n(2191),m={pages:8,sections:9,zoom:75};let y=(0,h.createContext)(0);var j=n(7863),g=n(745),v=n(803);function w(e){return Math.PI/180*e}function b(e){let{mouse:t,gyro:n,fadeTransitionRef:i}=e;(0,h.useEffect)(()=>{i.current&&i.current()},[]);let o=(0,h.useRef)(),s=(0,d.U2)(f.E,"/sig.glb"),l=new x.MeshBasicMaterial({color:new x.Color("white").setScalar(5)}),{size:a,gl:c,scene:u}=(0,d.Ky)();c.getPixelRatio();let p=0,j=new x.Euler(Math.PI/2,0,0),{viewportWidth:g,viewportHeight:v}=function(){let{sections:e,pages:t,zoom:n}=m,{size:r,viewport:i}=(0,d.Ky)(),o=(0,h.useContext)(y),s=i.width*n,l=i.height*n,a=s/n,c=r.width<700;return{viewport:i,offset:o,viewportWidth:s,viewportHeight:l,canvasWidth:a,canvasHeight:l/n,mobile:c,margin:a*(c?.2:.1),contentMaxWidth:a*(c?.8:.6),sectionHeight:(t-1)/(e-1)*a,offsetFactor:(o+1)/e,baseScale:894.9274309237762}}();return(0,d.xQ)((e,r)=>{var i,s,l;if(p+=r,(null===(i=o.current)||void 0===i?void 0:i.scale)&&298.30914364125874!=o.current.scale.x){let e=o.current.scale;e.x=298.30914364125874,e.y=298.30914364125874,e.z=298.30914364125874}if(null===(s=o.current)||void 0===s?void 0:s.rotation){let e=o.current.rotation;if(n.current.available){let t=j.z+w(n.current.gamma),i=j.x-w(n.current.beta);e.z=e.z*(1-r)+t*r,e.x=e.x*(1-r)+i*r}else if(null===(l=t.current)||void 0===l?void 0:l.available){let n=j.z-t.current.x/t.current.halfW*(Math.PI/16),i=j.x+t.current.y/t.current.halfH*(Math.PI/8),o=Math.abs(e.z-n),s=Math.abs(e.x-i),l=Math.PI/4;e.z=o<l?e.z*(1-r)+n*r:n,e.x=s<l?e.x*(1-r)+i*r:i}e.y=j.y+function(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;return .1*Math.sin(.1*e+r)}(p,.1,.1)}}),(0,r.jsxs)("group",{ref:o,rotation:j,scale:new x.Vector3(1,1,1),position:[0,0,0],children:[(0,r.jsx)("spotLight",{position:[10,10,10],angle:.15,penumbra:1}),(0,r.jsx)("pointLight",{position:[-10,-10,-10]}),(0,r.jsx)("mesh",{castShadow:!0,material:l,geometry:s.nodes.Asset3DLoadersceneRoot.geometry})]})}function E(e){let{}=e,t=(0,h.useRef)(),n=(0,d.U2)(f.E,"/cup.glb");n.nodes.cup;let i=new x.Euler(1.627387,-.65587553,2.171643),o=n.materials["Material.001"];o.dithering=!0;let s=new x.Vector3(38.505147642926396,38.505147642926396,38.505147642926396),l=new x.Vector3(447.4637154618881,0,-900),a=(0,d.Ky)(e=>e.viewport.aspect);return(0,h.useEffect)(()=>{if(!t.current)return;let e=t.current.position;a<1?(e.x=250.57968065865737,e.y=89.49274309237762):(e.x=268.47822927713287,e.y=0)}),(0,d.xQ)((e,n)=>{if(t.current&&t.current.rotation){let e=t.current.rotation;e.x+=.05235988*n,e.y+=.06981317*n,e.z+=.04363323*n}}),(0,r.jsx)("group",{ref:t,rotation:i,scale:s,position:l,dispose:null,children:(0,r.jsx)("mesh",{castShadow:!0,receiveShadow:!0,geometry:n.nodes.cup.geometry,material:o})})}function R(e){let{}=e,t=(0,h.useRef)(null),n=(0,p.L)("/keyboard.glb"),i=n.nodes.keyboard,o=new x.Euler(.028403261,-1.430315,-1.963495),s=new x.Vector3(20.31673202957466,20.31673202957466,20.31673202957466),l=new x.Vector3(0,0,-3200),a=(0,d.Ky)(e=>e.camera.fov);return(0,h.useEffect)(()=>{if(t.current&&t.current.scale){let e=t.current.scale,n=a/75*30.47509804436199;e.x=n,e.y=n,e.z=n}}),(0,d.xQ)((e,n)=>{if(t.current&&t.current.rotation){let e=t.current.rotation;e.x+=.01745329*n,e.y+=.1047198*n,e.z+=.03490659*n}}),(0,r.jsx)("group",{ref:t,rotation:o,scale:s,position:l,dispose:null,children:(0,r.jsx)("mesh",{castShadow:!0,receiveShadow:!0,geometry:i.geometry,rotation:[Math.PI/2,0,0],material:n.materials["Material.001"],children:(0,r.jsx)("meshStandardMaterial",{color:"hotpink"})})})}function C(e){let{mouse:t,gyro:n}=e,i=(0,h.useRef)(),o=(0,h.useRef)(),{nodes:s,materials:l}=(0,d.U2)(f.E,"/cpu.glb"),a=new x.Euler(-2.9755246,.127342,-1.2194912),c=new x.Vector3(20.31673202957466,20.31673202957466,20.31673202957466),u=new x.Vector3(89.49274309237762,0,-1600),p=l["Material.001"];p.dithering=!0;let m=(0,d.Ky)(e=>e.viewport.aspect);return(0,h.useEffect)(()=>{if(!i.current)return;let e=i.current.position;m<1?(e.x=0,e.y=-26.847822927713285,e.z=-1500):(e.x=53.69564585542657,e.y=0,e.z=-1600)}),(0,d.xQ)((e,r)=>{var s,l,c,u,d,h,f,x;if(i.current){if(i.current.rotation){let e=i.current.rotation;e.y+=-.05*r}if(null===(s=o.current)||void 0===s?void 0:s.rotation){let e=o.current.rotation,i=e.x,s=e.y;n.current.available?(i=a.x+w(n.current.beta),s=a.y-w(n.current.gamma)):(null===(l=t.current)||void 0===l?void 0:l.available)&&(i=a.x-t.current.y/t.current.halfW*(Math.PI/8),s=a.y+t.current.x/t.current.halfH*(Math.PI/8));let p=Math.abs(e.z-i),m=Math.abs(e.x-s),y=Math.PI/4;e.x=p<y?(c=e.x,u=i,c*(1-(d=3*r))+u*d):i,e.y=m<y?(h=e.y,f=i,h*(1-(x=3*r))+f*x):s}}}),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("group",{ref:o,position:u,scale:c,children:[(0,r.jsx)("pointLight",{position:[15,-2.5,5]}),(0,r.jsx)("pointLight",{position:[-10,.5,1]})]}),(0,r.jsx)("group",{ref:i,rotation:a,scale:c,position:u,dispose:null,children:(0,r.jsx)("mesh",{castShadow:!0,receiveShadow:!0,geometry:s.CPU.geometry,material:p})})]})}function S(e){let{children:t,href:n,router:i}=e;return(0,r.jsx)("a",{href:n,onClick:e=>{e.preventDefault(),i.push(n)},children:t})}function k(e){let t=h.useRef(),n=(0,h.useRef)(null),i=(0,d.Ky)(e=>e.camera),[o]=h.useState(()=>document.createElement("div")),s=(0,d.Ky)(e=>{let{gl:t}=e;return t}),l=(0,d.Ky)(e=>{let{scene:t}=e;return t}),a=s.domElement.parentNode;e.zRef&&(e.zRef.current=e.positionZ),h.useLayoutEffect(()=>{if(!n.current)return;let r=t.current=g.createRoot(o);return l.updateMatrixWorld(),o.style.cssText="position:absolute;top:0;left:0;transform-origin:0 0;height:100%;width:100%;",o.style.zIndex="".concat(e.positionZ+1e4),a&&a.appendChild(o),()=>{a&&a.removeChild(o),r.unmount()}},[a]);let c={position:"absolute",transform:"translate3d(-50%,-50%,0)",width:"100%",height:"100%",zIndex:"inherit"};return h.useLayoutEffect(()=>{var n;null===(n=t.current)||void 0===n||n.render((0,r.jsx)("div",{style:c,children:e.children}))}),(0,d.xQ)(()=>{let t=e.zRef?e.zRef.current:e.positionZ;if(t+1100<i.position.z||i.position.z<t){o.style.visibility="hidden",o.style.display="none";return}"hidden"===o.style.visibility&&(o.style.visibility="visible",o.style.display="block");let n=Math.abs(i.position.z-t);o.style.width="".concat(100,"vw"),o.style.fontSize="".concat(1,"em"),o.style.transform="translate3d(50%,50%,0) scale(".concat(500/n,")"),o.style.zIndex="".concat(t+1e4),o.style.opacity=(1-(n-600)/500).toString()}),(0,r.jsx)("group",{ref:n})}function z(e){let{children:t,positionZ:n}=e;return(0,r.jsx)(k,{positionZ:n,children:(0,r.jsx)("div",{style:{maxWidth:"37em",paddingLeft:"1em",paddingRight:"1em",margin:"auto",display:"flex",flexDirection:"column",justifyContent:"center",height:"100%"},children:t})})}function M(e){let t=(0,j.useSpring)({from:{z:e.y},onRest:t=>{e.y=t.value.z},onChange:t=>{e.y=t.z}});t.z.stop();let n=n=>r=>{r.preventDefault(),window.history.state.as="/#".concat(n),window.history.pushState(window.history.state,"","/#".concat(n));let i=e.y,o=document.getElementById(n),s=null==o?void 0:o.getBoundingClientRect().top;void 0!==s&&(t.z.set(i),t.z.start({to:i+s}))},i={borderRadius:"100%",backgroundColor:"rgba(0,0,0,0.5)",height:"4.5em",width:"4.5em",display:"flex",alignItems:"center",justifyContent:"center"};return e=>{let{id:t,children:o}=e;return(0,r.jsx)("a",{href:"#".concat(t),onClick:n(t),style:i,children:o})}}function P(e){let{backButtonRef:t,scroll:n}=e,i=M(n),o=(0,d.Ky)(e=>e.camera);return(0,d.xQ)(()=>{if(!(null==t?void 0:t.current))return;let e=(Math.abs(o.position.z-500)/500-1).toString();t.current.style.opacity=e}),(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(k,{positionZ:0,children:(0,r.jsxs)("div",{style:{display:"flex",flexDirection:"column",height:"100%",width:"100%"},children:[(0,r.jsxs)("div",{style:{height:"50%",display:"flex",flexDirection:"column"},children:[(0,r.jsx)("div",{style:{flexGrow:1}}),(0,r.jsx)("div",{style:{margin:"auto"},children:(0,r.jsx)("h3",{style:{fontFamily:"sans-serif"},children:"Hao Qi Wu"})}),(0,r.jsx)("div",{style:{flexGrow:1}})]}),(0,r.jsx)("div",{style:{flexGrow:1}}),(0,r.jsxs)("div",{style:{display:"flex",justifyContent:"space-evenly",fontFamily:'"Sulphur Point", sans-serif',width:"100%",maxWidth:"37em",margin:"auto"},children:[(0,r.jsx)(i,{id:"contact",children:(0,r.jsx)("h4",{children:"Contact"})}),(0,r.jsx)(i,{id:"portfolio",children:(0,r.jsx)("h4",{children:"Portfolio"})}),(0,r.jsx)(i,{id:"articles",children:(0,r.jsx)("h4",{children:"Articles"})})]}),(0,r.jsx)("div",{style:{flexGrow:1}})]})})})}function I(){return(0,r.jsxs)(r.Fragment,{children:["E-Mail: wuhao64@gmail.com ",(0,r.jsx)("br",{}),(0,r.jsx)("a",{href:"https://github.com/yourWaifu",children:"GitHub profile"})," ",(0,r.jsx)("br",{}),(0,r.jsx)("a",{href:"https://www.linkedin.com/in/hao-qi-wu",children:"LinkedIn profile"}),(0,r.jsx)("br",{}),(0,r.jsx)("a",{href:"https://discord.com/users/99259409045143552",children:"Discord profile"})]})}function D(){let e=(0,d.Ky)(e=>e.viewport.aspect),t=()=>e<1?{display:"flex",height:"100%",textAlign:"center",flexDirection:"column"}:{display:"flex",flexDirection:"row"},[n,i]=(0,h.useState)(t());return(0,h.useEffect)(()=>i(t()),[e<1]),(0,r.jsx)(z,{positionZ:-1900,children:(0,r.jsxs)("div",{style:n,children:[(0,r.jsx)("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",flexBasis:"50%",flexShrink:1},children:(0,r.jsxs)("div",{children:[(0,r.jsx)("h2",{children:"Hao Qi Wu"}),(0,r.jsx)(I,{})]})}),(0,r.jsx)("div",{style:{flexBasis:"50%"}})]})})}function N(e){let{removeMargins:t}=e,n={};return t&&(n={marginTop:0}),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("h2",{style:n,children:(0,r.jsx)("a",{href:"https://yourwaifu.dev/sleepy-discord/",children:"C++ Library for Discord"})}),"Sleepy Discord ",(0,r.jsx)("br",{}),(0,r.jsx)("h2",{children:(0,r.jsx)("a",{href:"/posts/my-game-engine",children:"Custom Game Engine"})}),(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{style:{float:"right",width:"25%",height:"2.5em"}}),"V8 JavaScript for Scripting ",(0,r.jsx)("br",{}),"Rollback Net-code"]}),(0,r.jsx)("h2",{children:(0,r.jsx)("a",{href:"https://github.com/yourWaifu",children:"Contributions to Open Source"})}),"Added UI features to the Dolphin Emulator. ",(0,r.jsx)("br",{}),"Fixed issues with libraries for Discord. ",(0,r.jsx)("br",{})]})}function L(){return(0,r.jsx)(z,{positionZ:-1e3,children:(0,r.jsx)(N,{removeMargins:!0})})}let W=h.forwardRef((e,t)=>{let n=M(e.scroll);return(0,r.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",position:"sticky",bottom:0,width:"100%",zIndex:99999999,pointerEvents:"none"},children:(0,r.jsx)("div",{ref:t,style:{margin:"1em",pointerEvents:"all"},children:(0,r.jsx)(n,{id:"front",children:(0,r.jsx)("p",{children:"HOME"})})})})});function _(){let e=(0,d.Ky)(e=>e.performance),t=(0,d.Ky)(e=>e.setDpr),n=e.current;return(0,d.xQ)(()=>{n!=e.current&&t(e.current*window.devicePixelRatio),n=e.current}),null}function H(){let e=(0,d.Ky)(e=>e.viewport),t=(0,d.Ky)(e=>e.camera);return"isPerspectiveCamera"in t&&t.isPerspectiveCamera&&(0,h.useMemo)(()=>{let e=t.fov;t.fov=360*Math.atan(Math.tan(90*Math.PI/360)/t.aspect)/Math.PI,t.fov<75&&(t.fov=75),e!==t.fov&&t.updateProjectionMatrix()},[e.aspect]),null}function K(e){let{scroll:t}=e,n=(0,d.Ky)(e=>e.camera);return(0,d.xQ)(()=>{n.position.z=500-t.y}),null}function G(e){let{functions:t,canvas:n}=e;return n.current=(0,d.Ky)(e=>e.gl.domElement),(0,d.xQ)((e,n)=>t.forEach(e=>e.current(n))),null}function Q(e,t){return(0,j.useSpring)({from:{op:0},to:{op:1},delay:null==t?void 0:t.delay,onChange:t=>{e.current&&(e.current.style.opacity=String(t.op))}})}function T(e){let{backgroundColor:t,transitionRef:n,router:i}=e,o=(0,h.useRef)(null),s=(0,h.useRef)(null),l=(0,h.useRef)(!0),a=Q(s,{delay:200}),c=(0,j.useSpring)({from:{op:1},onRest:()=>{l.current=!1,a.op.finish()},onChange:e=>{o.current&&(o.current.style.opacity=String(e.op))}});return c.op.stop(),n.current=e=>{let{from:t,to:n}=e?{from:0,to:1}:{from:1,to:0};c.op.set(t),c.op.start({to:n}),a.op.pause()},(0,h.useEffect)(()=>{!1===l.current&&0!==c.op.goal&&setTimeout(()=>{c.op.start({to:0})},200)}),(0,v.e7)(c.op,0,1,i),(0,r.jsx)("div",{ref:o,style:{backgroundColor:t,opacity:1,zIndex:9999999999999,pointerEvents:"none",position:"fixed",inset:0,textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,r.jsx)("p",{ref:s,style:{opacity:0},children:"LOADING"})})}function Z(e){if("function"!=typeof e.LinkComponent)throw Error("Can't list articles without link component");return(0,r.jsx)(r.Fragment,{children:e.allPostsData.map(t=>(0,r.jsxs)("div",{children:[(0,r.jsx)(e.LinkComponent,{href:"/posts/".concat(t.id),children:t.title}),"\xa0",(0,r.jsx)("div",{style:{float:"right"},children:(0,u.getPostDateStr)(t.date)}),(0,r.jsx)("br",{})]},t.id))})}function B(e){let{allPostsData:t}=e,n=(0,c.useRouter)(),i=(0,h.useRef)({x:0,y:0,halfW:0,halfH:0}),o=(0,h.useCallback)(e=>{let{clientX:t,clientY:n}=e;return i.current={x:t-window.innerWidth/2,y:n-window.innerHeight/2,halfW:window.innerWidth/2,halfH:window.innerHeight/2,available:!0}},[]),s={beta:0,gamma:0,available:!1,center:{beta:0,gamma:0}},l=(0,h.useRef)(s);(0,h.useEffect)(()=>{let e=e=>{null!==e.beta&&null!==e.gamma?(l.current.available||(l.current.center={beta:e.beta,gamma:e.gamma}),l.current={beta:e.beta-l.current.center.beta,gamma:e.gamma-l.current.center.gamma,available:!0,center:l.current.center}):l.current=s};return window.addEventListener("deviceorientation",e),()=>{window.removeEventListener("deviceorientation",e)}});let a=(0,r.jsx)(k,{positionZ:0,children:(0,r.jsx)("div",{style:{display:"flex",justifyContent:"space-around"},children:"Loading..."})}),u=getComputedStyle(document.documentElement).getPropertyValue("--backgroundColor");(0,h.useEffect)(()=>{if(window.location.hash){var e;let t=window.location.hash.substring(1);null===(e=document.getElementById(t))||void 0===e||e.scrollIntoView()}},[]);let f=(0,h.useRef)(null),x=(0,h.useRef)(null),p=(0,h.useRef)(null);(0,h.useEffect)(()=>{if(p.current)return document.body.style.overflow="hidden",()=>{document.body.style.overflow="unset"}},[]);let m={get y(){var y;return(null===(y=p.current)||void 0===y?void 0:y.scrollTop)||document.documentElement.scrollTop},set y(value){var j;null===(j=p.current)||void 0===j||j.scrollTo(0,value)}},g=(0,h.useRef)(null),v=(0,h.useRef)(null),w=(0,h.useRef)(null),M=(0,h.useRef)(null),I=(0,h.useRef)(null),N=(0,h.useRef)(null),Q=(0,h.useRef)(e=>{}),B=0,F=0;return(0,h.useEffect)(()=>{Q.current=e=>{if(!g.current||!v.current||!I.current)return;let t=g.current.getBoundingClientRect().top,n=v.current.getBoundingClientRect().bottom,r=I.current.getBoundingClientRect(),i=(r.top+r.bottom)/2;if(N.current.parentElement){let e=(t+n)/2-i;e!==B&&(N.current.parentElement.style.top="".concat(e,"px")),B=e}if(f.current.parentElement){let e=r.bottom-n;F!==e&&(f.current.parentElement.style.bottom="".concat(e,"px")),F=e}}},[]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(T,{backgroundColor:u,transitionRef:x,router:n}),(0,r.jsx)("div",{ref:g,style:{position:"fixed",top:0}}),(0,r.jsx)("div",{ref:v,style:{position:"fixed",bottom:0}}),(0,r.jsx)("div",{ref:w,style:{position:"fixed",left:0}}),(0,r.jsx)("div",{ref:M,style:{position:"fixed",right:0}}),(0,r.jsxs)("div",{ref:p,style:{position:"absolute",top:0,bottom:0,left:0,right:-20,minWidth:"100%",overflowY:"scroll",display:"flex",flexDirection:"row",overflowX:"hidden"},children:[(0,r.jsxs)("div",{ref:I,onMouseMove:o,style:{height:"100vh",width:"100vw",position:"sticky",zIndex:2,top:0,left:0,backgroundColor:u,flexShrink:0,flexGrow:0,overflow:"hidden"},children:[(0,r.jsxs)(d.Xz,{orthographic:!1,shadows:!0,camera:{position:[0,0,500]},dpr:[.4,window.devicePixelRatio],children:[(0,r.jsx)("ambientLight",{intensity:.5}),(0,r.jsx)(h.Suspense,{fallback:a,children:(0,r.jsx)(b,{mouse:i,gyro:l,fadeTransitionRef:x})}),(0,r.jsx)(h.Suspense,{fallback:null,children:(0,r.jsx)(E,{})}),(0,r.jsx)(h.Suspense,{fallback:null,children:(0,r.jsx)(C,{mouse:i,gyro:l})}),(0,r.jsx)(h.Suspense,{fallback:null,children:(0,r.jsx)(R,{})}),(0,r.jsx)(P,{backButtonRef:f,scroll:m}),(0,r.jsx)(L,{}),(0,r.jsx)(D,{}),(0,r.jsx)(z,{positionZ:-2700,children:(0,r.jsx)("div",{style:{textShadow:"2px 2px 10px black",filter:"drop-shadow(2px 2px 1px black)",display:"flex",flexDirection:"column"},children:(0,r.jsx)(Z,{allPostsData:t,LinkComponent:e=>{let t={router:n,...e};return(0,r.jsx)(S,{...t})}})})}),(0,r.jsx)("fog",{attach:"fog",args:[u,600,1e3]}),(0,r.jsx)(_,{}),(0,r.jsx)(H,{}),(0,r.jsx)(K,{scroll:m}),(0,r.jsx)(G,{functions:[Q],canvas:N})]}),(0,r.jsx)(W,{ref:f,scroll:m})]}),(0,r.jsxs)("div",{style:{top:0,bottom:0,position:"relative",flexGrow:1,flexBasis:1,flexShrink:0,pointerEvents:"none"},children:[(0,r.jsx)("div",{id:"front",style:{height:"1000px"}})," ",(0,r.jsx)("div",{id:"portfolio",style:{height:"900px"}})," ",(0,r.jsx)("div",{id:"contact",style:{height:"800px"}})," ",(0,r.jsx)("div",{id:"articles",style:{height:"100%"}})," "]})]})]})}function F(e){return(0,r.jsxs)("div",{style:{maxWidth:"37em",padding:"0 1em",margin:"auto"},children:[(0,r.jsx)("h1",{children:"Hao Qi Wu"}),e.errorMessage,(0,r.jsx)(N,{}),(0,r.jsx)("h2",{children:"Contact"}),(0,r.jsx)(I,{}),(0,r.jsx)("h2",{children:"Articles"}),(0,r.jsx)(Z,{allPostsData:e.allPostsData,LinkComponent:e=>(0,r.jsx)(a(),{href:e.href,children:e.children})}),(0,r.jsx)("div",{style:{height:"1em"}})]})}function V(e){let t=(0,h.useRef)(null),n=Q(t),i=(0,c.useRouter)();return(0,v.e7)(n.op,1,0,i),(0,r.jsx)("div",{ref:t,style:{height:"100%",overflowY:"auto"},children:(0,r.jsx)(F,{...e})})}var A=!0;function O(e){let[t,n]=(0,h.useState)(null);(0,h.useEffect)(()=>{null===t&&n(function(){try{let e=document.createElement("canvas");return!!window.WebGLRenderingContext&&!!(e.getContext("webgl")||e.getContext("experimental-webgl"))}catch(e){return!1}}())},[]);let i=null!==t,l={errorMessage:i?!1===t?(0,r.jsxs)("p",{children:["Please enable WebGL or use a browser with it enabled to view the home page. Visit ",(0,r.jsx)("a",{href:"https://get.webgl.org/",children:"https://get.webgl.org/"})," for more info."]}):(0,r.jsx)("p",{children:"Couldn't display home page, using fail safe"}):(0,r.jsx)("p",{children:"Please enable JavaScript to view the home page"}),...e},a=i?(0,r.jsx)(V,{...l}):(0,r.jsx)("noscript",{children:(0,r.jsx)(F,{...l})});return(0,r.jsxs)(s.Z,{children:[(0,r.jsx)(o(),{children:(0,r.jsx)("title",{children:"Hao Qi Wu"})}),(0,r.jsxs)("div",{style:{width:"100vw",height:"100vh",position:"fixed"},children:[t&&(0,r.jsx)(B,{...e}),a]})]},"home")}},3477:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return m},default:function(){return g},getPostDateStr:function(){return y}});var r=n(5893),i=n(3226),o=n.n(i),s=n(7714),l=n.n(s),a=n(2351),c=n(9008),u=n.n(c),d=n(1664),h=n.n(d),f=n(5675),x=n.n(f),p=n(5079),m=!0;function y(e){return new Date(e).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}let j={Image:x(),YouTube:e=>(0,r.jsx)("a",{href:"https://youtube.com/watch?v=".concat(e.videoId),children:"YouTube Link"})};function g(e){let{postData:t}=e;return(0,r.jsxs)(a.Z,{children:[(0,r.jsx)(u(),{children:(0,r.jsx)("title",{children:t.title})}),(0,r.jsxs)("article",{className:l().className,children:[(0,r.jsxs)("section",{className:"article-header",children:[(0,r.jsxs)("section",{className:"article-header-flex-section",children:[(0,r.jsx)("ul",{className:"".concat(o().className," article-header-flex"),style:{width:"fit-content"},children:(0,r.jsx)("li",{children:(0,r.jsx)(h(),{href:"/",children:(0,r.jsx)("h1",{className:o().className,children:"yourWaifu"})})},"site-name")}),(0,r.jsx)("ul",{className:"article-header-flex right-menu",children:(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"https://github.com/yourWaifu","aria-label":"GitHub",children:(0,r.jsx)("i",{className:"fab fa-github fa-2x"})})},"github-link")})]}),(0,r.jsxs)("section",{className:"article-header-info",children:[(0,r.jsx)("h1",{className:"".concat(o().className," article-header-title"),children:t.title}),(0,r.jsx)("div",{children:(0,r.jsxs)("p",{children:["written on ",y(t.date)," by Hao Qi Wu"]})})]})]}),(0,r.jsx)("div",{className:"article",children:(0,r.jsx)("section",{className:"article-content",children:(0,r.jsx)(p.R,{...t.content,components:j})})})]})]},t.id)}}},function(e){e.O(0,[737,733,965,888,774,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);