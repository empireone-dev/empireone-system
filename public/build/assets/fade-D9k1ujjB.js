import"./index-BMTGiFrx.js";import"./app-DkEFLbrW.js";import{i as r,K as o}from"./ContextIsolator-2cY5lSOo.js";const c=new o("antFadeIn",{"0%":{opacity:0},"100%":{opacity:1}}),s=new o("antFadeOut",{"0%":{opacity:1},"100%":{opacity:0}}),f=(t,a=!1)=>{const{antCls:e}=t,i=`${e}-fade`,n=a?"&":"";return[r(i,c,s,t.motionDurationMid,a),{[`
        ${n}${i}-enter,
        ${n}${i}-appear
      `]:{opacity:0,animationTimingFunction:"linear"},[`${n}${i}-leave`]:{animationTimingFunction:"linear"}}]};export{f as i};
