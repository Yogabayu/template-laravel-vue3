import{m as f}from"./VAvatar-368a1dc6.js";import{r as x,o as m,c as p,a as e,w as t,i as g,e as n,t as V,b as r,V as w,d as D,G as b,F,h as k,K as S,L as I}from"./main-2c9a0e59.js";import{_ as B}from"./_plugin-vue_export-helper-c27b6911.js";import{V as y,a as L,c as M}from"./VCard-ddac2cfd.js";import{V as P}from"./VTextField-bb8bb7fd.js";import{V as U}from"./VDialog-6332b061.js";import{V as E}from"./VForm-4031e0c2.js";import{V as _,a as d}from"./VRow-4964dfbe.js";import{V as N}from"./VSelect-cb7dfb2a.js";import{V as q}from"./VTextarea-f9ecc1fb.js";import{V as A}from"./VFileInput-011b75bc.js";import{d as z,b as J,c as K}from"./VMenu-67634d80.js";import{V as R}from"./VCheckbox-ee2c6da6.js";import{V as v,a as j}from"./VChip-847e90bf.js";import{V as G}from"./VTooltip-3bf33c77.js";import"./VImg-abb88c8a.js";import"./VCounter-38b10764.js";import"./index-e994dd60.js";import"./VOverlay-547ccc7e.js";import"./dialog-transition-29f1fa53.js";const O={watch:{positions:{handler(o){this.selectedPositions=o.filter(a=>a.checked).map(({title:a,value:i})=>({title:a,value:i}))},deep:!0}},data(){return{positionId:this.$route.params.posId,positionProfile:{name:null},filePath:this.$filePath,rules:{required:o=>!!o||"Required"},rulesTextArea:[o=>o.length<=2048||"Max 2048 characters"],dataForm:{id:null,name:null,path:null,summary:"",positions:[],categories:[]},positions:[],categories:[],items:[],headers:[{text:"Pengunggah",value:"file.author.name",sortable:!0},{text:"Nama File",value:"file.name",sortable:!0},{text:"Kategori",value:"file.categories",sortable:!0},{text:"File",value:"file.path",sortable:!0},{text:"Tanggal Diupload",value:"file.created_at",sortable:!0},{text:"Operation",value:"operation"}],searchValue:"",insert:!1,selectedPositions:[],selectedCategories:[]}},methods:{formatDate(o){return new Date(o).toLocaleString("id-ID")},toLink(o){this.$router.push(`/a-filedetail/${o.files[0].id}`)},toDetailFile(o){this.$router.push(`/a-filedetail/${o.file.id}`)},async insertData(){try{for(let i in this.dataForm)i!=="id"&&this.dataForm[i]===null&&(this.closeModal(),this.$showToast("error","Sorry",`Properti ${i} harus diisi.`));const o=new FormData;for(let i in this.dataForm)i!=="id"&&i!=="positions"&&i!=="categories"&&o.append(i,this.dataForm[i]);this.dataForm.positions=this.selectedPositions.map(i=>i.value),this.dataForm.positions.forEach(i=>{o.append("positions[]",i)}),this.dataForm.categories.forEach(i=>{o.append("categories[]",i)}),o.append("_method","POST");const a=await f.post("/file",o,{headers:{"Content-Type":"multipart/form-data"}});a.status===200?(this.closeModal(),this.getAllFilePerPosition(this.positionId),this.$showToast("success","Success",a.data.message)):this.$showToast("error","Sorry",a.data.message)}catch(o){this.$showToast("error","Sorry",o.response.data.message)}},resetForm(){this.dataForm={name:null,thumbnail:null,path:null,summary:null,divisions:null,positions:null,categories:null},this.selectedPositions=[],this.selectedCategories=[]},async getCategories(){try{const o=await f.get("/category");o.status===200?this.categories=o.data.data.map(a=>({value:a.id,title:a.name})):this.$showToast("error","Sorry","error get data category")}catch{this.$showToast("error","Sorry","error get data category")}},async getPositions(){try{const o=await f.get("/position");o.status===200?this.positions=o.data.data.map(a=>({value:a.id,title:a.name})):this.$showToast("error","Sorry","error get data position")}catch{this.$showToast("error","Sorry","error get data position")}},handlePathChange(o){const a=o.target.files[0];a&&["application/pdf"].includes(a.type)?this.dataForm.path=a:(this.$showToast("error","Error","Hanya file PDF yang diizinkan."),o.target.value=null)},closeModal(){this.resetForm(),this.insert=!1},openModal(){this.getPositions(),this.getCategories(),this.insert=!0},async getAllFilePerPosition(o){try{const a=await f.get(`/fileperpositionid/${o}`);a.status===200?(this.items=a.data.data.file,this.positionProfile=a.data.data.position):this.$showToast("error","Sorry",a.data.data.message)}catch(a){this.$showToast("error","Sorry",a.response.data.message)}}},mounted(){this.getAllFilePerPosition(this.positionId)}},H={class:"d-flex justify-space-between mb-6"},Q={class:"d-flex align-center pe-2 w-25"},W=r("p",null,"Data File Jabatan Kosong",-1),X=r("p",null,"loading data .....",-1),Y=["href"],Z={class:"operation-wrapper"},$={class:"d-flex justify-space-between"};function ee(o,a,i,te,s,c){const T=x("router-link"),C=x("EasyDataTable");return m(),p("div",null,[e(y,{class:"auth-card pa-4 pt-5"},{default:t(()=>[e(L,{class:"align-left"},{default:t(()=>[e(T,{to:"/a-file",class:"back-link"},{default:t(()=>[e(g,{icon:"bx-arrow-back",color:"primary",tag:"back",start:""}),n(" Back ")]),_:1}),e(M,{class:"text-2xl font-weight-bold"},{default:t(()=>[n(" Daftar File Berdasarkan Jabatan : "+V(s.positionProfile.name??"-"),1)]),_:1})]),_:1}),r("div",H,[e(w,{color:"primary",size:"small",class:"my-3 mx-3",onClick:c.openModal},{default:t(()=>[n(" Tambah Data ")]),_:1},8,["onClick"]),r("div",Q,[e(P,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:s.searchValue,"onUpdate:modelValue":a[0]||(a[0]=l=>s.searchValue=l)},null,8,["modelValue"])])]),e(U,{modelValue:s.insert,"onUpdate:modelValue":a[5]||(a[5]=l=>s.insert=l),width:"auto"},{default:t(()=>[e(y,null,{title:t(()=>[n("Tambah Data")]),text:t(()=>[e(E,{onSubmit:D(c.insertData,["prevent"])},{default:t(()=>[e(_,null,{default:t(()=>[e(d,{md:"12",cols:"12"},{default:t(()=>[e(P,{placeholder:"Nama file",label:"Nama",modelValue:s.dataForm.name,"onUpdate:modelValue":a[1]||(a[1]=l=>s.dataForm.name=l),autofocus:"",rules:[s.rules.required],"prepend-icon":"mdi-file"},null,8,["modelValue","rules"])]),_:1}),e(d,{cols:"12",md:"12"},{default:t(()=>[e(N,{label:"Pilih Kategori",items:s.categories,modelValue:s.dataForm.categories,"onUpdate:modelValue":a[2]||(a[2]=l=>s.dataForm.categories=l),"prepend-icon":"mdi-file",rules:[s.rules.required],multiple:"",clearable:""},null,8,["items","modelValue","rules"])]),_:1}),e(d,{cols:"12",md:"12"},{default:t(()=>[e(q,{counter:"",label:"Deskripsi Singkat",rules:s.rulesTextArea,modelValue:s.dataForm.summary,"onUpdate:modelValue":a[3]||(a[3]=l=>s.dataForm.summary=l),"prepend-icon":"mdi-comment"},null,8,["rules","modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:t(()=>[e(A,{accept:"application/pdf",placeholder:"Pilih File","prepend-icon":"mdi-file",rules:[s.rules.required],label:"File",onChange:c.handlePathChange},null,8,["rules","onChange"])]),_:1}),e(z,{thickness:5}),e(_,null,{default:t(()=>[e(d,{cols:"6"},{default:t(()=>[e(y,null,{title:t(()=>[n(" Pilih Jabatan : ")]),text:t(()=>[e(_,null,{default:t(()=>[(m(!0),p(b,null,F(s.positions,(l,u)=>(m(),k(d,{key:u,cols:"4"},{default:t(()=>[e(R,{modelValue:l.checked,"onUpdate:modelValue":h=>l.checked=h,label:l.title,value:l.value},null,8,["modelValue","onUpdate:modelValue","label","value"])]),_:2},1024))),128))]),_:1})]),_:1})]),_:1}),e(d,{cols:"6"},{default:t(()=>[e(y,null,{title:t(()=>[n(" Jabatan yang dipilih : ")]),text:t(()=>[e(_,null,{default:t(()=>[(m(!0),p(b,null,F(s.selectedPositions,(l,u)=>(m(),k(d,{key:u,cols:"6"},{default:t(()=>[e(J,null,{prepend:t(()=>[e(g,{icon:"mdi-check"})]),default:t(()=>[e(K,{textContent:V(l.title)},null,8,["textContent"])]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})]),_:1}),e(d,{cols:"12",class:"d-flex flex-wrap justify-end gap-4"},{default:t(()=>[e(w,{type:"submit"},{default:t(()=>[n("Simpan")]),_:1}),r("button",{type:"button",class:"btn btn-blue",onClick:a[4]||(a[4]=l=>c.closeModal())}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1},8,["modelValue"]),e(C,{"show-index":"",headers:s.headers,items:s.items,"search-value":s.searchValue},{"empty-message":t(()=>[W]),loading:t(()=>[X]),"item-file.path":t(l=>[r("a",{href:s.filePath+l.file.path,target:"_blank",rel:"noopener noreferrer",style:{cursor:"pointer !important"}},[e(v,{color:"primary"},{default:t(()=>[e(g,{start:"",icon:"mdi-file"}),n(" lihat ")]),_:1})],8,Y)]),"item-file.categories":t(l=>[e(j,{"selected-class":"text-primary",column:""},{default:t(()=>[(m(!0),p(b,null,F(l.file.categories,(u,h)=>(m(),p("div",{key:h},[e(v,{style:{color:"rgb(255, 153, 0)"}},{default:t(()=>[n(V(u.name),1)]),_:2},1024)]))),128))]),_:2},1024)]),"item-file.created_at":t(l=>[r("p",null,V(c.formatDate(l.file.created_at)),1)]),"item-operation":t(l=>[r("div",Z,[r("div",$,[e(G,{location:"top",text:"Lihat Detail File"},{activator:t(({props:u})=>[r("button",S(I(u)),[e(g,{size:"20",icon:"bx-file-find",color:"red",onClick:h=>c.toDetailFile(l)},null,8,["onClick"])],16)]),_:2},1024)])])]),_:1},8,["headers","items","search-value"])]),_:1})])}const xe=B(O,[["render",ee]]);export{xe as default};
