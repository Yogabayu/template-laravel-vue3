import{m as c}from"./axios-bee2a5fc.js";import{_ as m}from"./_plugin-vue_export-helper-c27b6911.js";import{V as p,a as u,c as h}from"./VCard-431b48e4.js";import{V as _}from"./VTextField-fc0b433e.js";import{V as f}from"./VTooltip-502e8b71.js";import{r as x,o as V,c as g,a as t,w as a,e as v,b as s,au as b,l as y}from"./main-e96450c7.js";import"./VAvatar-510d1ca2.js";import"./VImg-49529653.js";import"./VCounter-6b7b42d1.js";import"./index-c214d2f8.js";import"./VOverlay-f594c71c.js";const w={data(){return{searchValue:"",items:[],headers:[{text:"Nama User",value:"name",sortable:!0},{text:"Jabatan",value:"position.name",sortable:!0},{text:"Jumlah Perangkat",value:"devices_count",sortable:!0},{text:"Operation",value:"operation"}]}},methods:{toDetail(e){this.$router.push(`/a-devices/${e}`)},async getDataUser(){try{const e=await c.get("/devices");e.status===200?this.items=e.data.data:this.$showToast("error","Sorry",e.data.data.message)}catch(e){this.$showToast("error","Sorry",e.response.data.message)}}},mounted(){this.getDataUser()}},D={class:"d-flex justify-end mb-6"},T={class:"d-flex align-center pe-2 w-25"},k=s("p",null,"Data Kosong",-1),C=s("p",null,"loading data .....",-1),U={class:"operation-wrapper"},N={class:"d-flex justify-space-between"},P=["onClick"];function B(e,i,E,S,o,l){const n=x("EasyDataTable");return V(),g("div",null,[t(p,{class:"auth-card pa-4 pt-5"},{default:a(()=>[t(u,{class:"align-left"},{default:a(()=>[t(h,{class:"text-2xl font-weight-bold"},{default:a(()=>[v(" Daftar Perangkat ")]),_:1})]),_:1}),s("div",D,[s("div",T,[t(_,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:o.searchValue,"onUpdate:modelValue":i[0]||(i[0]=r=>o.searchValue=r)},null,8,["modelValue"])])]),t(n,{"show-index":"",headers:o.headers,items:o.items,"search-value":o.searchValue},{"empty-message":a(()=>[k]),loading:a(()=>[C]),"item-operation":a(r=>[s("div",U,[s("div",N,[t(f,{location:"top",text:"Lihat Detail Perangkat"},{activator:a(({props:d})=>[s("button",b(d,{onClick:$=>l.toDetail(r.uuid)}),[t(y,{size:"20",icon:"bx-file-find"})],16,P)]),_:2},1024)])])]),_:1},8,["headers","items","search-value"])]),_:1})])}const G=m(w,[["render",B]]);export{G as default};
