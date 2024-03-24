import{m as u}from"./VAvatar-368a1dc6.js";import{r as _,o as n,c,a as r,w as s,b as i,i as p,e as d,t as f,d as w,V as k,h as V}from"./main-2c9a0e59.js";import{_ as x}from"./_plugin-vue_export-helper-c27b6911.js";import{V as v,a as F,c as T}from"./VCard-ddac2cfd.js";import{V as g}from"./VTextField-bb8bb7fd.js";import{V as S}from"./VDialog-6332b061.js";import{V as C}from"./VForm-4031e0c2.js";import{V as U,a as h}from"./VRow-4964dfbe.js";import{V as B}from"./VSelect-cb7dfb2a.js";import{V as D}from"./VChip-847e90bf.js";import"./VImg-abb88c8a.js";import"./VCounter-38b10764.js";import"./index-e994dd60.js";import"./VOverlay-547ccc7e.js";import"./dialog-transition-29f1fa53.js";import"./VMenu-67634d80.js";const A={data(){return{rules:{required:t=>!!t||"Required"},username:null,dataForm:{id:null,nameDev:null,isVerified:null},items:[],headers:[{text:"Nama Device",value:"nameDev",sortable:!0},{text:"IP",value:"ip",sortable:!0},{text:"Detail",value:"deviceName",sortable:!0},{text:"Tanggal",value:"created_at",sortable:!0},{text:"Akses",value:"isVerified",sortable:!0},{text:"Operation",value:"operation"}],searchValue:"",insert:!1,edit:!1,userUuid:this.$route.params.userUuid}},methods:{async deleteDevice(t){try{if(!window.confirm("Apakah Anda yakin ingin menghapus data?"))return;const m=await u.delete(`/user-device/${t}`);m.status===200?this.$showToast("success","Berhasil",m.data.data.message):this.$showToast("error","Sorry",m.data.data.message)}catch(e){this.$showToast("error","Sorry",e.response.data.message)}},goBack(){this.$router.go(-1)},async updateData(){try{const t=new FormData;t.append("id",this.dataForm.id),this.dataForm.nameDev!=null&&t.append("nameDev",this.dataForm.nameDev),this.dataForm.isVerified!=null&&t.append("isVerified",this.dataForm.isVerified),t.append("_method","POST");const e=await u.post("/user-device/",t);e.status===200?(this.closeModal(),this.getAllDevice(this.userUuid),this.$showToast("success","Success",e.data.message)):this.$showToast("error","Sorry",e.data.message)}catch(t){this.$showToast("error","Sorry",t.response.data.message)}},openModal(t=null){this.dataForm.id=t.id,this.dataForm.nameDev=t.nameDev,this.dataForm.isVerified=parseInt(t.isVerified),this.edit=!0},resetForm(){this.dataForm={id:null,nameDev:null,isVerified:null}},closeModal(){this.resetForm(),this.edit=!1},formatDate(t){return new Date(t).toLocaleString("id-ID")},async getAllDevice(t){try{const e=await u.get(`/user-device/${t}`);e.status===200?(this.username=e.data.data.name,this.items=e.data.data.devices):this.$showToast("error","Sorry",e.data.data.message)}catch(e){this.$showToast("error","Sorry",e.response.data.message)}}},mounted(){this.getAllDevice(this.userUuid)}},M={class:"d-flex justify-space-between mb-6"},I={class:"d-flex align-center pe-2 w-25"},N=i("p",null,"Data Divisi Kosong",-1),P=i("p",null,"loading data .....",-1),z={key:0},E={key:1},R={class:"operation-wrapper"};function q(t,e,m,L,o,l){const b=_("EasyDataTable");return n(),c("div",null,[r(v,{class:"auth-card pa-4 pt-5"},{default:s(()=>[r(F,{class:"align-left"},{default:s(()=>[i("span",{color:"primary",onClick:e[0]||(e[0]=(...a)=>l.goBack&&l.goBack(...a)),style:{cursor:"pointer"}},[r(p,{icon:"bx-arrow-back",color:"primary",tag:"back",start:""}),d(" Back ")]),r(T,{class:"text-2xl font-weight-bold"},{default:s(()=>[d(" Daftar Perangkat User : "+f(o.username??"-"),1)]),_:1})]),_:1}),i("div",M,[i("div",I,[r(g,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:o.searchValue,"onUpdate:modelValue":e[1]||(e[1]=a=>o.searchValue=a)},null,8,["modelValue"])])]),r(S,{modelValue:o.edit,"onUpdate:modelValue":e[5]||(e[5]=a=>o.edit=a),width:"auto"},{default:s(()=>[r(v,null,{title:s(()=>[d(" Update Data ")]),text:s(()=>[r(C,{class:"mt-6",onSubmit:w(l.updateData,["prevent"])},{default:s(()=>[r(U,null,{default:s(()=>[r(h,{md:"6",cols:"12"},{default:s(()=>[r(g,{label:"Nama",modelValue:o.dataForm.nameDev,"onUpdate:modelValue":e[2]||(e[2]=a=>o.dataForm.nameDev=a),autofocus:"","prepend-icon":"mdi-person"},null,8,["modelValue"])]),_:1}),r(h,{cols:"12",md:"6"},{default:s(()=>[r(B,{label:"Status Perangkat",items:[{value:1,title:"Di iziinkan"},{value:0,title:"DI larang"}],modelValue:o.dataForm.isVerified,"onUpdate:modelValue":e[3]||(e[3]=a=>o.dataForm.isVerified=a),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),r(h,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:s(()=>[r(k,{type:"submit"},{default:s(()=>[d("Update")]),_:1}),i("button",{type:"button",class:"btn btn-blue",onClick:e[4]||(e[4]=(...a)=>l.closeModal&&l.closeModal(...a))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1},8,["modelValue"]),r(b,{"show-index":"",headers:o.headers,items:o.items,"search-value":o.searchValue},{"empty-message":s(()=>[N]),loading:s(()=>[P]),"item-isVerified":s(({isVerified:a})=>[a?(n(),V(D,{key:0,style:{color:"rgb(0, 255, 26)"}},{default:s(()=>[d(" Terbuka ")]),_:1})):(n(),V(D,{key:1,style:{color:"rgb(255, 0, 0)"}},{default:s(()=>[d(" Tertutup ")]),_:1}))]),"item-created_at":s(a=>[i("p",null,f(l.formatDate(a.created_at)),1)]),"item-nameDev":s(({nameDev:a})=>[a?(n(),c("p",z,f(a),1)):(n(),c("p",E,"-"))]),"item-operation":s(a=>[i("div",R,[i("button",null,[r(p,{size:"20",icon:"bx-edit",color:"blue",onClick:y=>l.openModal(a)},null,8,["onClick"])]),d("   "),i("button",null,[r(p,{size:"20",icon:"bx-trash",color:"red",onClick:y=>l.deleteDevice(a.id)},null,8,["onClick"])])])]),_:1},8,["headers","items","search-value"])]),_:1})])}const re=x(A,[["render",q]]);export{re as default};
