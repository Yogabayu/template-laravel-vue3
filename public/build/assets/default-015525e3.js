import{o as X,c as Z,b as Y,t as D,k as W,l as vt,i as q,m as pt,n as tt,r as V,p as E,w as m,q as C,a as d,h as B,s as gt,v as mt,x as Tt,y as bt,z as Yt,A as k,d as N,u as et,B as St,S as F,C as Wt,I as Xt,D as xt,E as Rt,G as Ht,H as Et,J as kt,K as At,L as Ct,M as rt,N as Pt,O as Bt,P as Mt,Q as Nt,R as $t,T as Dt,U as Vt,W as It,X as nt}from"./main-878584cf.js";import{l as Ot}from"./logo-f6354108.js";import{t as Kt,a as at,u as Ut,s as qt,V as jt,b as zt}from"./VListItemAction-0558a991.js";import{_ as z}from"./_plugin-vue_export-helper-c27b6911.js";import{V as Ft}from"./VTooltip-d3b4f2ad.js";import{V as G,a as Jt,b as Qt,c as J}from"./VMenu-391c856b.js";import{a as Gt}from"./avatar-1-8067d9d6.js";import{V as lt}from"./VAvatar-38c05082.js";import{m as Zt,M as te,V as ot}from"./VImg-7c1de8b6.js";import{V as st}from"./VDivider-84a06531.js";import"./VOverlay-0ba37623.js";import"./lazy-77664a73.js";import"./easing-9f15041e.js";import"./forwardRefs-a29b5f65.js";import"./index-69b63a60.js";import"./ssrBoot-e45bd108.js";const ee={class:"nav-section-title"},re={class:"title-wrapper"},ne=["textContent"],ae={__name:"VerticalNavSectionTitle",props:{item:{type:null,required:!0}},setup(t){return(e,r)=>(X(),Z("li",ee,[Y("div",re,[Y("span",{class:"title-text",textContent:D(t.item.heading)},null,8,ne)])]))}},le="/build/assets/upgrade-banner-dark-f34f6a24.png",oe="/build/assets/upgrade-banner-light-68cf2382.png";/*!
 * perfect-scrollbar v1.5.3
 * Copyright 2021 Hyunje Jun, MDBootstrap and Contributors
 * Licensed under MIT
 */function x(t){return getComputedStyle(t)}function T(t,e){for(var r in e){var a=e[r];typeof a=="number"&&(a=a+"px"),t.style[r]=a}return t}function K(t){var e=document.createElement("div");return e.className=t,e}var it=typeof Element<"u"&&(Element.prototype.matches||Element.prototype.webkitMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector);function H(t,e){if(!it)throw new Error("No element matching method supported");return it.call(t,e)}function M(t){t.remove?t.remove():t.parentNode&&t.parentNode.removeChild(t)}function ct(t,e){return Array.prototype.filter.call(t.children,function(r){return H(r,e)})}var _={main:"ps",rtl:"ps__rtl",element:{thumb:function(t){return"ps__thumb-"+t},rail:function(t){return"ps__rail-"+t},consuming:"ps__child--consume"},state:{focus:"ps--focus",clicking:"ps--clicking",active:function(t){return"ps--active-"+t},scrolling:function(t){return"ps--scrolling-"+t}}},yt={x:null,y:null};function _t(t,e){var r=t.element.classList,a=_.state.scrolling(e);r.contains(a)?clearTimeout(yt[e]):r.add(a)}function wt(t,e){yt[e]=setTimeout(function(){return t.isAlive&&t.element.classList.remove(_.state.scrolling(e))},t.settings.scrollingThreshold)}function se(t,e){_t(t,e),wt(t,e)}var I=function(e){this.element=e,this.handlers={}},Lt={isEmpty:{configurable:!0}};I.prototype.bind=function(e,r){typeof this.handlers[e]>"u"&&(this.handlers[e]=[]),this.handlers[e].push(r),this.element.addEventListener(e,r,!1)};I.prototype.unbind=function(e,r){var a=this;this.handlers[e]=this.handlers[e].filter(function(l){return r&&l!==r?!0:(a.element.removeEventListener(e,l,!1),!1)})};I.prototype.unbindAll=function(){for(var e in this.handlers)this.unbind(e)};Lt.isEmpty.get=function(){var t=this;return Object.keys(this.handlers).every(function(e){return t.handlers[e].length===0})};Object.defineProperties(I.prototype,Lt);var $=function(){this.eventElements=[]};$.prototype.eventElement=function(e){var r=this.eventElements.filter(function(a){return a.element===e})[0];return r||(r=new I(e),this.eventElements.push(r)),r};$.prototype.bind=function(e,r,a){this.eventElement(e).bind(r,a)};$.prototype.unbind=function(e,r,a){var l=this.eventElement(e);l.unbind(r,a),l.isEmpty&&this.eventElements.splice(this.eventElements.indexOf(l),1)};$.prototype.unbindAll=function(){this.eventElements.forEach(function(e){return e.unbindAll()}),this.eventElements=[]};$.prototype.once=function(e,r,a){var l=this.eventElement(e),i=function(o){l.unbind(r,i),a(o)};l.bind(r,i)};function U(t){if(typeof window.CustomEvent=="function")return new CustomEvent(t);var e=document.createEvent("CustomEvent");return e.initCustomEvent(t,!1,!1,void 0),e}function j(t,e,r,a,l){a===void 0&&(a=!0),l===void 0&&(l=!1);var i;if(e==="top")i=["contentHeight","containerHeight","scrollTop","y","up","down"];else if(e==="left")i=["contentWidth","containerWidth","scrollLeft","x","left","right"];else throw new Error("A proper axis should be provided");ie(t,r,i,a,l)}function ie(t,e,r,a,l){var i=r[0],o=r[1],s=r[2],n=r[3],u=r[4],c=r[5];a===void 0&&(a=!0),l===void 0&&(l=!1);var p=t.element;t.reach[n]=null,p[s]<1&&(t.reach[n]="start"),p[s]>t[i]-t[o]-1&&(t.reach[n]="end"),e&&(p.dispatchEvent(U("ps-scroll-"+n)),e<0?p.dispatchEvent(U("ps-scroll-"+u)):e>0&&p.dispatchEvent(U("ps-scroll-"+c)),a&&se(t,n)),t.reach[n]&&(e||l)&&p.dispatchEvent(U("ps-"+n+"-reach-"+t.reach[n]))}function y(t){return parseInt(t,10)||0}function ce(t){return H(t,"input,[contenteditable]")||H(t,"select,[contenteditable]")||H(t,"textarea,[contenteditable]")||H(t,"button,[contenteditable]")}function ue(t){var e=x(t);return y(e.width)+y(e.paddingLeft)+y(e.paddingRight)+y(e.borderLeftWidth)+y(e.borderRightWidth)}var P={isWebKit:typeof document<"u"&&"WebkitAppearance"in document.documentElement.style,supportsTouch:typeof window<"u"&&("ontouchstart"in window||"maxTouchPoints"in window.navigator&&window.navigator.maxTouchPoints>0||window.DocumentTouch&&document instanceof window.DocumentTouch),supportsIePointer:typeof navigator<"u"&&navigator.msMaxTouchPoints,isChrome:typeof navigator<"u"&&/Chrome/i.test(navigator&&navigator.userAgent)};function R(t){var e=t.element,r=Math.floor(e.scrollTop),a=e.getBoundingClientRect();t.containerWidth=Math.round(a.width),t.containerHeight=Math.round(a.height),t.contentWidth=e.scrollWidth,t.contentHeight=e.scrollHeight,e.contains(t.scrollbarXRail)||(ct(e,_.element.rail("x")).forEach(function(l){return M(l)}),e.appendChild(t.scrollbarXRail)),e.contains(t.scrollbarYRail)||(ct(e,_.element.rail("y")).forEach(function(l){return M(l)}),e.appendChild(t.scrollbarYRail)),!t.settings.suppressScrollX&&t.containerWidth+t.settings.scrollXMarginOffset<t.contentWidth?(t.scrollbarXActive=!0,t.railXWidth=t.containerWidth-t.railXMarginWidth,t.railXRatio=t.containerWidth/t.railXWidth,t.scrollbarXWidth=ut(t,y(t.railXWidth*t.containerWidth/t.contentWidth)),t.scrollbarXLeft=y((t.negativeScrollAdjustment+e.scrollLeft)*(t.railXWidth-t.scrollbarXWidth)/(t.contentWidth-t.containerWidth))):t.scrollbarXActive=!1,!t.settings.suppressScrollY&&t.containerHeight+t.settings.scrollYMarginOffset<t.contentHeight?(t.scrollbarYActive=!0,t.railYHeight=t.containerHeight-t.railYMarginHeight,t.railYRatio=t.containerHeight/t.railYHeight,t.scrollbarYHeight=ut(t,y(t.railYHeight*t.containerHeight/t.contentHeight)),t.scrollbarYTop=y(r*(t.railYHeight-t.scrollbarYHeight)/(t.contentHeight-t.containerHeight))):t.scrollbarYActive=!1,t.scrollbarXLeft>=t.railXWidth-t.scrollbarXWidth&&(t.scrollbarXLeft=t.railXWidth-t.scrollbarXWidth),t.scrollbarYTop>=t.railYHeight-t.scrollbarYHeight&&(t.scrollbarYTop=t.railYHeight-t.scrollbarYHeight),he(e,t),t.scrollbarXActive?e.classList.add(_.state.active("x")):(e.classList.remove(_.state.active("x")),t.scrollbarXWidth=0,t.scrollbarXLeft=0,e.scrollLeft=t.isRtl===!0?t.contentWidth:0),t.scrollbarYActive?e.classList.add(_.state.active("y")):(e.classList.remove(_.state.active("y")),t.scrollbarYHeight=0,t.scrollbarYTop=0,e.scrollTop=0)}function ut(t,e){return t.settings.minScrollbarLength&&(e=Math.max(e,t.settings.minScrollbarLength)),t.settings.maxScrollbarLength&&(e=Math.min(e,t.settings.maxScrollbarLength)),e}function he(t,e){var r={width:e.railXWidth},a=Math.floor(t.scrollTop);e.isRtl?r.left=e.negativeScrollAdjustment+t.scrollLeft+e.containerWidth-e.contentWidth:r.left=t.scrollLeft,e.isScrollbarXUsingBottom?r.bottom=e.scrollbarXBottom-a:r.top=e.scrollbarXTop+a,T(e.scrollbarXRail,r);var l={top:a,height:e.railYHeight};e.isScrollbarYUsingRight?e.isRtl?l.right=e.contentWidth-(e.negativeScrollAdjustment+t.scrollLeft)-e.scrollbarYRight-e.scrollbarYOuterWidth-9:l.right=e.scrollbarYRight-t.scrollLeft:e.isRtl?l.left=e.negativeScrollAdjustment+t.scrollLeft+e.containerWidth*2-e.contentWidth-e.scrollbarYLeft-e.scrollbarYOuterWidth:l.left=e.scrollbarYLeft+t.scrollLeft,T(e.scrollbarYRail,l),T(e.scrollbarX,{left:e.scrollbarXLeft,width:e.scrollbarXWidth-e.railBorderXWidth}),T(e.scrollbarY,{top:e.scrollbarYTop,height:e.scrollbarYHeight-e.railBorderYWidth})}function de(t){t.element,t.event.bind(t.scrollbarY,"mousedown",function(e){return e.stopPropagation()}),t.event.bind(t.scrollbarYRail,"mousedown",function(e){var r=e.pageY-window.pageYOffset-t.scrollbarYRail.getBoundingClientRect().top,a=r>t.scrollbarYTop?1:-1;t.element.scrollTop+=a*t.containerHeight,R(t),e.stopPropagation()}),t.event.bind(t.scrollbarX,"mousedown",function(e){return e.stopPropagation()}),t.event.bind(t.scrollbarXRail,"mousedown",function(e){var r=e.pageX-window.pageXOffset-t.scrollbarXRail.getBoundingClientRect().left,a=r>t.scrollbarXLeft?1:-1;t.element.scrollLeft+=a*t.containerWidth,R(t),e.stopPropagation()})}function fe(t){ht(t,["containerWidth","contentWidth","pageX","railXWidth","scrollbarX","scrollbarXWidth","scrollLeft","x","scrollbarXRail"]),ht(t,["containerHeight","contentHeight","pageY","railYHeight","scrollbarY","scrollbarYHeight","scrollTop","y","scrollbarYRail"])}function ht(t,e){var r=e[0],a=e[1],l=e[2],i=e[3],o=e[4],s=e[5],n=e[6],u=e[7],c=e[8],p=t.element,b=null,w=null,h=null;function f(v){v.touches&&v.touches[0]&&(v[l]=v.touches[0].pageY),p[n]=b+h*(v[l]-w),_t(t,u),R(t),v.stopPropagation(),v.type.startsWith("touch")&&v.changedTouches.length>1&&v.preventDefault()}function L(){wt(t,u),t[c].classList.remove(_.state.clicking),t.event.unbind(t.ownerDocument,"mousemove",f)}function g(v,S){b=p[n],S&&v.touches&&(v[l]=v.touches[0].pageY),w=v[l],h=(t[a]-t[r])/(t[i]-t[s]),S?t.event.bind(t.ownerDocument,"touchmove",f):(t.event.bind(t.ownerDocument,"mousemove",f),t.event.once(t.ownerDocument,"mouseup",L),v.preventDefault()),t[c].classList.add(_.state.clicking),v.stopPropagation()}t.event.bind(t[o],"mousedown",function(v){g(v)}),t.event.bind(t[o],"touchstart",function(v){g(v,!0)})}function ve(t){var e=t.element,r=function(){return H(e,":hover")},a=function(){return H(t.scrollbarX,":focus")||H(t.scrollbarY,":focus")};function l(i,o){var s=Math.floor(e.scrollTop);if(i===0){if(!t.scrollbarYActive)return!1;if(s===0&&o>0||s>=t.contentHeight-t.containerHeight&&o<0)return!t.settings.wheelPropagation}var n=e.scrollLeft;if(o===0){if(!t.scrollbarXActive)return!1;if(n===0&&i<0||n>=t.contentWidth-t.containerWidth&&i>0)return!t.settings.wheelPropagation}return!0}t.event.bind(t.ownerDocument,"keydown",function(i){if(!(i.isDefaultPrevented&&i.isDefaultPrevented()||i.defaultPrevented)&&!(!r()&&!a())){var o=document.activeElement?document.activeElement:t.ownerDocument.activeElement;if(o){if(o.tagName==="IFRAME")o=o.contentDocument.activeElement;else for(;o.shadowRoot;)o=o.shadowRoot.activeElement;if(ce(o))return}var s=0,n=0;switch(i.which){case 37:i.metaKey?s=-t.contentWidth:i.altKey?s=-t.containerWidth:s=-30;break;case 38:i.metaKey?n=t.contentHeight:i.altKey?n=t.containerHeight:n=30;break;case 39:i.metaKey?s=t.contentWidth:i.altKey?s=t.containerWidth:s=30;break;case 40:i.metaKey?n=-t.contentHeight:i.altKey?n=-t.containerHeight:n=-30;break;case 32:i.shiftKey?n=t.containerHeight:n=-t.containerHeight;break;case 33:n=t.containerHeight;break;case 34:n=-t.containerHeight;break;case 36:n=t.contentHeight;break;case 35:n=-t.contentHeight;break;default:return}t.settings.suppressScrollX&&s!==0||t.settings.suppressScrollY&&n!==0||(e.scrollTop-=n,e.scrollLeft+=s,R(t),l(s,n)&&i.preventDefault())}})}function pe(t){var e=t.element;function r(o,s){var n=Math.floor(e.scrollTop),u=e.scrollTop===0,c=n+e.offsetHeight===e.scrollHeight,p=e.scrollLeft===0,b=e.scrollLeft+e.offsetWidth===e.scrollWidth,w;return Math.abs(s)>Math.abs(o)?w=u||c:w=p||b,w?!t.settings.wheelPropagation:!0}function a(o){var s=o.deltaX,n=-1*o.deltaY;return(typeof s>"u"||typeof n>"u")&&(s=-1*o.wheelDeltaX/6,n=o.wheelDeltaY/6),o.deltaMode&&o.deltaMode===1&&(s*=10,n*=10),s!==s&&n!==n&&(s=0,n=o.wheelDelta),o.shiftKey?[-n,-s]:[s,n]}function l(o,s,n){if(!P.isWebKit&&e.querySelector("select:focus"))return!0;if(!e.contains(o))return!1;for(var u=o;u&&u!==e;){if(u.classList.contains(_.element.consuming))return!0;var c=x(u);if(n&&c.overflowY.match(/(scroll|auto)/)){var p=u.scrollHeight-u.clientHeight;if(p>0&&(u.scrollTop>0&&n<0||u.scrollTop<p&&n>0))return!0}if(s&&c.overflowX.match(/(scroll|auto)/)){var b=u.scrollWidth-u.clientWidth;if(b>0&&(u.scrollLeft>0&&s<0||u.scrollLeft<b&&s>0))return!0}u=u.parentNode}return!1}function i(o){var s=a(o),n=s[0],u=s[1];if(!l(o.target,n,u)){var c=!1;t.settings.useBothWheelAxes?t.scrollbarYActive&&!t.scrollbarXActive?(u?e.scrollTop-=u*t.settings.wheelSpeed:e.scrollTop+=n*t.settings.wheelSpeed,c=!0):t.scrollbarXActive&&!t.scrollbarYActive&&(n?e.scrollLeft+=n*t.settings.wheelSpeed:e.scrollLeft-=u*t.settings.wheelSpeed,c=!0):(e.scrollTop-=u*t.settings.wheelSpeed,e.scrollLeft+=n*t.settings.wheelSpeed),R(t),c=c||r(n,u),c&&!o.ctrlKey&&(o.stopPropagation(),o.preventDefault())}}typeof window.onwheel<"u"?t.event.bind(e,"wheel",i):typeof window.onmousewheel<"u"&&t.event.bind(e,"mousewheel",i)}function ge(t){if(!P.supportsTouch&&!P.supportsIePointer)return;var e=t.element;function r(h,f){var L=Math.floor(e.scrollTop),g=e.scrollLeft,v=Math.abs(h),S=Math.abs(f);if(S>v){if(f<0&&L===t.contentHeight-t.containerHeight||f>0&&L===0)return window.scrollY===0&&f>0&&P.isChrome}else if(v>S&&(h<0&&g===t.contentWidth-t.containerWidth||h>0&&g===0))return!0;return!0}function a(h,f){e.scrollTop-=f,e.scrollLeft-=h,R(t)}var l={},i=0,o={},s=null;function n(h){return h.targetTouches?h.targetTouches[0]:h}function u(h){return h.pointerType&&h.pointerType==="pen"&&h.buttons===0?!1:!!(h.targetTouches&&h.targetTouches.length===1||h.pointerType&&h.pointerType!=="mouse"&&h.pointerType!==h.MSPOINTER_TYPE_MOUSE)}function c(h){if(u(h)){var f=n(h);l.pageX=f.pageX,l.pageY=f.pageY,i=new Date().getTime(),s!==null&&clearInterval(s)}}function p(h,f,L){if(!e.contains(h))return!1;for(var g=h;g&&g!==e;){if(g.classList.contains(_.element.consuming))return!0;var v=x(g);if(L&&v.overflowY.match(/(scroll|auto)/)){var S=g.scrollHeight-g.clientHeight;if(S>0&&(g.scrollTop>0&&L<0||g.scrollTop<S&&L>0))return!0}if(f&&v.overflowX.match(/(scroll|auto)/)){var A=g.scrollWidth-g.clientWidth;if(A>0&&(g.scrollLeft>0&&f<0||g.scrollLeft<A&&f>0))return!0}g=g.parentNode}return!1}function b(h){if(u(h)){var f=n(h),L={pageX:f.pageX,pageY:f.pageY},g=L.pageX-l.pageX,v=L.pageY-l.pageY;if(p(h.target,g,v))return;a(g,v),l=L;var S=new Date().getTime(),A=S-i;A>0&&(o.x=g/A,o.y=v/A,i=S),r(g,v)&&h.preventDefault()}}function w(){t.settings.swipeEasing&&(clearInterval(s),s=setInterval(function(){if(t.isInitialized){clearInterval(s);return}if(!o.x&&!o.y){clearInterval(s);return}if(Math.abs(o.x)<.01&&Math.abs(o.y)<.01){clearInterval(s);return}if(!t.element){clearInterval(s);return}a(o.x*30,o.y*30),o.x*=.8,o.y*=.8},10))}P.supportsTouch?(t.event.bind(e,"touchstart",c),t.event.bind(e,"touchmove",b),t.event.bind(e,"touchend",w)):P.supportsIePointer&&(window.PointerEvent?(t.event.bind(e,"pointerdown",c),t.event.bind(e,"pointermove",b),t.event.bind(e,"pointerup",w)):window.MSPointerEvent&&(t.event.bind(e,"MSPointerDown",c),t.event.bind(e,"MSPointerMove",b),t.event.bind(e,"MSPointerUp",w)))}var me=function(){return{handlers:["click-rail","drag-thumb","keyboard","wheel","touch"],maxScrollbarLength:null,minScrollbarLength:null,scrollingThreshold:1e3,scrollXMarginOffset:0,scrollYMarginOffset:0,suppressScrollX:!1,suppressScrollY:!1,swipeEasing:!0,useBothWheelAxes:!1,wheelPropagation:!0,wheelSpeed:1}},be={"click-rail":de,"drag-thumb":fe,keyboard:ve,wheel:pe,touch:ge},O=function(e,r){var a=this;if(r===void 0&&(r={}),typeof e=="string"&&(e=document.querySelector(e)),!e||!e.nodeName)throw new Error("no element is specified to initialize PerfectScrollbar");this.element=e,e.classList.add(_.main),this.settings=me();for(var l in r)this.settings[l]=r[l];this.containerWidth=null,this.containerHeight=null,this.contentWidth=null,this.contentHeight=null;var i=function(){return e.classList.add(_.state.focus)},o=function(){return e.classList.remove(_.state.focus)};this.isRtl=x(e).direction==="rtl",this.isRtl===!0&&e.classList.add(_.rtl),this.isNegativeScroll=function(){var u=e.scrollLeft,c=null;return e.scrollLeft=-1,c=e.scrollLeft<0,e.scrollLeft=u,c}(),this.negativeScrollAdjustment=this.isNegativeScroll?e.scrollWidth-e.clientWidth:0,this.event=new $,this.ownerDocument=e.ownerDocument||document,this.scrollbarXRail=K(_.element.rail("x")),e.appendChild(this.scrollbarXRail),this.scrollbarX=K(_.element.thumb("x")),this.scrollbarXRail.appendChild(this.scrollbarX),this.scrollbarX.setAttribute("tabindex",0),this.event.bind(this.scrollbarX,"focus",i),this.event.bind(this.scrollbarX,"blur",o),this.scrollbarXActive=null,this.scrollbarXWidth=null,this.scrollbarXLeft=null;var s=x(this.scrollbarXRail);this.scrollbarXBottom=parseInt(s.bottom,10),isNaN(this.scrollbarXBottom)?(this.isScrollbarXUsingBottom=!1,this.scrollbarXTop=y(s.top)):this.isScrollbarXUsingBottom=!0,this.railBorderXWidth=y(s.borderLeftWidth)+y(s.borderRightWidth),T(this.scrollbarXRail,{display:"block"}),this.railXMarginWidth=y(s.marginLeft)+y(s.marginRight),T(this.scrollbarXRail,{display:""}),this.railXWidth=null,this.railXRatio=null,this.scrollbarYRail=K(_.element.rail("y")),e.appendChild(this.scrollbarYRail),this.scrollbarY=K(_.element.thumb("y")),this.scrollbarYRail.appendChild(this.scrollbarY),this.scrollbarY.setAttribute("tabindex",0),this.event.bind(this.scrollbarY,"focus",i),this.event.bind(this.scrollbarY,"blur",o),this.scrollbarYActive=null,this.scrollbarYHeight=null,this.scrollbarYTop=null;var n=x(this.scrollbarYRail);this.scrollbarYRight=parseInt(n.right,10),isNaN(this.scrollbarYRight)?(this.isScrollbarYUsingRight=!1,this.scrollbarYLeft=y(n.left)):this.isScrollbarYUsingRight=!0,this.scrollbarYOuterWidth=this.isRtl?ue(this.scrollbarY):null,this.railBorderYWidth=y(n.borderTopWidth)+y(n.borderBottomWidth),T(this.scrollbarYRail,{display:"block"}),this.railYMarginHeight=y(n.marginTop)+y(n.marginBottom),T(this.scrollbarYRail,{display:""}),this.railYHeight=null,this.railYRatio=null,this.reach={x:e.scrollLeft<=0?"start":e.scrollLeft>=this.contentWidth-this.containerWidth?"end":null,y:e.scrollTop<=0?"start":e.scrollTop>=this.contentHeight-this.containerHeight?"end":null},this.isAlive=!0,this.settings.handlers.forEach(function(u){return be[u](a)}),this.lastScrollTop=Math.floor(e.scrollTop),this.lastScrollLeft=e.scrollLeft,this.event.bind(this.element,"scroll",function(u){return a.onScroll(u)}),R(this)};O.prototype.update=function(){this.isAlive&&(this.negativeScrollAdjustment=this.isNegativeScroll?this.element.scrollWidth-this.element.clientWidth:0,T(this.scrollbarXRail,{display:"block"}),T(this.scrollbarYRail,{display:"block"}),this.railXMarginWidth=y(x(this.scrollbarXRail).marginLeft)+y(x(this.scrollbarXRail).marginRight),this.railYMarginHeight=y(x(this.scrollbarYRail).marginTop)+y(x(this.scrollbarYRail).marginBottom),T(this.scrollbarXRail,{display:"none"}),T(this.scrollbarYRail,{display:"none"}),R(this),j(this,"top",0,!1,!0),j(this,"left",0,!1,!0),T(this.scrollbarXRail,{display:""}),T(this.scrollbarYRail,{display:""}))};O.prototype.onScroll=function(e){this.isAlive&&(R(this),j(this,"top",this.element.scrollTop-this.lastScrollTop),j(this,"left",this.element.scrollLeft-this.lastScrollLeft),this.lastScrollTop=Math.floor(this.element.scrollTop),this.lastScrollLeft=this.element.scrollLeft)};O.prototype.destroy=function(){this.isAlive&&(this.event.unbindAll(),M(this.scrollbarX),M(this.scrollbarY),M(this.scrollbarXRail),M(this.scrollbarYRail),this.removePsClasses(),this.element=null,this.scrollbarX=null,this.scrollbarY=null,this.scrollbarXRail=null,this.scrollbarYRail=null,this.isAlive=!1)};O.prototype.removePsClasses=function(){this.element.className=this.element.className.split(" ").filter(function(e){return!e.match(/^ps([-_].+|)$/)}).join(" ")};const dt=["scroll","ps-scroll-y","ps-scroll-x","ps-scroll-up","ps-scroll-down","ps-scroll-left","ps-scroll-right","ps-y-reach-start","ps-y-reach-end","ps-x-reach-start","ps-x-reach-end"];var ye={name:"PerfectScrollbar",props:{options:{type:Object,required:!1,default:()=>{}},tag:{type:String,required:!1,default:"div"},watchOptions:{type:Boolean,required:!1,default:!1}},emits:dt,data(){return{ps:null}},watch:{watchOptions(t){!t&&this.watcher?this.watcher():this.createWatcher()}},mounted(){this.create(),this.watchOptions&&this.createWatcher()},updated(){this.$nextTick(()=>{this.update()})},beforeUnmount(){this.destroy()},methods:{create(){this.ps&&this.$isServer||(this.ps=new O(this.$el,this.options),dt.forEach(t=>{this.ps.element.addEventListener(t,e=>this.$emit(t,e))}))},createWatcher(){this.watcher=this.$watch("options",()=>{this.destroy(),this.create()},{deep:!0})},update(){this.ps&&this.ps.update()},destroy(){this.ps&&(this.ps.destroy(),this.ps=null)}},render(){return W(this.tag,{class:"ps"},this.$slots.default&&this.$slots.default())}};const _e={class:"nav-header"},we=["innerHTML"],Le=Y("h1",{class:"leading-normal"}," sneat ",-1),Te=Y("div",{class:"vertical-nav-items-shadow"},null,-1),Ye={__name:"VerticalNav",props:{tag:{type:[String,null],required:!1,default:"aside"},isOverlayNavActive:{type:Boolean,required:!0},toggleIsOverlayNavActive:{type:Function,required:!0}},setup(t){const e=t,{mdAndDown:r}=vt(),a=q(),l=pt();tt(()=>l.path,()=>{e.toggleIsOverlayNavActive(!1)});const i=q(!1),o=n=>i.value=n,s=n=>{i.value=n.target.scrollTop>0};return(n,u)=>{const c=V("RouterLink");return X(),E(mt(e.tag),{ref_key:"refNav",ref:a,class:gt(["layout-vertical-nav",[{visible:t.isOverlayNavActive,scrolled:B(i),"overlay-nav":B(r)}]])},{default:m(()=>[Y("div",_e,[C(n.$slots,"nav-header",{},()=>[d(c,{to:"/",class:"app-logo d-flex align-center gap-x-3 app-title-wrapper"},{default:m(()=>[Y("div",{class:"d-flex",innerHTML:B(Ot)},null,8,we),Le]),_:1})])]),C(n.$slots,"before-nav-items",{},()=>[Te]),C(n.$slots,"nav-items",{updateIsVerticalNavScrolled:o},()=>[d(B(ye),{tag:"ul",class:"nav-items",options:{wheelPropagation:!1},onPsScrollY:s},{default:m(()=>[C(n.$slots,"default")]),_:3})]),C(n.$slots,"after-nav-items")]),_:3},8,["class"])}}};function Se(t,e){const r=Tt(u()),a=Kt(t),l=bt({get(){var c;const p=a.value;let b=e!=null&&e.getIndexOf?e.getIndexOf(r.value,p):p.indexOf(r.value);return b<0&&(b=(c=e==null?void 0:e.fallbackIndex)!=null?c:0),b},set(c){i(c)}});function i(c){const p=a.value,b=p.length,w=(c%b+b)%b,h=p[w];return r.value=h,h}function o(c=1){return i(l.value+c)}function s(c=1){return o(c)}function n(c=1){return o(-c)}function u(){var c,p;return(p=at((c=e==null?void 0:e.initialValue)!=null?c:at(t)[0]))!=null?p:void 0}return tt(a,()=>i(l.value)),{state:r,index:l,next:s,prev:n}}const We=Yt({setup(t,{slots:e}){const r=q(!1),a=q(!1),l=Ut(r),i=pt(),{mdAndDown:o}=vt();return qt(r,a),()=>{var b,w,h;const s=W(Ye,{isOverlayNavActive:r.value,toggleIsOverlayNavActive:l},{"nav-header":()=>{var f;return(f=e["vertical-nav-header"])==null?void 0:f.call(e)},"before-nav-items":()=>{var f;return(f=e["before-vertical-nav-items"])==null?void 0:f.call(e)},default:()=>{var f;return(f=e["vertical-nav-content"])==null?void 0:f.call(e)},"after-nav-items":()=>{var f;return(f=e["after-vertical-nav-items"])==null?void 0:f.call(e)}}),n=W("header",{class:["layout-navbar navbar-blur"]},[W("div",{class:"navbar-content-container"},(b=e.navbar)==null?void 0:b.call(e,{toggleVerticalOverlayNavActive:l}))]),u=W("main",{class:"layout-page-content"},W("div",{class:"page-content-container"},(w=e.default)==null?void 0:w.call(e))),c=W("footer",{class:"layout-footer"},[W("div",{class:"footer-content-container"},(h=e.footer)==null?void 0:h.call(e))]),p=W("div",{class:["layout-overlay",{visible:a.value}],onClick:()=>{a.value=!a.value}});return W("div",{class:["layout-wrapper layout-nav-type-vertical layout-navbar-static layout-footer-static layout-content-width-fluid",o.value&&"layout-overlay-nav",i.meta.layoutWrapperClasses]},[s,W("div",{class:"layout-content-wrapper"},[n,u,c]),p])}}});const Xe={class:"nav-item-title"},Q={__name:"VerticalNavLink",props:{item:{type:null,required:!0}},setup(t){return(e,r)=>(X(),Z("li",{class:gt(["nav-link",{disabled:t.item.disable}])},[(X(),E(mt(t.item.to?"RouterLink":"a"),{to:t.item.to,href:t.item.href},{default:m(()=>[d(k,{icon:t.item.icon,class:"nav-item-icon"},null,8,["icon"]),Y("span",Xe,D(t.item.title),1)]),_:1},8,["to","href"]))],2))}},xe={},Re={class:"h-100 d-flex align-center justify-space-between"},He={class:"d-flex align-center"},Ee=Y("a",{href:"https://themeselection.com",target:"_blank",rel:"noopener noreferrer",class:"text-primary ms-1"},"ThemeSelection ",-1),ke=Y("a",{href:"https://yogabayuap.com",target:"_blank",rel:"noopener noreferrer",class:"text-primary ms-1"},"Yoga Bayu AP ",-1);function Ae(t,e){return X(),Z("div",Re,[Y("span",He,[N(" © "+D(new Date().getFullYear())+" Made With ",1),d(k,{icon:"bx-heart",color:"error",size:"1.25rem",class:"mx-1"}),N(" By "),Ee,N(" and customization by "),ke])])}const Ce=z(xe,[["render",Ae]]),Pe={class:"text-capitalize"},Be={__name:"ThemeSwitcher",props:{themes:{type:Array,required:!0}},setup(t){const e=t,{name:r,global:a}=et(),{state:l,next:i,index:o}=Se(e.themes.map(n=>n.name),{initialValue:r}),s=()=>{a.name.value=i()};return tt(()=>a.name.value,n=>{l.value=n}),(n,u)=>{const c=V("IconBtn");return X(),E(c,{onClick:s},{default:m(()=>[d(k,{icon:e.themes[B(o)].icon},null,8,["icon"]),d(Ft,{activator:"parent","open-delay":"1000","scroll-strategy":"close"},{default:m(()=>[Y("span",Pe,D(B(l)),1)]),_:1})]),_:1})}}},Me={__name:"NavbarThemeSwitcher",setup(t){const e=[{name:"light",icon:"bx-sun"},{name:"dark",icon:"bx-moon"}];return(r,a)=>{const l=Be;return X(),E(l,{themes:e})}}},Ne={setup(){const t=St();return{logout:()=>{localStorage.removeItem("userData"),localStorage.removeItem("userToken"),F.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3,timerProgressBar:!0,didOpen:a=>{a.addEventListener("mouseenter",F.stopTimer),a.addEventListener("mouseleave",F.resumeTimer)}}).fire({icon:"success",title:"Yeay",text:"Berhasil update data silahkan login ulang"}),t.push("/login")}}}};function $e(t,e,r,a,l,i){return X(),E(G,{onClick:a.logout},{default:m(()=>[N("Logout")]),_:1},8,["onClick"])}const De=z(Ne,[["render",$e]]);const Ve=Wt({bordered:Boolean,color:String,content:[Number,String],dot:Boolean,floating:Boolean,icon:Xt,inline:Boolean,label:{type:String,default:"$vuetify.badge"},max:[Number,String],modelValue:{type:Boolean,default:!0},offsetX:[Number,String],offsetY:[Number,String],textColor:String,...xt(),...Rt({location:"top end"}),...Ht(),...Et(),...kt(),...Zt({transition:"scale-rotate-transition"})},"v-badge"),ft=At()({name:"VBadge",inheritAttrs:!1,props:Ve(),setup(t,e){const{backgroundColorClasses:r,backgroundColorStyles:a}=Ct(rt(t,"color")),{roundedClasses:l}=Pt(t),{t:i}=Bt(),{textColorClasses:o,textColorStyles:s}=Mt(rt(t,"textColor")),{themeClasses:n}=et(),{locationStyles:u}=Nt(t,!0,c=>(t.floating?t.dot?2:4:t.dot?8:12)+(["top","bottom"].includes(c)?+(t.offsetY??0):["left","right"].includes(c)?+(t.offsetX??0):0));return $t(()=>{const c=Number(t.content),p=!t.max||isNaN(c)?t.content:c<=+t.max?c:`${t.max}+`,[b,w]=Dt(e.attrs,["aria-atomic","aria-label","aria-live","role","title"]);return d(t.tag,nt({class:["v-badge",{"v-badge--bordered":t.bordered,"v-badge--dot":t.dot,"v-badge--floating":t.floating,"v-badge--inline":t.inline},t.class]},w,{style:t.style}),{default:()=>{var h,f;return[d("div",{class:"v-badge__wrapper"},[(f=(h=e.slots).default)==null?void 0:f.call(h),d(te,{transition:t.transition},{default:()=>{var L,g;return[Vt(d("span",nt({class:["v-badge__badge",n.value,r.value,l.value,o.value],style:[a.value,s.value,t.inline?{}:u.value],"aria-atomic":"true","aria-label":i(t.label,c),"aria-live":"polite",role:"status"},b),[t.dot?void 0:e.slots.badge?(g=(L=e.slots).badge)==null?void 0:g.call(L):t.icon?d(k,{icon:t.icon},null):p]),[[It,t.modelValue]])]}})])]}})}),{}}}),Ie={components:{LogoutBtn:De},data(){return{avatar1:Gt,userData:null}},methods:{getUserData(){const t=localStorage.getItem("userData");t&&(this.userData=JSON.parse(t))}},mounted(){this.getUserData()}};function Oe(t,e,r,a,l,i){const o=V("LogoutBtn");return X(),E(ft,{dot:"",location:"bottom right","offset-x":"3","offset-y":"3",color:"success",bordered:""},{default:m(()=>[d(lt,{class:"cursor-pointer",color:"primary",variant:"tonal"},{default:m(()=>[d(ot,{src:l.avatar1},null,8,["src"]),d(Jt,{activator:"parent",width:"230",location:"bottom end",offset:"14px"},{default:m(()=>[d(Qt,null,{default:m(()=>[d(J,null,{prepend:m(()=>[d(jt,{start:""},{default:m(()=>[d(ft,{dot:"",location:"bottom right","offset-x":"3","offset-y":"3",color:"success"},{default:m(()=>[d(lt,{color:"primary",variant:"tonal"},{default:m(()=>[d(ot,{src:l.avatar1},null,8,["src"])]),_:1})]),_:1})]),_:1})]),default:m(()=>[d(G,{class:"font-weight-semibold"},{default:m(()=>[N(D(this.userData.name),1)]),_:1})]),_:1}),d(st,{class:"my-2"}),d(J,{to:"/account-profile"},{prepend:m(()=>[d(k,{class:"me-2",icon:"bx-user",size:"22"})]),default:m(()=>[d(G,null,{default:m(()=>[N("Profile")]),_:1})]),_:1}),d(st,{class:"my-2"}),d(J,{to:"/login"},{prepend:m(()=>[d(k,{class:"me-2",icon:"bx-log-out",size:"22"})]),default:m(()=>[d(o)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}const Ke=z(Ie,[["render",Oe]]);const Ue={class:"d-flex h-100 align-center"},qe={__name:"DefaultLayoutWithVerticalNav",setup(t){const e=et();return bt(()=>e.global.name.value==="light"?oe:le),(r,a)=>{const l=V("IconBtn");return X(),E(We,null,{navbar:m(({toggleVerticalOverlayNavActive:i})=>[Y("div",Ue,[d(l,{class:"ms-n3 d-lg-none",onClick:o=>i(!0)},{default:m(()=>[d(k,{icon:"bx-menu"})]),_:2},1032,["onClick"]),d(zt),d(Me,{class:"me-2"}),d(Ke)])]),"vertical-nav-content":m(()=>[d(Q,{item:{title:"Dashboard",icon:"bx-home",to:"/dashboard"}}),d(Q,{item:{title:"Account Settings",icon:"mdi-account-cog-outline",to:"/account-settings"}}),d(ae,{item:{heading:"Pages"}}),d(Q,{item:{title:"Error",icon:"bx-info-circle",to:"/no-existence"}})]),footer:m(()=>[d(Ce)]),default:m(()=>[C(r.$slots,"default",{},void 0,!0)]),_:3})}}},je=z(qe,[["__scopeId","data-v-ae22f0eb"]]);const ur={__name:"default",setup(t){return(e,r)=>{const a=V("RouterView");return X(),E(je,null,{default:m(()=>[d(a)]),_:1})}}};export{ur as default};
