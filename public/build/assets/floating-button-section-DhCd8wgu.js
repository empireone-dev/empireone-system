import{r as n,l as j,u as v,j as e,s as k}from"./app-C11SRzzF.js";import{c as N}from"./open-ai-service-CYJtEeoO.js";/**
 * @license lucide-react v0.534.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),_=s=>s.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,o,r)=>r?r.toUpperCase():o.toLowerCase()),g=s=>{const t=_(s);return t.charAt(0).toUpperCase()+t.slice(1)},b=(...s)=>s.filter((t,o,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===o).join(" ").trim(),M=s=>{for(const t in s)if(t.startsWith("aria-")||t==="role"||t==="title")return!0};/**
 * @license lucide-react v0.534.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var A={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.534.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=n.forwardRef(({color:s="currentColor",size:t=24,strokeWidth:o=2,absoluteStrokeWidth:r,className:d="",children:l,iconNode:x,...c},u)=>n.createElement("svg",{ref:u,...A,width:t,height:t,stroke:s,strokeWidth:r?Number(o)*24/Number(t):o,className:b("lucide",d),...!l&&!M(c)&&{"aria-hidden":"true"},...c},[...x.map(([m,i])=>n.createElement(m,i)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.534.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=(s,t)=>{const o=n.forwardRef(({className:r,...d},l)=>n.createElement(I,{ref:l,iconNode:t,className:b(`lucide-${C(g(s))}`,`lucide-${s}`,r),...d}));return o.displayName=g(s),o};/**
 * @license lucide-react v0.534.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]],$=h("bot",S);/**
 * @license lucide-react v0.534.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],H=h("send",E);/**
 * @license lucide-react v0.534.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],z=h("x",L);function D(s){return async function(t,o){const r=await N(s.prompt);t(j.actions.setChatBots(r.data))}}function B(){const[s,t]=n.useState(!1),{chatbots:o}=v(a=>a.app),r=n.useRef(null),[d,l]=n.useState(!1),[x,c]=n.useState(!1),[u,m]=n.useState([{from:"bot",text:"Hello! How can I assist you today regarding the Code of Conduct and Discipline document?"}]),[i,f]=n.useState("");n.useEffect(()=>{const a=r.current;a&&(a.scrollTop=a.scrollHeight)},[u.length,s]);const p=()=>{s?(m([{from:"bot",text:"Hello! How can I assist you today?"}]),l(!1),setTimeout(()=>t(!1),300)):(t(!0),setTimeout(()=>l(!0),10))};console.log("chatbots",o.result),n.useEffect(()=>{o.result&&m(a=>[...a,{from:"bot",text:o.result}])},[o.result]);const y=async()=>{if(i.trim()!=="")try{c(!0),m([...u,{from:"user",text:i}]),f(""),await k.dispatch(D({prompt:i})),c(!1)}catch{f(""),c(!1)}};return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:p,className:"fixed bottom-6 right-4",children:e.jsx("img",{src:"/gif/chatbot.gif",className:"h-24"})}),s&&e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm transition-opacity",children:e.jsxs("div",{className:`bg-white h-screen w-screen max-w-none rounded-none 
    md:h-[500px] md:w-[500px] md:max-w-md md:rounded-2xl
    shadow-lg flex flex-col  justify-between overflow-hidden transform transition-all duration-300
    ${d?"scale-100 opacity-100 translate-y-0":"scale-95 opacity-0 translate-y-4"}
  `,children:[e.jsxs("div",{className:"flex items-center justify-between p-4 bg-blue-600 text-white",children:[e.jsxs("h2",{className:"text-lg text-white flex gap-2 font-semibold",children:[e.jsx($,{className:"w-7 h-7"})," Chatbot Assistant"]}),e.jsx("button",{onClick:p,children:e.jsx(z,{className:"w-5 h-5"})})]}),e.jsxs("div",{ref:r,className:"flex-1 p-4 space-y-2 overflow-y-auto max-h-[600px]",children:[u.map((a,w)=>e.jsx("div",{className:`flex ${a.from==="user"?"justify-end":"justify-start"}`,children:e.jsx("div",{className:`px-4 py-2 rounded-lg max-w-xs text-sm ${a.from==="user"?"bg-blue-100 text-blue-800":"bg-gray-100 text-gray-800"}`,children:e.jsx("div",{dangerouslySetInnerHTML:{__html:a.text}})})},w)),x&&e.jsx("div",{className:"flex items-center px-3 py-2 justify-center bg-gray-200 rounded-2xl max-w-14",children:e.jsxs("div",{className:"flex space-x-1",children:[e.jsx("div",{className:"w-2 h-2 bg-gray-600 rounded-full animate-bounce",style:{animationDelay:"0s"}}),e.jsx("div",{className:"w-2 h-2 bg-gray-600 rounded-full animate-bounce",style:{animationDelay:"0.2s"}}),e.jsx("div",{className:"w-2 h-2 bg-gray-600 rounded-full animate-bounce",style:{animationDelay:"0.4s"}})]})})]}),e.jsxs("div",{className:"flex items-center gap-2 border-t p-4 bg-white sticky bottom-0 z-10",children:[e.jsx("input",{type:"text",className:"flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",placeholder:"Type your message...",value:i,onChange:a=>f(a.target.value),onKeyDown:a=>a.key==="Enter"&&y()}),e.jsx("button",{onClick:y,className:"bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full",children:e.jsx(H,{className:"w-4 h-4"})})]})]})})]})}export{B as default};
