import{_ as $,L as k,a as B,V as g,b as a,c as l,d as S}from"./VBadge-a7be78ae.js";import{_ as f}from"./_plugin-vue_export-helper-c27b6911.js";import{o as r,c as w,b as D,t as L,h as u,r as d,w as e,a as t,e as b,i as m,j as U,k as I,l as N}from"./main-2c9a0e59.js";import{V as x}from"./VAvatar-368a1dc6.js";import{V as v}from"./VImg-abb88c8a.js";import{V as R,a as T,b as _,c as V,d as y}from"./VMenu-67634d80.js";import{V as F}from"./VListItemAction-4ad37e51.js";import{V as P}from"./VSpacer-9e486da0.js";import"./arthaya-5f3e6501.js";import"./index-a33bf320.js";import"./VTooltip-3bf33c77.js";import"./VOverlay-547ccc7e.js";import"./index-e994dd60.js";import"./dialog-transition-29f1fa53.js";const A="/build/assets/upgrade-banner-dark-f34f6a24.png",C="/build/assets/upgrade-banner-light-68cf2382.png",J={},W={class:"h-100 d-flex align-center justify-space-between"},j={class:"d-flex align-center"};function z(o,s){return r(),w("div",W,[D("span",j," © "+L(new Date().getFullYear())+" | v2-kerinci ",1)])}const K=f(J,[["render",z]]),O={__name:"NavbarThemeSwitcher",setup(o){const s=[{name:"light",icon:"bx-sun"},{name:"dark",icon:"bx-moon"}];return(i,c)=>{const n=$;return r(),u(n,{themes:s})}}},E={components:{LogoutBtn:k},data(){return{avatar1:B,userData:null,photoURL:this.$userPhotoUrl+JSON.parse(localStorage.getItem("userData")).photo}},methods:{getUserData(){const o=localStorage.getItem("userData");o&&(this.userData=JSON.parse(o))}},mounted(){this.getUserData()}};function M(o,s,i,c,n,p){const h=d("LogoutBtn");return r(),u(g,{dot:"",location:"bottom right","offset-x":"3","offset-y":"3",color:"success",bordered:""},{default:e(()=>[t(x,{class:"cursor-pointer",color:"primary",variant:"tonal"},{default:e(()=>[t(v,{src:n.photoURL},null,8,["src"]),t(R,{activator:"parent",width:"230",location:"bottom end",offset:"14px"},{default:e(()=>[t(T,null,{default:e(()=>[t(_,null,{prepend:e(()=>[t(F,{start:""},{default:e(()=>[t(g,{dot:"",location:"bottom right","offset-x":"3","offset-y":"3",color:"success"},{default:e(()=>[t(x,{color:"primary",variant:"tonal"},{default:e(()=>[t(v,{src:n.photoURL},null,8,["src"])]),_:1})]),_:1})]),_:1})]),default:e(()=>[t(V,{class:"font-weight-semibold"},{default:e(()=>[b(L(this.userData.name),1)]),_:1})]),_:1}),t(y,{class:"my-2"}),t(_,{to:"/account-profile"},{prepend:e(()=>[t(m,{class:"me-2",icon:"bx-user",size:"22"})]),default:e(()=>[t(V,null,{default:e(()=>[b("Profile")]),_:1})]),_:1}),t(y,{class:"my-2"}),t(_,{to:"/login"},{prepend:e(()=>[t(m,{class:"me-2",icon:"bx-log-out",size:"22"})]),default:e(()=>[t(h)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}const Y=f(E,[["render",M]]);const q={class:"d-flex h-100 align-center"},G={__name:"DefaultLayoutWithVerticalNav",setup(o){const s=U();return I(()=>s.global.name.value==="light"?C:A),(i,c)=>{const n=d("IconBtn");return r(),u(S,null,{navbar:e(({toggleVerticalOverlayNavActive:p})=>[D("div",q,[t(n,{class:"ms-n3 d-lg-none",onClick:h=>p(!0)},{default:e(()=>[t(m,{icon:"bx-menu"})]),_:2},1032,["onClick"]),t(P),t(O,{class:"me-2"}),t(Y)])]),"vertical-nav-content":e(()=>[t(a,{item:{title:"Dashboard",icon:"bx-home",to:"/dashboard"}}),t(l,{item:{heading:"Konfigurasi"}}),t(a,{item:{title:"User",icon:"bx-user",to:"/a-user"}}),t(a,{item:{title:"Jabatan",icon:"bx-area",to:"/a-position"}}),t(a,{item:{to:"/a-category",title:"Kategori",icon:"bx-area"}}),t(l,{item:{heading:"File"}}),t(a,{item:{to:"/a-file",title:"Semua File",icon:"bx-file"}}),t(a,{item:{to:"/a-popular",title:"File Populer",icon:"bxs-hot"}}),t(a,{item:{title:"Riwayat Akses User",icon:"bx-history",to:"/a-filehistory"}}),t(l,{item:{heading:"Draft"}}),t(a,{item:{to:"/a-draft",title:"Semua Draft",icon:"bx-file"}}),t(l,{item:{heading:"Lain-lain"}}),t(a,{item:{to:"/a-devices",title:"Perangkat User",icon:"bx-devices"}}),t(a,{item:{to:"/a-useractivity",title:"Activitas User",icon:"bx-user"}})]),footer:e(()=>[t(K)]),default:e(()=>[N(i.$slots,"default",{},void 0,!0)]),_:3})}}},H=f(G,[["__scopeId","data-v-14b05fc7"]]);const _t={__name:"default",setup(o){return(s,i)=>{const c=d("RouterView");return r(),u(H,null,{default:e(()=>[t(c)]),_:1})}}};export{_t as default};
