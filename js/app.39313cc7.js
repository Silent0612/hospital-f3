(()=>{"use strict";var e={7502:(e,t,r)=>{r(3792),r(3362),r(9085),r(9391),r(6099);var n=r(5471),o=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},a=[];const i={name:"App"},u=i;var s=r(1656),l=(0,s.A)(u,o,a,!1,null,null,null);const c=l.exports;r(2892),r(9432),r(7764),r(2953);var d=r(173);n["default"].use(d.Ay);var f=[{path:"/",redirect:"/login"},{path:"/login",name:"Login",component:function(){return Promise.all([r.e(33),r.e(104)]).then(r.bind(r,4104))}},{path:"/register",name:"Register",component:function(){return Promise.all([r.e(33),r.e(303)]).then(r.bind(r,7303))}},{path:"/home",name:"Home",component:function(){return r.e(528).then(r.bind(r,7528))},children:[{path:"departments",name:"Departments",component:function(){return Promise.all([r.e(33),r.e(759)]).then(r.bind(r,7759))}},{path:"doctors/:id",name:"Doctors",component:function(){return Promise.all([r.e(33),r.e(288)]).then(r.bind(r,288))},props:function(e){return{id:Number(e.params.id)}}},{path:"appointment/:doctorId",name:"Appointment",component:function(){return Promise.all([r.e(33),r.e(54)]).then(r.bind(r,9054))}},{path:"records",name:"Records",component:function(){return Promise.all([r.e(33),r.e(467)]).then(r.bind(r,7467))}}]}],p=new d.Ay({routes:f});p.beforeEach((function(e,t,r){var n=localStorage.getItem("token"),o=JSON.parse(localStorage.getItem("userInfo")||"{}");"/login"!==e.path&&"/register"!==e.path?n&&2===o.roleid?r():r("/login"):r()}));const m=p;r(739),r(3110);var h=r(5353);n["default"].use(h.Ay);const v=new h.Ay.Store({state:{userInfo:JSON.parse(localStorage.getItem("userInfo")||"{}"),token:localStorage.getItem("token")||""},mutations:{SET_USER_INFO:function(e,t){e.userInfo=t,localStorage.setItem("userInfo",JSON.stringify(t))},SET_TOKEN:function(e,t){e.token=t,localStorage.setItem("token",t)},CLEAR_USER_INFO:function(e){e.userInfo={},e.token="",localStorage.removeItem("userInfo"),localStorage.removeItem("token")}},actions:{saveUserInfo:function(e,t){var r=e.commit,n=t.userInfo,o=t.token;r("SET_USER_INFO",n),r("SET_TOKEN",o)},logout:function(e){var t=e.commit;t("CLEAR_USER_INFO")}},getters:{isLoggedIn:function(e){return!!e.token},userInfo:function(e){return e.userInfo}}});var g=r(1052),b=r.n(g),y=r(2505),S=r.n(y);n["default"].use(b()),S().defaults.headers.common["Content-Type"]="application/json";var I=S().create({timeout:5e3,headers:{"Content-Type":"application/json"}});I.interceptors.request.use((function(e){var t=localStorage.getItem("token");return t&&(e.headers["Authorization"]=t),e}),(function(e){return Promise.reject(e)})),I.interceptors.response.use((function(e){return e}),(function(e){var t;return console.error("请求错误:",e),b().Message.error((null===(t=e.response)||void 0===t||null===(t=t.data)||void 0===t?void 0:t.msg)||"请求失败，请稍后重试"),Promise.reject(e)})),n["default"].prototype.$http=I,n["default"].config.productionTip=!1,new n["default"]({router:m,store:v,render:function(e){return e(c)}}).$mount("#app")}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={id:n,loaded:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.loaded=!0,a.exports}r.m=e,(()=>{r.amdO={}})(),(()=>{var e=[];r.O=(t,n,o,a)=>{if(!n){var i=1/0;for(c=0;c<e.length;c++){for(var[n,o,a]=e[c],u=!0,s=0;s<n.length;s++)(!1&a||i>=a)&&Object.keys(r.O).every((e=>r.O[e](n[s])))?n.splice(s--,1):(u=!1,a<i&&(i=a));if(u){e.splice(c--,1);var l=o();void 0!==l&&(t=l)}}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[n,o,a]}})(),(()=>{r.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return r.d(t,{a:t}),t}})(),(()=>{r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}})(),(()=>{r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,n)=>(r.f[n](e,t),t)),[]))})(),(()=>{r.u=e=>"js/"+e+"."+{33:"713dbf6b",54:"8ec55763",104:"0caea2ee",288:"572ce754",303:"379ca54d",467:"62829b6c",528:"5c2dfae1",759:"42337a2f"}[e]+".js"})(),(()=>{r.miniCssF=e=>"css/"+e+"."+{54:"83edffab",104:"7652e12e",288:"92c9c683",303:"d46d6fa6",467:"e6c2833e",528:"96fb4643",759:"32ca8812"}[e]+".css"})(),(()=>{r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="hospital-web:";r.l=(n,o,a,i)=>{if(e[n])e[n].push(o);else{var u,s;if(void 0!==a)for(var l=document.getElementsByTagName("script"),c=0;c<l.length;c++){var d=l[c];if(d.getAttribute("src")==n||d.getAttribute("data-webpack")==t+a){u=d;break}}u||(s=!0,u=document.createElement("script"),u.charset="utf-8",u.timeout=120,r.nc&&u.setAttribute("nonce",r.nc),u.setAttribute("data-webpack",t+a),u.src=n),e[n]=[o];var f=(t,r)=>{u.onerror=u.onload=null,clearTimeout(p);var o=e[n];if(delete e[n],u.parentNode&&u.parentNode.removeChild(u),o&&o.forEach((e=>e(r))),t)return t(r)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=f.bind(null,u.onerror),u.onload=f.bind(null,u.onload),s&&document.head.appendChild(u)}}})(),(()=>{r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{r.nmd=e=>(e.paths=[],e.children||(e.children=[]),e)})(),(()=>{r.p="/"})(),(()=>{if("undefined"!==typeof document){var e=(e,t,n,o,a)=>{var i=document.createElement("link");i.rel="stylesheet",i.type="text/css",r.nc&&(i.nonce=r.nc);var u=r=>{if(i.onerror=i.onload=null,"load"===r.type)o();else{var n=r&&r.type,u=r&&r.target&&r.target.href||t,s=new Error("Loading CSS chunk "+e+" failed.\n("+n+": "+u+")");s.name="ChunkLoadError",s.code="CSS_CHUNK_LOAD_FAILED",s.type=n,s.request=u,i.parentNode&&i.parentNode.removeChild(i),a(s)}};return i.onerror=i.onload=u,i.href=t,n?n.parentNode.insertBefore(i,n.nextSibling):document.head.appendChild(i),i},t=(e,t)=>{for(var r=document.getElementsByTagName("link"),n=0;n<r.length;n++){var o=r[n],a=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(a===e||a===t))return o}var i=document.getElementsByTagName("style");for(n=0;n<i.length;n++){o=i[n],a=o.getAttribute("data-href");if(a===e||a===t)return o}},n=n=>new Promise(((o,a)=>{var i=r.miniCssF(n),u=r.p+i;if(t(i,u))return o();e(n,u,null,o,a)})),o={524:0};r.f.miniCss=(e,t)=>{var r={54:1,104:1,288:1,303:1,467:1,528:1,759:1};o[e]?t.push(o[e]):0!==o[e]&&r[e]&&t.push(o[e]=n(e).then((()=>{o[e]=0}),(t=>{throw delete o[e],t})))}}})(),(()=>{var e={524:0};r.f.j=(t,n)=>{var o=r.o(e,t)?e[t]:void 0;if(0!==o)if(o)n.push(o[2]);else{var a=new Promise(((r,n)=>o=e[t]=[r,n]));n.push(o[2]=a);var i=r.p+r.u(t),u=new Error,s=n=>{if(r.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var a=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;u.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",u.name="ChunkLoadError",u.type=a,u.request=i,o[1](u)}};r.l(i,s,"chunk-"+t,t)}},r.O.j=t=>0===e[t];var t=(t,n)=>{var o,a,[i,u,s]=n,l=0;if(i.some((t=>0!==e[t]))){for(o in u)r.o(u,o)&&(r.m[o]=u[o]);if(s)var c=s(r)}for(t&&t(n);l<i.length;l++)a=i[l],r.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return r.O(c)},n=self["webpackChunkhospital_web"]=self["webpackChunkhospital_web"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var n=r.O(void 0,[504],(()=>r(7502)));n=r.O(n)})();
//# sourceMappingURL=app.39313cc7.js.map