import{bE as Y,bJ as Z,bW as ee,m as y,i as m,b2 as te,bu as ae,aF as ne,bt as x,aB as le,bP as oe,c2 as ue,a as l,au as R,F as k,bz as z,aV as ie,bp as re,av as S,c6 as se,b_ as ce,bR as de}from"./main-e96450c7.js";import{m as fe,b as ve,u as me,a as A,f as xe,c as ge,d as he}from"./VCounter-6b7b42d1.js";import{I as we}from"./VImg-49529653.js";import{f as Ve}from"./index-c214d2f8.js";const ye=Y({autoGrow:Boolean,autofocus:Boolean,counter:[Boolean,Number,String],counterValue:Function,prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,noResize:Boolean,rows:{type:[Number,String],default:5,validator:e=>!isNaN(parseFloat(e))},maxRows:{type:[Number,String],validator:e=>!isNaN(parseFloat(e))},suffix:String,modelModifiers:Object,...fe(),...ve()},"v-textarea"),Ie=Z()({name:"VTextarea",directives:{Intersect:we},inheritAttrs:!1,props:ye(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,T){let{attrs:b,emit:B,slots:i}=T;const o=ee(e,"modelValue"),{isFocused:f,focus:E,blur:G}=me(e),D=y(()=>typeof e.counterValue=="function"?e.counterValue(o.value):(o.value||"").toString().length),U=y(()=>{if(b.maxlength)return b.maxlength;if(!(!e.counter||typeof e.counter!="number"&&typeof e.counter!="string"))return e.counter});function O(t,n){var a,u;!e.autofocus||!t||(u=(a=n[0].target)==null?void 0:a.focus)==null||u.call(a)}const M=m(),g=m(),H=te(""),h=m(),$=y(()=>e.persistentPlaceholder||f.value||e.active);function F(){var t;h.value!==document.activeElement&&((t=h.value)==null||t.focus()),f.value||E()}function j(t){F(),B("click:control",t)}function J(t){B("mousedown:control",t)}function W(t){t.stopPropagation(),F(),S(()=>{o.value="",se(e["onClick:clear"],t)})}function p(t){var a;const n=t.target;if(o.value=n.value,(a=e.modelModifiers)!=null&&a.trim){const u=[n.selectionStart,n.selectionEnd];S(()=>{n.selectionStart=u[0],n.selectionEnd=u[1]})}}const c=m(),w=m(+e.rows),P=y(()=>["plain","underlined"].includes(e.variant));ae(()=>{e.autoGrow||(w.value=+e.rows)});function d(){e.autoGrow&&S(()=>{if(!c.value||!g.value)return;const t=getComputedStyle(c.value),n=getComputedStyle(g.value.$el),a=parseFloat(t.getPropertyValue("--v-field-padding-top"))+parseFloat(t.getPropertyValue("--v-input-padding-top"))+parseFloat(t.getPropertyValue("--v-field-padding-bottom")),u=c.value.scrollHeight,V=parseFloat(t.lineHeight),C=Math.max(parseFloat(e.rows)*V+a,parseFloat(n.getPropertyValue("--v-input-control-height"))),I=parseFloat(e.maxRows)*V+a||1/0,s=de(u??0,C,I);w.value=Math.floor((s-a)/V),H.value=ce(s)})}ne(d),x(o,d),x(()=>e.rows,d),x(()=>e.maxRows,d),x(()=>e.density,d);let r;return x(c,t=>{t?(r=new ResizeObserver(d),r.observe(c.value)):r==null||r.disconnect()}),le(()=>{r==null||r.disconnect()}),oe(()=>{const t=!!(i.counter||e.counter||e.counterValue),n=!!(t||i.details),[a,u]=ue(b),[{modelValue:V,...C}]=A.filterProps(e),[I]=xe(e);return l(A,R({ref:M,modelValue:o.value,"onUpdate:modelValue":s=>o.value=s,class:["v-textarea v-text-field",{"v-textarea--prefixed":e.prefix,"v-textarea--suffixed":e.suffix,"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-textarea--auto-grow":e.autoGrow,"v-textarea--no-resize":e.noResize||e.autoGrow,"v-text-field--plain-underlined":P.value},e.class],style:e.style},a,C,{centerAffix:w.value===1&&!P.value,focused:f.value}),{...i,default:s=>{let{isDisabled:v,isDirty:N,isReadonly:q,isValid:K}=s;return l(ge,R({ref:g,style:{"--v-textarea-control-height":H.value},onClick:j,onMousedown:J,"onClick:clear":W,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"],role:"textbox"},I,{active:$.value||N.value,centerAffix:w.value===1&&!P.value,dirty:N.value||e.dirty,disabled:v.value,focused:f.value,error:K.value===!1}),{...i,default:L=>{let{props:{class:_,...Q}}=L;return l(k,null,[e.prefix&&l("span",{class:"v-text-field__prefix"},[e.prefix]),z(l("textarea",R({ref:h,class:_,value:o.value,onInput:p,autofocus:e.autofocus,readonly:q.value,disabled:v.value,placeholder:e.placeholder,rows:e.rows,name:e.name,onFocus:F,onBlur:G},Q,u),null),[[ie("intersect"),{handler:O},null,{once:!0}]]),e.autoGrow&&z(l("textarea",{class:[_,"v-textarea__sizer"],"onUpdate:modelValue":X=>o.value=X,ref:c,readonly:!0,"aria-hidden":"true"},null),[[re,o.value]]),e.suffix&&l("span",{class:"v-text-field__suffix"},[e.suffix])])}})},details:n?s=>{var v;return l(k,null,[(v=i.details)==null?void 0:v.call(i,s),t&&l(k,null,[l("span",null,null),l(he,{active:e.persistentCounter||f.value,value:D.value,max:U.value},i.counter)])])}:void 0})}),Ve({},M,g,h)}});export{Ie as V};
