import{m as h}from"./VAvatar-368a1dc6.js";import{_ as k}from"./_plugin-vue_export-helper-c27b6911.js";import{V as _,a as p,c as w,e as C}from"./VCard-ddac2cfd.js";import{V as F}from"./VContainer-668d95bd.js";import{V as c,a}from"./VRow-4964dfbe.js";import{o as n,c as g,a as e,w as t,e as v,h as d,E as b,f as u,i as T,G as S,F as $,b as l,t as m,V as x}from"./main-2c9a0e59.js";import{V as B}from"./VImg-abb88c8a.js";const D={data(){return{items:null}},methods:{toDetail(s){this.$router.push(`/u-filedetail/${s}`)},async favorite(s){try{const r=await h.get(`/user/setfavfile/${s}`);r.status===200?(this.getFileFav(),this.$showToast("success","Success",r.data.message)):(this.getFileFav(),this.$showToast("error","Sorry",r.data.message))}catch(r){this.$showToast("error","Sorry",r.response.data.message)}},async getFileFav(){try{const s=await h.get("/user/fav");s.status===200?this.items=s.data.data:this.$showToast("error","Sorry",s.data.data.message)}catch(s){this.$showToast("error","Sorry",s.data.data.message)}}},mounted(){this.getFileFav()}},N=l("span",{class:"subtitle-1"},"Getting Data ...",-1),I=l("span",{class:"subtitle-1"},"Tidak ada file favorite",-1),j={class:"text-overline mb-1"},E={class:"text-h6 mb-1"},G={class:"text-caption"};function L(s,r,R,z,o,f){return n(),g("div",null,[e(_,{class:"auth-card pa-4 pt-5"},{default:t(()=>[e(p,{class:"align-left"},{default:t(()=>[e(w,{class:"text-2xl font-weight-bold"},{default:t(()=>[v(" File Favorite ")]),_:1})]),_:1}),e(F,null,{default:t(()=>[e(c,null,{default:t(()=>[o.items==null?(n(),d(a,{key:0,cols:"12",md:"12"},{default:t(()=>[e(c,{class:"text-center"},{default:t(()=>[e(a,{cols:"12"},{default:t(()=>[e(b,{indeterminate:"",color:"primary"})]),_:1}),e(a,{cols:"12"},{default:t(()=>[N]),_:1})]),_:1})]),_:1})):u("",!0),o.items!=null&&o.items.length==0?(n(),d(a,{key:1,cols:"12",md:"6"},{default:t(()=>[e(c,{class:"text-center"},{default:t(()=>[e(a,{cols:"12"},{default:t(()=>[e(T,{size:"64",color:"grey lighten-2"},{default:t(()=>[v("mdi-folder-search-outline")]),_:1})]),_:1}),e(a,{cols:"12"},{default:t(()=>[I]),_:1})]),_:1})]),_:1})):u("",!0),o.items!=null&&o.items.length>0?(n(!0),g(S,{key:2},$(o.items,(i,y)=>(n(),d(a,{key:y,cols:"12",md:"6"},{default:t(()=>[e(_,{class:"mx-auto card-style","max-width":"344",height:"230px",color:"primary",variant:"tonal",hover:""},{default:t(()=>[e(B,{src:"https://bankarthaya.com/wp-content/uploads/2023/07/desktop-1024x576-1.jpg",height:"20px",cover:""}),e(p,null,{default:t(()=>[l("div",null,[l("div",j,m(i.file.author.name),1),l("div",E,m(i.file.name.substring(0,30)+"..."),1),l("div",G,m(i.file.summary.substring(0,70)+"..."),1)])]),_:2},1024),e(C,{class:"d-flex justify-end"},{default:t(()=>[e(x,{class:"ma-2",variant:"text",icon:"mdi-open-in-new",color:"blue-lighten-2",onClick:V=>f.toDetail(i.file.id)},null,8,["onClick"]),e(x,{class:"ma-2",variant:"text",icon:"mdi-trash",color:"blue-lighten-2",onClick:V=>f.favorite(i.file.id)},null,8,["onClick"])]),_:2},1024)]),_:2},1024)]),_:2},1024))),128)):u("",!0)]),_:1})]),_:1})]),_:1})])}const M=k(D,[["render",L]]);export{M as default};
