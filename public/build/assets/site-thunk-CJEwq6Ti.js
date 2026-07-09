import{a as e,i}from"./app-CPCMjmla.js";function r(){try{return e.get("/api/sites")}catch{}}function c(){return async function(t,a){const s=await r();t(i.actions.setSites(s.data))}}export{c as g};
