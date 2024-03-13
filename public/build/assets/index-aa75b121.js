import{m as w}from"./axios-e7133cbe.js";import{r as H,o as n,c as m,a as e,w as t,e as p,b as h,V as T,d as A,F as g,f as y,k as v,l as _,t as V,ab as I,j as O,a8 as D,a9 as S}from"./main-a5321375.js";import{_ as G}from"./_plugin-vue_export-helper-c27b6911.js";import{V as F,a as Q,c as E,b as W}from"./VCard-004e827a.js";import{V as P}from"./VTextField-7ad8d225.js";import{V as U}from"./VDialog-71a2a99e.js";import{V as q}from"./VForm-c3a6ed67.js";import{V as b,a as d}from"./VRow-c757d44f.js";import{V as K}from"./VSelect-07348dfd.js";import{V as N}from"./VTextarea-dd8101f3.js";import{V as B}from"./VFileInput-91d38c67.js";import{V as L}from"./VDivider-9d050367.js";import{V as J}from"./VCheckbox-591711c0.js";import{b as z,c as j}from"./VMenu-9b97bbbf.js";import{a as C,V as k}from"./VChip-cf4bb29e.js";import{V as M}from"./VTooltip-9cde212f.js";import"./VAvatar-6d5eb027.js";import"./VImg-b6bc1fd9.js";import"./VCounter-50cc9d35.js";import"./index-256953a5.js";import"./VOverlay-f85fe3be.js";import"./dialog-transition-5a1fa5ed.js";import"./VCheckboxBtn-36b12301.js";const X={watch:{positions:{handler(l){this.selectedPositions=l.filter(a=>a.checked).map(({title:a,value:u})=>({title:a,value:u}))},deep:!0}},data(){return{insert:!1,edit:!1,filePath:this.$filePath,rules:{required:l=>!!l||"Required"},rulesTextArea:[l=>l.length<=2048||"Max 2048 characters"],items:[],headers:[{text:"Pengunggah",value:"author.name",sortable:!0},{text:"File Name",value:"name",sortable:!0},{text:"Jabatan",value:"positions",sortable:!0},{text:"Kategori",value:"categories",sortable:!0},{text:"File",value:"path",sortable:!0},{text:"Keywords",value:"keywords",sortable:!0},{text:"Tanggal Diupload",value:"created_at",sortable:!0},{text:"Operation    ",value:"operation"}],searchValue:"",searchField:["name","author.name","email","positions","categories","keywords"],dataForm:{id:null,name:null,path:null,summary:"",keywords:"",positions:[],categories:[]},positions:[],categories:[],selectedPositions:[],selectedCategories:[],uploadProgress:null,isShowDetailPos:!1,detailPos:null}},methods:{showAllPositions(l){this.detailPos=l,this.isShowDetailPos=!0},toCategoryId(l){this.$router.push(`/a-percategory/${l}`)},toPositionId(l){this.$router.push(`/a-perposition/${l}`)},toDetailFile(l){this.$router.push(`/a-filedetail/${l.id}`)},toLink(l){this.$router.push(`/${l}`)},async updateData(){try{const l=new FormData;l.append("id",this.dataForm.id),l.append("name",this.dataForm.name),l.append("summary",this.dataForm.summary),l.append("keywords",this.dataForm.keywords),this.dataForm.path!==null&&l.append("path",this.dataForm.path),this.dataForm.positions=this.selectedPositions.map(r=>r.value),this.dataForm.positions!==null&&this.dataForm.positions.forEach(r=>{l.append("positions[]",r)}),this.dataForm.categories!==null&&this.dataForm.categories.forEach(r=>{l.append("categories[]",r)}),l.append("_method","PUT");const a={onUploadProgress:r=>{try{this.uploadProgress=Math.round(r.loaded*100/r.total)}catch(s){console.error("Error calculating progress:",s)}},headers:{"Content-Type":"multipart/form-data"}},u=await w.post(`/file/${this.dataForm.id}`,l,a);u.status===200?(this.closeModal(2),this.getAllFiles(),this.$showToast("success","Success",u.data.message)):(this.closeModal(2),this.getAllFiles(),this.$showToast("error","Sorry",u.data.message))}catch(l){console.log(l),this.closeModal(2),this.getAllFiles(),this.$showToast("error","Sorry",l.response.data.message)}},async deleteFile(l){try{if(!window.confirm("Semua Data yang terkait akan ikut terhapus. Apakah Anda yakin ingin menghapus data?"))return;const u=await w.delete(`/file/${l.id}`);u.status===200?(this.getAllFiles(),this.$showToast("success","Berhasil",u.data.message)):this.$showToast("error","Sorry",u.data.message)}catch(a){this.$showToast("error","Sorry",a.response.data.message)}},async insertData(){try{for(let r in this.dataForm)r!=="id"&&this.dataForm[r]===null&&(this.closeModal(1),this.$showToast("error","Sorry",`Properti ${r} harus diisi.`));const l=new FormData;for(let r in this.dataForm)r!=="id"&&r!=="positions"&&r!=="categories"&&l.append(r,this.dataForm[r]);this.dataForm.positions=this.selectedPositions.map(r=>r.value),this.dataForm.positions.forEach(r=>{l.append("positions[]",r)}),this.dataForm.categories.forEach(r=>{l.append("categories[]",r)}),l.append("_method","POST");const a={onUploadProgress:r=>{try{this.uploadProgress=Math.round(r.loaded*100/r.total)}catch(s){console.error("Error calculating progress:",s)}},headers:{"Content-Type":"multipart/form-data"}},u=await w.post("/file",l,a);u.status===200?(this.closeModal(1),this.getAllFiles(),this.uploadProgress=null,this.$showToast("success","Success",u.data.message)):(this.uploadProgress=null,this.$showToast("error","Sorry",u.data.message))}catch(l){this.uploadProgress=null,this.closeModal(1),this.$showToast("error","Sorry",l.response.data.message)}},handlePathChange(l){const a=l.target.files[0];a&&["application/pdf"].includes(a.type)?this.dataForm.path=a:(this.$showToast("error","Error","Hanya file PDF yang diizinkan."),l.target.value=null)},async getCategories(){try{const l=await w.get("/category");l.status===200?this.categories=l.data.data.map(a=>({value:a.id,title:a.name})):this.$showToast("error","Sorry","error get data division")}catch{this.$showToast("error","Sorry","error get data division")}},async getPositions(){try{const l=await w.get("/position");l.status===200?(this.positions=l.data.data.map(a=>({value:a.id,title:a.name,checked:!1})),this.positions.push({value:"all",title:"Semua Jabatan",checked:!1})):this.$showToast("error","Sorry","error get data position")}catch{this.$showToast("error","Sorry","error get data position")}},formatDate(l){return new Date(l).toLocaleString("id-ID")},async getAllFiles(){try{const l=await w.get("/file");l.status===200?this.items=l.data.data:this.$showToast("error","Sorry",l.data.data.message)}catch(l){this.$showToast("error","Sorry",l.response.data.data.message)}},resetForm(){this.dataForm={name:null,path:null,summary:null,keywords:null,positions:[],categories:[]},this.selectedPositions=[]},closeModal(l){l===1?(this.resetForm(),this.insert=!1):l===2&&(this.resetForm(),this.edit=!1)},async openModal(l,a=null){if(l===1)this.insert=!0,await this.getPositions(),await this.getCategories();else if(l===2&&a){await this.getPositions(),await this.getCategories(),this.dataForm.id=a.id,this.dataForm.name=a.name,this.dataForm.summary=a.summary,this.dataForm.keywords=a.keywords;const u=a.positions.map(r=>r.id);this.positions.forEach(r=>{r.checked=u.includes(r.value)}),this.selectedCategories=a.categories.map(r=>({value:r.id,title:r.name})),this.edit=!0}}},mounted(){this.getAllFiles()}},Y={class:"d-flex justify-space-between mb-6"},Z={class:"row"},$={class:"d-flex align-center pe-2 w-25"},ee={key:0},te=h("p",null,"Kategori saat ini:",-1),le=h("p",null,"Data file Kosong",-1),ae=h("p",null,"loading data .....",-1),oe=["href"],se=h("span",{class:"text-h5"},"Daftar Jabatan Terpilih",-1),re={class:"d-flex justify-space-between"};function ie(l,a,u,r,s,c){const R=H("EasyDataTable");return n(),m("div",null,[e(F,{class:"auth-card pa-4 pt-5"},{default:t(()=>[e(Q,{class:"align-left"},{default:t(()=>[e(E,{class:"text-2xl font-weight-bold"},{default:t(()=>[p(" Daftar Semua File ")]),_:1})]),_:1}),h("div",Y,[h("div",Z,[e(T,{color:"primary",size:"small",class:"my-3 mx-3",onClick:a[0]||(a[0]=o=>c.openModal(1))},{default:t(()=>[p(" Tambah Data ")]),_:1})]),h("div",$,[e(P,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:s.searchValue,"onUpdate:modelValue":a[1]||(a[1]=o=>s.searchValue=o)},null,8,["modelValue"])])]),e(U,{modelValue:s.insert,"onUpdate:modelValue":a[8]||(a[8]=o=>s.insert=o),width:"auto"},{default:t(()=>[e(F,null,{title:t(()=>[p("Tambah Data")]),text:t(()=>[e(q,{onSubmit:A(c.insertData,["prevent"])},{default:t(()=>[e(b,null,{default:t(()=>[e(d,{md:"12",cols:"12"},{default:t(()=>[e(P,{placeholder:"Nama file",label:"Nama",modelValue:s.dataForm.name,"onUpdate:modelValue":a[2]||(a[2]=o=>s.dataForm.name=o),autofocus:"",rules:[s.rules.required],"prepend-icon":"mdi-file"},null,8,["modelValue","rules"])]),_:1}),e(d,{cols:"12",md:"12"},{default:t(()=>[e(K,{label:"Pilih Kategori",items:s.categories,modelValue:s.dataForm.categories,"onUpdate:modelValue":a[3]||(a[3]=o=>s.dataForm.categories=o),"prepend-icon":"mdi-file",rules:[s.rules.required],multiple:"",clearable:""},null,8,["items","modelValue","rules"])]),_:1}),e(d,{cols:"12",md:"12"},{default:t(()=>[e(N,{counter:"",label:"Deskripsi Singkat",rules:s.rulesTextArea,modelValue:s.dataForm.summary,"onUpdate:modelValue":a[4]||(a[4]=o=>s.dataForm.summary=o),"prepend-icon":"mdi-comment"},null,8,["rules","modelValue"])]),_:1}),e(d,{md:"12",cols:"12"},{default:t(()=>[e(P,{placeholder:"Keywords file",label:"Keywords",modelValue:s.dataForm.keywords,"onUpdate:modelValue":a[5]||(a[5]=o=>s.dataForm.keywords=o),rules:[s.rules.required],"prepend-icon":"mdi-file"},null,8,["modelValue","rules"])]),_:1}),e(d,{cols:"12",md:"6"},{default:t(()=>[e(B,{accept:"application/pdf",placeholder:"Pilih File","prepend-icon":"mdi-file",rules:[s.rules.required],label:"File",onChange:c.handlePathChange},null,8,["rules","onChange"])]),_:1}),e(L,{thickness:5}),e(b,null,{default:t(()=>[e(d,{cols:"6"},{default:t(()=>[e(F,null,{title:t(()=>[p(" Pilih Jabatan : ")]),text:t(()=>[e(b,null,{default:t(()=>[(n(!0),m(g,null,y(s.positions,(o,i)=>(n(),v(d,{key:i,cols:"4"},{default:t(()=>[e(J,{modelValue:o.checked,"onUpdate:modelValue":f=>o.checked=f,label:o.title,value:o.value},null,8,["modelValue","onUpdate:modelValue","label","value"])]),_:2},1024))),128))]),_:1})]),_:1})]),_:1}),e(d,{cols:"6"},{default:t(()=>[e(F,null,{title:t(()=>[p(" Jabatan yang dipilih : ")]),text:t(()=>[e(b,null,{default:t(()=>[(n(!0),m(g,null,y(s.selectedPositions,(o,i)=>(n(),v(d,{key:i,cols:"6"},{default:t(()=>[e(z,null,{prepend:t(()=>[e(_,{icon:"mdi-check"})]),default:t(()=>[e(j,{textContent:V(o.title)},null,8,["textContent"])]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})]),_:1}),e(d,{cols:"12",class:"d-flex flex-wrap justify-end gap-4"},{default:t(()=>[e(T,{type:"submit"},{default:t(()=>[p("Simpan")]),_:1}),h("button",{type:"button",class:"btn btn-blue",onClick:a[6]||(a[6]=o=>c.closeModal(1))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),actions:t(()=>[e(I,{modelValue:s.uploadProgress,"onUpdate:modelValue":a[7]||(a[7]=o=>s.uploadProgress=o),color:"amber",height:"25"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),e(U,{modelValue:s.edit,"onUpdate:modelValue":a[15]||(a[15]=o=>s.edit=o),width:"auto"},{default:t(()=>[e(F,null,{title:t(()=>[p("Update Data")]),text:t(()=>[e(q,{onSubmit:A(c.updateData,["prevent"])},{default:t(()=>[e(b,null,{default:t(()=>[e(d,{md:"12",cols:"12"},{default:t(()=>[e(P,{placeholder:"Nama file",label:"Nama",modelValue:s.dataForm.name,"onUpdate:modelValue":a[9]||(a[9]=o=>s.dataForm.name=o),autofocus:"",rules:[s.rules.required],"prepend-icon":"mdi-file"},null,8,["modelValue","rules"])]),_:1}),e(d,{cols:"12",md:"12"},{default:t(()=>[e(K,{label:"Pilih Categories",items:s.categories,modelValue:s.dataForm.categories,"onUpdate:modelValue":a[10]||(a[10]=o=>s.dataForm.categories=o),"prepend-icon":"mdi-file",multiple:"",clearable:""},null,8,["items","modelValue"]),s.selectedCategories!==null?(n(),m("div",ee,[te,e(C,{"selected-class":"text-primary",column:""},{default:t(()=>[(n(!0),m(g,null,y(s.selectedCategories,(o,i)=>(n(),m("div",{key:i},[e(k,null,{default:t(()=>[p(V(o.title),1)]),_:2},1024)]))),128))]),_:1})])):O("",!0)]),_:1}),e(d,{cols:"12",md:"12"},{default:t(()=>[e(N,{counter:"",label:"Deskripsi Singkat",rules:s.rulesTextArea,modelValue:s.dataForm.summary,"onUpdate:modelValue":a[11]||(a[11]=o=>s.dataForm.summary=o),"prepend-icon":"mdi-comment"},null,8,["rules","modelValue"])]),_:1}),e(d,{md:"12",cols:"12"},{default:t(()=>[e(P,{placeholder:"Keywords file",label:"Keywords",modelValue:s.dataForm.keywords,"onUpdate:modelValue":a[12]||(a[12]=o=>s.dataForm.keywords=o),rules:[s.rules.required],"prepend-icon":"mdi-file"},null,8,["modelValue","rules"])]),_:1}),e(d,{cols:"12",md:"6"},{default:t(()=>[e(B,{accept:"application/pdf",placeholder:"Pilih File","prepend-icon":"mdi-file",rules:[s.rules.required],label:"File",onChange:c.handlePathChange},null,8,["rules","onChange"])]),_:1}),e(L,{thickness:5}),e(b,null,{default:t(()=>[e(d,{cols:"6"},{default:t(()=>[e(F,null,{title:t(()=>[p(" Pilih Jabatan : ")]),text:t(()=>[e(b,null,{default:t(()=>[(n(!0),m(g,null,y(s.positions,(o,i)=>(n(),v(d,{key:i,cols:"4"},{default:t(()=>[e(J,{modelValue:o.checked,"onUpdate:modelValue":f=>o.checked=f,label:o.title,value:o.value},null,8,["modelValue","onUpdate:modelValue","label","value"])]),_:2},1024))),128))]),_:1})]),_:1})]),_:1}),e(d,{cols:"6"},{default:t(()=>[e(F,null,{title:t(()=>[p(" Jabatan yang dipilih : ")]),text:t(()=>[e(b,null,{default:t(()=>[(n(!0),m(g,null,y(s.selectedPositions,(o,i)=>(n(),v(d,{key:i,cols:"6"},{default:t(()=>[e(z,null,{prepend:t(()=>[e(_,{icon:"mdi-check"})]),default:t(()=>[e(j,{textContent:V(o.title)},null,8,["textContent"])]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})]),_:1}),e(d,{cols:"12",class:"d-flex flex-wrap justify-end gap-4"},{default:t(()=>[e(T,{type:"submit"},{default:t(()=>[p("Simpan")]),_:1}),h("button",{type:"button",class:"btn btn-blue",onClick:a[13]||(a[13]=o=>c.closeModal(2))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),actions:t(()=>[e(I,{modelValue:s.uploadProgress,"onUpdate:modelValue":a[14]||(a[14]=o=>s.uploadProgress=o),color:"amber",height:"25"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),e(R,{"show-index":"",headers:s.headers,items:s.items,"search-value":s.searchValue},{"empty-message":t(()=>[le]),loading:t(()=>[ae]),"item-created_at":t(o=>[h("p",null,V(c.formatDate(o.created_at)),1)]),"item-path":t(o=>[h("a",{href:s.filePath+o.path,target:"_blank",rel:"noopener noreferrer",style:{cursor:"pointer !important"}},[e(k,{color:"primary"},{default:t(()=>[e(_,{start:"",icon:"mdi-file"}),p(" lihat ")]),_:1})],8,oe)]),"item-positions":t(o=>[e(C,{"selected-class":"text-primary",column:""},{default:t(()=>[o.positions.length<=5?(n(!0),m(g,{key:0},y(o.positions,(i,f)=>(n(),m("div",{key:f},[e(k,{style:{color:"rgb(6, 84, 107)"},onClick:x=>c.toPositionId(i.id)},{default:t(()=>[p(V(i.name),1)]),_:2},1032,["onClick"])]))),128)):(n(),m(g,{key:1},[(n(!0),m(g,null,y(o.positions.slice(0,5),(i,f)=>(n(),m("div",{key:f},[e(k,{style:{color:"rgb(6, 84, 107)"},onClick:x=>c.toPositionId(i.id)},{default:t(()=>[p(V(i.name),1)]),_:2},1032,["onClick"])]))),128)),e(k,{style:{color:"rgb(6, 84, 107)"},onClick:i=>c.showAllPositions(o)},{default:t(()=>[p(" +"+V(o.positions.length-5)+" lainnya ",1)]),_:2},1032,["onClick"]),e(U,{modelValue:s.isShowDetailPos,"onUpdate:modelValue":a[16]||(a[16]=i=>s.isShowDetailPos=i),width:"auto"},{default:t(()=>[e(F,null,{default:t(()=>[e(E,null,{default:t(()=>[se]),_:1}),e(W,null,{default:t(()=>[e(C,{"selected-class":"text-primary",column:""},{default:t(()=>[(n(!0),m(g,null,y(s.detailPos.positions,(i,f)=>(n(),m("div",{key:f},[e(k,{style:{color:"rgb(6, 84, 107)"},onClick:x=>c.toPositionId(i.id)},{default:t(()=>[p(V(i.name),1)]),_:2},1032,["onClick"])]))),128))]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))]),_:2},1024)]),"item-operation":t(o=>[h("div",re,[e(M,{location:"top",text:"Lihat Detail File"},{activator:t(({props:i})=>[h("button",D(S(i)),[e(_,{size:"20",icon:"bx-file-find",color:"red",onClick:f=>c.toDetailFile(o)},null,8,["onClick"])],16)]),_:2},1024),e(M,{location:"top",text:"Edit File"},{activator:t(({props:i})=>[h("button",D(S(i)),[e(_,{size:"20",icon:"bx-edit",color:"blue",onClick:f=>c.openModal(2,o)},null,8,["onClick"])],16)]),_:2},1024),e(M,{location:"top",text:"Hapus File"},{activator:t(({props:i})=>[h("button",D(S(i)),[e(_,{size:"20",icon:"bx-trash",color:"red",onClick:f=>c.deleteFile(o)},null,8,["onClick"])],16)]),_:2},1024)])]),"item-categories":t(o=>[e(C,{"selected-class":"text-primary",column:""},{default:t(()=>[(n(!0),m(g,null,y(o.categories,(i,f)=>(n(),m("div",{key:f},[e(k,{style:{color:"rgb(255, 153, 0)"},onClick:x=>c.toCategoryId(i.id)},{default:t(()=>[p(V(i.name),1)]),_:2},1032,["onClick"])]))),128))]),_:2},1024)]),_:1},8,["headers","items","search-value"])]),_:1})])}const Ue=G(X,[["render",ie]]);export{Ue as default};
