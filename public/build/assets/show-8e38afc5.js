import{m as f}from"./axios-e7133cbe.js";import{C as U,D as L,X as N,E as j,ae as E,H as A,af as H,Z as M,P as R,a as e,a1 as G,o as m,c,w as s,b as o,l as _,e as h,t as n,j as g,F,f as C,d as T,V as S,a4 as K,W as z,a6 as J,a7 as O}from"./main-a5321375.js";import{_ as W}from"./_plugin-vue_export-helper-c27b6911.js";import{V as w,a as X,c as b,b as Z}from"./VCard-004e827a.js";import{V as $}from"./VDivider-9d050367.js";import{a as q,V as Q}from"./VChip-cf4bb29e.js";import{V as x}from"./VSpacer-70912501.js";import{V as D}from"./VForm-c3a6ed67.js";import{V as v,a as y}from"./VRow-c757d44f.js";import{V as I}from"./VTextarea-dd8101f3.js";import{V as Y,a as ee,b as P,c as B}from"./VMenu-9b97bbbf.js";import{V as te}from"./VDialog-71a2a99e.js";import"./VAvatar-6d5eb027.js";import"./VImg-b6bc1fd9.js";import"./index-256953a5.js";import"./VCounter-50cc9d35.js";import"./VOverlay-f85fe3be.js";import"./dialog-transition-5a1fa5ed.js";const ae=U({fixedHeader:Boolean,fixedFooter:Boolean,height:[Number,String],hover:Boolean,...L(),...N(),...j(),...E()},"v-table"),se=A()({name:"VTable",props:ae(),setup(t,a){let{slots:r}=a;const{themeClasses:k}=H(t),{densityClasses:l}=M(t);return R(()=>e(t.tag,{class:["v-table",{"v-table--fixed-height":!!t.height,"v-table--fixed-header":t.fixedHeader,"v-table--fixed-footer":t.fixedFooter,"v-table--has-top":!!r.top,"v-table--has-bottom":!!r.bottom,"v-table--hover":t.hover},k.value,l.value,t.class],style:t.style},{default:()=>{var d,i,p;return[(d=r.top)==null?void 0:d.call(r),r.default?e("div",{class:"v-table__wrapper",style:{height:G(t.height)}},[e("table",null,[r.default()])]):(i=r.wrapper)==null?void 0:i.call(r),(p=r.bottom)==null?void 0:p.call(r)]}})),{}}}),oe={data(){return{detail:{},fileId:this.$route.params.fileId,fileUser:this.$userPhotoUrl,filePath:this.$filePath,comments:null,dataForm:{id:null,file_uuid:this.$route.params.fileId,desc:null,descupdate:null},edit:!1}},methods:{goBack(){this.$router.go(-1)},formatDate(t){return new Date(t).toLocaleDateString("id-ID")},async getDetailFile(t){try{const a=await f.get(`/file/${t}`);a.status===200?this.detail=a.data.data:this.$showToast("error","Sorry",a.data.data.message)}catch(a){this.$showToast("error","Sorry",a.response.data.data.message)}},resetForm(){this.dataForm={id:null,file_uuid:this.$route.params.fileId,desc:null,descupdate:null}},async getCommentFile(t){try{const a=await f.get(`/comment/${t}`);this.comments=a.data.data.map(r=>({id:r.uuid,content:r.desc,user_type:r.user.isAdmin,name:r.user.name,position:r.user.position.name,created_at:r.created_at}))}catch(a){const r=a.response&&a.response.data&&a.response.data.message?a.response.data.message:"Gagal login. Silakan coba lagi.";this.$showToast("error","Sorry",r)}},async insertCommentar(){try{this.dataForm.desc===null&&this.$showToast("error","Sorry","komentar kosong");const t=new FormData;t.append("file_uuid",this.dataForm.file_uuid),t.append("desc",this.dataForm.desc),t.append("_method","POST");const a=await f.post("/comment",t);a.status===200?(this.resetForm(),this.getCommentFile(this.fileId),this.$showToast("success","Success",a.data.message)):this.$showToast("error","Sorry",a.data.message)}catch(t){this.$showToast("error","Sorry",t.response.data.message)}},async deleteComment(t){try{if(!window.confirm("Apakah Anda yakin ingin menghapus comment?"))return;const r=await f.delete(`/comment/${t}`);r.status===200?(this.getCommentFile(this.fileId),this.$showToast("success","Berhasil",r.data.message)):this.$showToast("error","Sorry",r.data.message)}catch(a){this.$showToast("error","Sorry",a.response.data.message)}},popupEdit(t){this.dataForm.id=t.id,this.dataForm.descupdate=t.content,this.edit=!0},async updateComment(){try{const t=new FormData;t.append("desc",this.dataForm.descupdate),t.append("_method","PUT");const a=await f.post(`/comment/${this.dataForm.id}`,t);a.status===200?(this.resetForm(),this.getCommentFile(this.fileId),this.edit=!1,this.$showToast("success","Success",a.data.message)):this.$showToast("error","Sorry",a.data.message)}catch(t){this.$showToast("error","Sorry",t.response.data.message)}}},mounted(){this.getDetailFile(this.fileId),this.getCommentFile(this.fileId)}},u=t=>(J("data-v-d73cadfe"),t=t(),O(),t),re=u(()=>o("td",null,"Nama File",-1)),le=u(()=>o("td",null,":",-1)),ie=u(()=>o("td",null,"Deskripsi Singkat",-1)),de=u(()=>o("td",null,":",-1)),ne=u(()=>o("td",null,"Keyword",-1)),ue=u(()=>o("td",null,":",-1)),me={key:0},ce=u(()=>o("td",null,"Pengunggah",-1)),he=u(()=>o("td",null,":",-1)),pe={class:"row d-flex align-center"},fe={key:0,class:"player-wrapper"},_e=["src","alt"],ge={key:1},ye={key:1},Ve=u(()=>o("td",null,"Jabatan",-1)),we=u(()=>o("td",null,":",-1)),be={class:"row d-flex align-center"},ve=["src"],ke={class:"mt-3"},Fe={class:"comment-content"};function Ce(t,a,r,k,l,d){return m(),c("div",null,[e(w,{class:"auth-card pa-4 pt-5"},{default:s(()=>[e(X,{class:"align-left"},{default:s(()=>[o("span",{color:"primary",onClick:a[0]||(a[0]=(...i)=>d.goBack&&d.goBack(...i)),style:{cursor:"pointer"}},[e(_,{icon:"bx-arrow-back",color:"primary",tag:"back",start:""}),h(" Back ")]),e(b,{class:"text-2xl font-weight-bold"},{default:s(()=>[h(" Detail "+n(l.detail.name??"-"),1)]),_:1}),e($,{inset:""}),e(se,null,{default:s(()=>[o("tbody",null,[o("tr",null,[re,le,o("td",null,n(l.detail.name),1)]),o("tr",null,[ie,de,o("td",null,n(l.detail.summary),1)]),o("tr",null,[ne,ue,o("td",null,n(l.detail.keywords),1)]),l.detail.author?(m(),c("tr",me,[ce,he,o("td",null,[o("div",pe,[l.detail.author.photo?(m(),c("div",fe,[o("img",{class:"avator",src:l.fileUser+l.detail.author.photo,alt:l.detail.name,width:60},null,8,_e)])):g("",!0),l.detail.author.name?(m(),c("span",ge,n(l.detail.author.name),1)):g("",!0)])])])):g("",!0),l.detail.positions?(m(),c("tr",ye,[Ve,we,o("td",null,[o("div",be,[e(q,{"selected-class":"text-primary",column:""},{default:s(()=>[(m(!0),c(F,null,C(l.detail.positions,(i,p)=>(m(),c("div",{key:p},[e(Q,{style:{color:"rgb(6, 84, 107)"}},{default:s(()=>[h(n(i.name),1)]),_:2},1024)]))),128))]),_:1})])])])):g("",!0)])]),_:1}),o("div",null,[o("iframe",{width:"100%",height:"500px",src:l.filePath+l.detail.path,frameborder:"0",allowfullscreen:""},null,8,ve)]),e(x),o("div",ke,[e(w,{class:"mx-auto"},{default:s(()=>[e(b,null,{default:s(()=>[h(" Komentar ")]),_:1}),e(b,null,{default:s(()=>[e(D,{onSubmit:T(d.insertCommentar,["prevent"])},{default:s(()=>[e(v,{align:"center",justify:"center"},{default:s(()=>[e(y,{md:"10",cols:"10"},{default:s(()=>[e(I,{"bg-color":"grey-lighten-2",color:"cyan",modelValue:l.dataForm.desc,"onUpdate:modelValue":a[1]||(a[1]=i=>l.dataForm.desc=i)},null,8,["modelValue"])]),_:1}),e(y,{md:"2",cols:"2"},{default:s(()=>[e(S,{density:"compact",icon:"mdi-note-plus",type:"submit"})]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1}),e(x),e(Z,null,{default:s(()=>[o("div",null,[o("div",null,[(m(!0),c(F,null,C(l.comments,(i,p)=>(m(),c("div",{key:p,class:K({"admin-comment":i.user_type==1,"user-comment":i.user_type==0})},[o("div",Fe,[o("p",null,'" '+n(i.content)+' "',1),e(v,{class:"justify-space-between mx-2 mb-2"},{default:s(()=>[o("small",null,n(i.name)+" - "+n(i.position),1),o("small",null,n(d.formatDate(i.created_at)),1)]),_:2},1024)]),e(Y,{transition:"scale-transition"},{activator:s(({props:V})=>[e(_,z(V,{class:"ellipsis-icon"}),{default:s(()=>[h("mdi-dots-vertical")]),_:2},1040)]),default:s(()=>[e(ee,null,{default:s(()=>[e(P,{color:"primary",onClick:V=>d.popupEdit(i)},{prepend:s(()=>[e(_,{icon:"mdi-edit"})]),default:s(()=>[e(B,null,{default:s(()=>[h(" edit")]),_:1})]),_:2},1032,["onClick"]),e(P,{color:"primary",onClick:V=>d.deleteComment(i.id)},{prepend:s(()=>[e(_,{icon:"mdi-trash"})]),default:s(()=>[e(B,null,{default:s(()=>[h(" hapus")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024)],2))),128))])])]),_:1}),e(te,{modelValue:l.edit,"onUpdate:modelValue":a[3]||(a[3]=i=>l.edit=i),width:"auto"},{default:s(()=>[e(w,null,{title:s(()=>[h(" Update comment ")]),text:s(()=>[e(D,{onSubmit:T(d.updateComment,["prevent"])},{default:s(()=>[e(v,{align:"center",justify:"center"},{default:s(()=>[e(y,{md:"10",cols:"10"},{default:s(()=>[e(I,{"bg-color":"grey-lighten-2",color:"cyan",modelValue:l.dataForm.descupdate,"onUpdate:modelValue":a[2]||(a[2]=i=>l.dataForm.descupdate=i)},null,8,["modelValue"])]),_:1}),e(y,{md:"2",cols:"2"},{default:s(()=>[e(S,{density:"compact",icon:"mdi-note-plus",type:"submit"})]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1},8,["modelValue"])]),_:1})])]),_:1})]),_:1})])}const ze=W(oe,[["render",Ce],["__scopeId","data-v-d73cadfe"]]);export{ze as default};
