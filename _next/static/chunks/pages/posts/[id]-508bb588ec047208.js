(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[646],{4550:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/[id]",function(){return n(5695)}])},7376:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var r=n(5893),o=n(9008),i=n(7294);function a(e){var t=e.children;return i.useEffect((function(){document.documentElement.lang="en"})),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(o.default,{children:[(0,r.jsx)("meta",{charSet:"utf-8"}),(0,r.jsx)("link",{href:"https://fonts.googleapis.com/css?family=Raleway:300",rel:"stylesheet"}),(0,r.jsx)("link",{href:"https://fonts.googleapis.com/css?family=Open+Sans:400,700",rel:"stylesheet",type:"text/css"}),(0,r.jsx)("link",{rel:"stylesheet",href:"https://use.fontawesome.com/releases/v5.3.1/css/all.css",integrity:"sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU",crossOrigin:"anonymous"}),(0,r.jsx)("link",{rel:"stylesheet",type:"text/css",href:"/style.css",media:"screen"}),(0,r.jsx)("link",{rel:"apple-touch-icon",sizes:"180x180",href:"/apple-touch-icon.png"}),(0,r.jsx)("link",{rel:"icon",type:"image/png",sizes:"32x32",href:"/favicon-32x32.png"}),(0,r.jsx)("link",{rel:"icon",type:"image/png",sizes:"16x16",href:"/favicon-16x16.png"}),(0,r.jsx)("link",{rel:"manifest",href:"/site.webmanifest"}),(0,r.jsx)("meta",{name:"msapplication-TileColor",content:"#da532c"}),(0,r.jsx)("meta",{name:"theme-color",content:"#ffffff"}),(0,r.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"})]}),(0,r.jsx)("main",{style:{top:0,left:0,right:0,bottom:0,position:"absolute"},children:t})]})}},8418:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,l=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(s){l=!0,o=s}finally{try{a||null==n.return||n.return()}finally{if(l)throw o}}return i}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}t.default=void 0;var i,a=(i=n(7294))&&i.__esModule?i:{default:i},l=n(6273),s=n(387),c=n(7190);var u={};function f(e,t,n,r){if(e&&l.isLocalURL(t)){e.prefetch(t,n,r).catch((function(e){0}));var o=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;u[t+"%"+n+(o?"%"+o:"")]=!0}}var d=function(e){var t,n=!1!==e.prefetch,r=s.useRouter(),i=a.default.useMemo((function(){var t=o(l.resolveHref(r,e.href,!0),2),n=t[0],i=t[1];return{href:n,as:e.as?l.resolveHref(r,e.as):i||n}}),[r,e.href,e.as]),d=i.href,h=i.as,p=e.children,m=e.replace,y=e.shallow,v=e.scroll,g=e.locale;"string"===typeof p&&(p=a.default.createElement("a",null,p));var x=(t=a.default.Children.only(p))&&"object"===typeof t&&t.ref,j=o(c.useIntersection({rootMargin:"200px"}),2),b=j[0],w=j[1],E=a.default.useCallback((function(e){b(e),x&&("function"===typeof x?x(e):"object"===typeof x&&(x.current=e))}),[x,b]);a.default.useEffect((function(){var e=w&&n&&l.isLocalURL(d),t="undefined"!==typeof g?g:r&&r.locale,o=u[d+"%"+h+(t?"%"+t:"")];e&&!o&&f(r,d,h,{locale:t})}),[h,d,w,g,n,r]);var _={ref:E,onClick:function(e){t.props&&"function"===typeof t.props.onClick&&t.props.onClick(e),e.defaultPrevented||function(e,t,n,r,o,i,a,s){("A"!==e.currentTarget.nodeName.toUpperCase()||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&l.isLocalURL(n))&&(e.preventDefault(),t[o?"replace":"push"](n,r,{shallow:i,locale:s,scroll:a}))}(e,r,d,h,m,y,v,g)},onMouseEnter:function(e){t.props&&"function"===typeof t.props.onMouseEnter&&t.props.onMouseEnter(e),l.isLocalURL(d)&&f(r,d,h,{priority:!0})}};if(e.passHref||"a"===t.type&&!("href"in t.props)){var S="undefined"!==typeof g?g:r&&r.locale,k=r&&r.isLocaleDomain&&l.getDomainLocale(h,S,r&&r.locales,r&&r.domainLocales);_.href=k||l.addBasePath(l.addLocale(h,S,r&&r.defaultLocale))}return a.default.cloneElement(t,_)};t.default=d},7190:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,l=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(s){l=!0,o=s}finally{try{a||null==n.return||n.return()}finally{if(l)throw o}}return i}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootRef,n=e.rootMargin,r=e.disabled||!l,u=i.useRef(),f=o(i.useState(!1),2),d=f[0],h=f[1],p=o(i.useState(t?t.current:null),2),m=p[0],y=p[1],v=i.useCallback((function(e){u.current&&(u.current(),u.current=void 0),r||d||e&&e.tagName&&(u.current=function(e,t,n){var r=function(e){var t,n={root:e.root||null,margin:e.rootMargin||""},r=c.find((function(e){return e.root===n.root&&e.margin===n.margin}));r?t=s.get(r):(t=s.get(n),c.push(n));if(t)return t;var o=new Map,i=new IntersectionObserver((function(e){e.forEach((function(e){var t=o.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return s.set(n,t={id:n,observer:i,elements:o}),t}(n),o=r.id,i=r.observer,a=r.elements;return a.set(e,t),i.observe(e),function(){if(a.delete(e),i.unobserve(e),0===a.size){i.disconnect(),s.delete(o);var t=c.findIndex((function(e){return e.root===o.root&&e.margin===o.margin}));t>-1&&c.splice(t,1)}}}(e,(function(e){return e&&h(e)}),{root:m,rootMargin:n}))}),[r,m,n,d]);return i.useEffect((function(){if(!l&&!d){var e=a.requestIdleCallback((function(){return h(!0)}));return function(){return a.cancelIdleCallback(e)}}}),[d]),i.useEffect((function(){t&&y(t.current)}),[t]),[v,d]};var i=n(7294),a=n(9311),l="undefined"!==typeof IntersectionObserver;var s=new Map,c=[]},5695:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return l},getPostDateStr:function(){return s},default:function(){return c}});var r=n(5893),o=n(7376),i=n(9008),a=n(1664),l=!0;function s(e){return new Date(e).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}function c(e){var t=e.postData;return(0,r.jsxs)(o.Z,{children:[(0,r.jsx)(i.default,{children:(0,r.jsx)("title",{children:t.title})}),(0,r.jsxs)("article",{children:[(0,r.jsxs)("section",{className:"article-header",children:[(0,r.jsxs)("section",{className:"article-header-flex-section",children:[(0,r.jsx)("ul",{className:"article-header-flex",style:{width:"fit-content"},children:(0,r.jsx)("li",{children:(0,r.jsx)(a.default,{href:"/",children:(0,r.jsx)("a",{children:(0,r.jsx)("h1",{children:"yourWaifu"})})})},"site-name")}),(0,r.jsx)("ul",{className:"article-header-flex right-menu",children:(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"https://github.com/yourWaifu",children:(0,r.jsx)("i",{className:"fab fa-github fa-2x"})})},"github-link")})]}),(0,r.jsxs)("section",{className:"article-header-info",children:[(0,r.jsx)("h1",{className:"article-header-title",children:t.title}),(0,r.jsx)("div",{children:(0,r.jsxs)("p",{children:["written on ",s(t.date)," by Hao Qi Wu"]})})]})]}),(0,r.jsx)("div",{className:"article",children:(0,r.jsx)("section",{className:"article-content",children:(0,r.jsx)("div",{dangerouslySetInnerHTML:{__html:t.content}})})})]})]},t.id)}},9008:function(e,t,n){e.exports=n(5443)},1664:function(e,t,n){e.exports=n(8418)}},function(e){e.O(0,[774,888,179],(function(){return t=4550,e(e.s=t);var t}));var t=e.O();_N_E=t}]);