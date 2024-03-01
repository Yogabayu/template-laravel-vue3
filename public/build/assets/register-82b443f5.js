import{u as v,o as C,c as V,f as b,a as e,h as t,V as h,F as y,i as m,r as g,w as o,b as r,e as c,d as w}from"./main-e96450c7.js";import{V as k,a as F,c as L,b as f}from"./VCard-431b48e4.js";import{V as I}from"./VForm-f63b1820.js";import{V as M,a as d}from"./VRow-9672392b.js";import{V as p}from"./VTextField-fc0b433e.js";import{V as P}from"./VCheckbox-a5b9a130.js";import{V as T}from"./VCounter-6b7b42d1.js";import{V as _}from"./VDivider-e6c2330d.js";import"./VAvatar-510d1ca2.js";import"./VImg-49529653.js";import"./index-c214d2f8.js";import"./VCheckboxBtn-0a19cd6a.js";const D={__name:"AuthProvider",setup(x){const{global:l}=v(),n=[{icon:"bxl-facebook",color:"#4267b2",colorInDark:"#4267b2"},{icon:"bxl-twitter",color:"#1da1f2",colorInDark:"#1da1f2"},{icon:"bxl-github",color:"#272727",colorInDark:"#fff"},{icon:"bxl-google",color:"#db4437",colorInDark:"#db4437"}];return(u,a)=>(C(),V(y,null,b(n,i=>e(h,{key:i.icon,icon:i.icon,variant:"text",color:t(l).name.value==="dark"?i.colorInDark:i.color},null,8,["icon","color"])),64))}},B=`<svg width="22" height="32" viewBox="0 0 55 81" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M30.1984 0.0144043C24.8945 0.425781 25.2534 6.16968 26.6435 7.65326C22.693 10.3649 13.1875 16.8867 6.76944 21.2803C1.21531 25.0824 -0.842975 34.6064 1.11159 40.8262C3.00952 46.8658 12.4904 51.3615 17.5337 52.7256C17.5337 52.7256 11.7188 56.0269 6.60358 60.0482C1.48831 64.0695 -0.622615 69.3436 3.06836 75.262C6.75933 81.1805 12.725 80.761 17.5257 78.6229C22.3264 76.4848 32.1683 69.1692 37.9402 65.1633C42.7282 61.5411 43.9669 53.6444 41.7631 46.9643C39.9758 41.5468 30.0969 36.4284 25.1792 34.6064C27.1946 33.1595 32.4935 29.4242 37.129 26.0909C38.7184 30.5636 43.9998 30.212 45.6103 27.8209C47.6216 23.4326 51.8339 13.4663 53.9579 8.55175C54.8862 4.81044 52.5639 2.78457 50.2227 2.35938C46.8672 1.75 38.3222 0.960115 30.1984 0.0144043Z"></path><path fill-opacity="0.2" fill="#FFF" d="M26.6523 7.65625C24.9492 5.625 25.3239 0.255308 30.2922 0.0105286C33.0074 0.326611 35.7804 0.62685 38.3907 0.909477C43.5904 1.47246 48.1446 1.96556 50.311 2.3748C52.7331 2.83234 54.886 5.06072 53.9543 8.61103C53.2063 10.3418 52.2075 12.6646 51.1482 15.1282C49.1995 19.6601 47.0459 24.6685 45.8717 27.3445C44.7224 29.964 39.111 31.0585 37.1137 26.0951C32.4782 29.4283 27.2884 33.1556 25.273 34.6026C24.931 34.4553 24.3074 34.2381 23.5124 33.9613C20.8691 33.0407 16.331 31.4602 13.9477 29.5966C9.61363 25.5918 11.6259 19.4662 13.1737 16.904C17.8273 13.7183 20.7417 11.7161 23.4984 9.82236C24.5437 9.10427 25.5662 8.40178 26.6523 7.65625Z"></path><path fill-opacity="0.2" fill="#FFF" d="M17.543 52.7266C21.2241 53.9875 28.5535 57.0509 30.091 59.101C32.0129 61.6635 33.1576 64.34 29.2527 71.2039C28.5954 71.6481 27.9821 72.0633 27.4069 72.4528C22.1953 75.9817 20.1085 77.3946 16.6243 79.0531C13.5855 80.2464 6.61575 81.7103 2.66559 74.5653C-1.11764 67.7222 3.23818 62.7113 6.5963 60.065L12.1695 56.0339L14.8359 54.3477L17.543 52.7266Z"></path></svg>
`;const U={class:"auth-wrapper d-flex align-center justify-center pa-4"},j={class:"d-flex"},$=["innerHTML"],A=r("h5",{class:"text-h5 mb-1"}," Adventure starts here 🚀 ",-1),N=r("p",{class:"mb-0"}," Make your app management easy and fun! ",-1),R={class:"d-flex align-center mt-1 mb-4"},S=r("span",{class:"me-1"},"I agree to",-1),Z=r("a",{href:"javascript:void(0)",class:"text-primary"},"privacy policy & terms",-1),E=r("span",null,"Already have an account?",-1),H=r("span",{class:"mx-4"},"or",-1),ae={__name:"register",setup(x){const l=m({username:"",email:"",password:"",privacyPolicies:!1}),n=m(!1);return(u,a)=>{const i=g("RouterLink");return C(),V("div",U,[e(k,{class:"auth-card pa-4 pt-7","max-width":"448"},{default:o(()=>[e(F,{class:"justify-center"},{prepend:o(()=>[r("div",j,[r("div",{class:"d-flex text-primary",innerHTML:t(B)},null,8,$)])]),default:o(()=>[e(L,{class:"text-2xl font-weight-bold"},{default:o(()=>[c(" sneat ")]),_:1})]),_:1}),e(f,{class:"pt-2"},{default:o(()=>[A,N]),_:1}),e(f,null,{default:o(()=>[e(I,{onSubmit:a[5]||(a[5]=w(s=>u.$router.push("/"),["prevent"]))},{default:o(()=>[e(M,null,{default:o(()=>[e(d,{cols:"12"},{default:o(()=>[e(p,{modelValue:t(l).username,"onUpdate:modelValue":a[0]||(a[0]=s=>t(l).username=s),autofocus:"",label:"Username",placeholder:"Johndoe"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12"},{default:o(()=>[e(p,{modelValue:t(l).email,"onUpdate:modelValue":a[1]||(a[1]=s=>t(l).email=s),label:"Email",placeholder:"johndoe@email.com",type:"email"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12"},{default:o(()=>[e(p,{modelValue:t(l).password,"onUpdate:modelValue":a[2]||(a[2]=s=>t(l).password=s),label:"Password",placeholder:"············",type:t(n)?"text":"password","append-inner-icon":t(n)?"bx-hide":"bx-show","onClick:appendInner":a[3]||(a[3]=s=>n.value=!t(n))},null,8,["modelValue","type","append-inner-icon"]),r("div",R,[e(P,{id:"privacy-policy",modelValue:t(l).privacyPolicies,"onUpdate:modelValue":a[4]||(a[4]=s=>t(l).privacyPolicies=s),inline:""},null,8,["modelValue"]),e(T,{for:"privacy-policy",style:{opacity:"1"}},{default:o(()=>[S,Z]),_:1})]),e(h,{block:"",type:"submit"},{default:o(()=>[c(" Sign up ")]),_:1})]),_:1}),e(d,{cols:"12",class:"text-center text-base"},{default:o(()=>[E,e(i,{class:"text-primary ms-2",to:"/login"},{default:o(()=>[c(" Sign in instead ")]),_:1})]),_:1}),e(d,{cols:"12",class:"d-flex align-center"},{default:o(()=>[e(_),H,e(_)]),_:1}),e(d,{cols:"12",class:"text-center"},{default:o(()=>[e(D)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})])}}};export{ae as default};
