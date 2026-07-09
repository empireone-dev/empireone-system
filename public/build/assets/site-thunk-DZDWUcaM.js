import{a as e,i}from"./app-K3Apvc6b.js";function r(){try{return e.get("/api/sites")}catch{}}function c(){return async function(t,a){const s=await r();t(i.actions.setSites(s.data))}}export{c as g};
