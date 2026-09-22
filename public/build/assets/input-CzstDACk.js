import{j as e}from"./app-CIXGrKKA.js";function m({label:p,register:l,name:t,value:n,onChange:d,type:r="text",disabled:x=!1,required:c=!1,iconLeft:a,iconRight:s,error:o,readOnly:h=!1}){return e.jsxs("div",{className:"w-full",children:[e.jsxs("div",{className:"relative ",children:[a&&e.jsx("div",{className:"absolute left-2 top-1/2 -translate-y-1/2 text-gray-500",children:a}),e.jsx("input",{readOnly:h,...l,disabled:x,required:c,value:n,onChange:d??(l==null?void 0:l.onChange),type:r,id:t,name:t,step:r==="number"?"any":void 0,className:`peer text-black placeholder-transparent w-full py-2.5 px-5 border bg-white rounded-md focus:outline-none transition-all
            ${a?"pl-10":""}
            ${s?"pr-10":""}
            ${o?"border-red-500":""}
          `,placeholder:" "}),e.jsx("label",{htmlFor:t,className:` absolute left-2.5 px-2.5 transition-all bg-white rounded-md text-sm -top-3
            peer-placeholder-shown:text-base
            peer-placeholder-shown:text-gray-500
            peer-placeholder-shown:top-2.5
            peer-focus:-top-3
            peer-focus:text-sm
            peer-focus:text-black
          `,children:p}),s&&e.jsx("div",{className:"absolute right-2 top-1/2 -translate-y-1/2 text-gray-500",children:s})]}),o&&e.jsx("p",{className:"text-sm text-red-500 mt-1 ml-1",children:o})]})}export{m as I};
