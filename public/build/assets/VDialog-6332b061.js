import{O as P,T as y,aq as h,n as D,bb as S,y as f,k as x,M as v,X as T,A as w,a as m,aG as B,bt as F}from"./main-2c9a0e59.js";import{m as I,u as O,V as g}from"./VOverlay-547ccc7e.js";import{f as R}from"./index-e994dd60.js";import{V as A}from"./dialog-transition-29f1fa53.js";const k=P({fullscreen:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,...I({origin:"center center",scrollStrategy:"block",transition:{component:A},zIndex:2400})},"v-dialog"),q=y()({name:"VDialog",props:k(),emits:{"update:modelValue":a=>!0},setup(a,p){let{slots:c}=p;const n=h(a,"modelValue"),{scopeId:V}=O(),t=D();function i(l){var r,s;const e=l.relatedTarget,o=l.target;if(e!==o&&((r=t.value)!=null&&r.contentEl)&&((s=t.value)!=null&&s.globalTop)&&![document,t.value.contentEl].includes(o)&&!t.value.contentEl.contains(o)){const u=F(t.value.contentEl);if(!u.length)return;const d=u[0],E=u[u.length-1];e===d?E.focus():d.focus()}}S&&f(()=>n.value&&a.retainFocus,l=>{l?document.addEventListener("focusin",i):document.removeEventListener("focusin",i)},{immediate:!0}),f(n,async l=>{var e,o;await w(),l?(e=t.value.contentEl)==null||e.focus({preventScroll:!0}):(o=t.value.activatorEl)==null||o.focus({preventScroll:!0})});const b=x(()=>v({"aria-haspopup":"dialog","aria-expanded":String(n.value)},a.activatorProps));return T(()=>{const[l]=g.filterProps(a);return m(g,v({ref:t,class:["v-dialog",{"v-dialog--fullscreen":a.fullscreen,"v-dialog--scrollable":a.scrollable},a.class],style:a.style},l,{modelValue:n.value,"onUpdate:modelValue":e=>n.value=e,"aria-modal":"true",activatorProps:b.value,role:"dialog"},V),{activator:c.activator,default:function(){for(var e=arguments.length,o=new Array(e),r=0;r<e;r++)o[r]=arguments[r];return m(B,{root:!0},{default:()=>{var s;return[(s=c.default)==null?void 0:s.call(c,...o)]}})}})}),R({},t)}});export{q as V};
