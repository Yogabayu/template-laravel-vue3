import{A as B,c as I,a as N,p as P,w as U,d as j,u as L,b as z}from"./wallet-info-081ffedf.js";import{m as u}from"./axios-801aee4d.js";import{_ as E}from"./_plugin-vue_export-helper-c27b6911.js";import{V as d,a as i}from"./VRow-5c0ccac4.js";import{V as v}from"./VContainer-5c610ab8.js";import{V as J}from"./VDivider-aaeca05e.js";import{r as O,o as n,k as m,w as s,a as e,a8 as y,a9 as k,b as p,e as l,l as b,V as S,a5 as T,j as f,c as w,f as V,t as c,F as C}from"./main-74652f26.js";import{V as x,c as D,d as R,b as G}from"./VCard-c487f410.js";import{V as M}from"./VImg-78f354d0.js";import"./VMenu-d89e4584.js";import"./index-13e977e8.js";import"./VAvatar-238a9d95.js";import"./VOverlay-3a0b480f.js";import"./dialog-transition-49317792.js";import"./index-617b5cfb.js";import"./VSpacer-e4389123.js";const q="/build/assets/favorite-file-71a23b1f.png",H="/build/assets/file-save-1c390715.png",K="/build/assets/open-file-591ec03b.png";const Q={components:{AnalyticsCongratulations:B},data(){return{userData:null,userToken:null,chart:I,card:N,paypal:P,wallet:U,docs:j,user:L,openFile:K,fileSave:H,fileFavorite:q,tFile:null,tRead:null,tFav:null,fileRandom:null,fileFav:null}},methods:{toDetailFile(a){this.$router.push(`/u-filedetail/${a}`)},getUserDataAndToken(){const a=localStorage.getItem("userData"),t=localStorage.getItem("userToken");a&&t&&(this.userData=JSON.parse(a),this.userToken=t)},async getTotalFileAvailable(){try{const a=await u.get("/user/total-file");if(a.status===200)this.tFile=a.data.data;else{const t=a&&a.data&&a.data.message?a.data.message:"Gagal. Silakan coba lagi.";this.$showToast("error","Sorry",t)}}catch(a){const t=a.response&&a.response.data&&a.response.data.message?a.response.data.message:"Gagal login. Silakan coba lagi.";this.$showToast("error","Sorry",t)}},async getTotalFileRead(){try{const a=await u.get("/user/total-read");if(a.status===200)this.tRead=a.data.data;else{const t=a&&a.data&&a.data.message?a.data.message:"Gagal. Silakan coba lagi.";this.$showToast("error","Sorry",t)}}catch(a){const t=a.response&&a.response.data&&a.response.data.message?a.response.data.message:"Gagal login. Silakan coba lagi.";this.$showToast("error","Sorry",t)}},async getTotalFileFav(){try{const a=await u.get("/user/total-fav");if(a.status===200)this.tFav=a.data.data;else{const t=a&&a.data&&a.data.message?a.data.message:"Gagal. Silakan coba lagi.";this.$showToast("error","Sorry",t)}}catch(a){const t=a.response&&a.response.data&&a.response.data.message?a.response.data.message:"Gagal login. Silakan coba lagi.";this.$showToast("error","Sorry",t)}},async getDashboard(){try{const a=await u.get("/user/index");if(a.status===200)this.fileRandom=a.data.data;else{const g=a&&a.data&&a.data.message?a.data.message:"Gagal. Silakan coba lagi.";this.$showToast("error","Sorry",g)}const t=await u.get("/user/fileFav");if(t.status===200)this.fileFav=t.data.data;else{const g=t&&t.data&&t.data.message?t.data.message:"Gagal. Silakan coba lagi.";this.$showToast("error","Sorry",g)}}catch(a){const t=a.response&&a.response.data&&a.response.data.message?a.response.data.message:"Gagal login. Silakan coba lagi.";this.$showToast("error","Sorry",t)}}},mounted(){this.getTotalFileAvailable(),this.getTotalFileRead(),this.getTotalFileFav(),this.getDashboard()}},W={class:"mt-2"},X={class:"mt-2"};function Y(a,t,g,Z,o,F){const A=O("AnalyticsCongratulations"),h=z;return n(),m(d,null,{default:s(()=>[e(i,{cols:"12",md:"12"},{default:s(()=>[e(A)]),_:1}),e(v,null,{default:s(()=>[e(d,null,{default:s(()=>[e(i,{cols:"4",md:"6"},{default:s(()=>[e(h,y(k({title:"File Tersedia",image:o.docs,stats:`${o.tFile}`,link:"/u-search"})),null,16)]),_:1}),e(i,{cols:"4",md:"6"},{default:s(()=>[e(h,y(k({title:"File Dibaca",image:o.openFile,stats:`${o.tRead}`,link:"/u-read"})),null,16)]),_:1}),e(i,{cols:"4",md:"6"},{default:s(()=>[e(h,y(k({title:"File Favorite",image:o.fileFavorite,stats:`${o.tFav}`,link:"/u-favorite"})),null,16)]),_:1})]),_:1})]),_:1}),e(J,{thickness:2,class:"border-opacity-100",color:"info"}),p("div",W,[p("div",null,[e(S,{class:"ma-2",color:"primary",variant:"outlined"},{default:s(()=>[l(" File Pilihan "),e(b,{end:"",icon:"mdi-pencil-lock",color:"purple-darken-2"})]),_:1})]),e(v,null,{default:s(()=>[e(d,null,{default:s(()=>[o.fileRandom==null?(n(),m(i,{key:0,cols:"12",md:"6"},{default:s(()=>[l(" Getting Data ..."),e(T,{indeterminate:"",color:"primary"})]),_:1})):f("",!0)]),_:1}),e(d,null,{default:s(()=>[o.fileRandom!=null?(n(!0),w(C,{key:0},V(o.fileRandom,(r,_)=>(n(),m(i,{key:_,cols:"12",md:"6"},{default:s(()=>[e(x,{class:"mb-2 card-style",height:"200px",hover:"",onClick:$=>F.toDetailFile(r.file.id)},{default:s(()=>[e(M,{src:"https://bankarthaya.com/wp-content/uploads/2023/07/desktop-1024x576-1.jpg",height:"20px",cover:""}),e(D,null,{default:s(()=>[l(c(r.file.name),1)]),_:2},1024),e(R,null,{default:s(()=>[l(c(r.file.author.name),1)]),_:2},1024),e(G,null,{default:s(()=>[l(c(r.file.summary.substring(0,40)+"..."),1)]),_:2},1024)]),_:2},1032,["onClick"])]),_:2},1024))),128)):f("",!0)]),_:1})]),_:1})]),p("div",X,[p("div",null,[e(S,{class:"ma-2",color:"primary",variant:"outlined"},{default:s(()=>[l(" File Popular "),e(b,{end:"",icon:"mdi-fire",color:"purple-darken-2"})]),_:1})]),e(v,null,{default:s(()=>[e(d,null,{default:s(()=>[o.fileFav==null?(n(),m(i,{key:0,cols:"12",md:"6"},{default:s(()=>[l(" Getting Data ..."),e(T,{indeterminate:"",color:"primary"})]),_:1})):f("",!0)]),_:1}),e(d,null,{default:s(()=>[o.fileFav!=null?(n(!0),w(C,{key:0},V(o.fileFav,(r,_)=>(n(),m(i,{key:_,cols:"12",md:"6"},{default:s(()=>[e(x,{class:"mb-2 card-style",height:"200px",hover:"",onClick:$=>F.toDetailFile(r.id)},{default:s(()=>[e(M,{src:"https://bankarthaya.com/wp-content/uploads/2023/07/desktop-1024x576-1.jpg",height:"20px",cover:""}),e(D,null,{default:s(()=>[l(c(r.name),1)]),_:2},1024),e(R,null,{default:s(()=>[l(" dilihat: "+c(r.views_count)+"x ",1)]),_:2},1024),e(G,null,{default:s(()=>[l(c(r.summary.substring(0,100)+"..."),1)]),_:2},1024)]),_:2},1032,["onClick"])]),_:2},1024))),128)):f("",!0)]),_:1})]),_:1})])]),_:1})}const ha=E(Q,[["render",Y],["__scopeId","data-v-6128a537"]]);export{ha as default};
