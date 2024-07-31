import{r as x,o as l,c as u,d as e,a,b as t,f as r,t as m,n as f,s as k,l as w,m as y,T as N,u as _,F as $,Z as P,e as B,v as L,h as D,g as O}from"./app-Bl3T2PEu.js";import{A as R}from"./ApplicationLogo-DFav5x2P.js";import{_ as V,a as g,b as M,c as v,d as A}from"./Swal-C35AGuOh.js";import{P as E}from"./PrimaryButton-UegWikxo.js";import{_ as S}from"./SecondaryButton-CWnMiVNa.js";import{_ as C}from"./Checkbox-bBwqE_q_.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const z={class:"min-h-screen bg-gray-100 dark:bg-gray-900"},T={class:"bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700"},U={class:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"},F={class:"flex justify-between h-16"},G={class:"flex"},Z={class:"shrink-0 flex items-center"},q={class:"hidden space-x-8 sm:-my-px sm:ms-10 sm:flex"},H={class:"mt-4"},I=e("span",{class:"inline-flex rounded-md"},[e("button",{type:"button",class:"inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"},[r(" Usuarios "),e("svg",{class:"ms-2 -me-0.5 h-4 w-4",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},[e("path",{"fill-rule":"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z","clip-rule":"evenodd"})])])],-1),J={class:"hidden sm:flex sm:items-center sm:ms-6"},K={class:"ms-3 relative"},Q={class:"inline-flex rounded-md"},W={type:"button",class:"inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"},X=e("svg",{class:"ms-2 -me-0.5 h-4 w-4",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},[e("path",{"fill-rule":"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1),Y={class:"-me-2 flex items-center sm:hidden"},ee={class:"h-6 w-6",stroke:"currentColor",fill:"none",viewBox:"0 0 24 24"},se={class:"pt-2 pb-3 space-y-1"},te={class:"pt-4 pb-1 border-t border-gray-200 dark:border-gray-600"},ae={class:"px-4"},oe={class:"font-medium text-base text-gray-800 dark:text-gray-200"},re={class:"font-medium text-sm text-gray-500"},ie={class:"mt-3 space-y-1"},de={key:0,class:"bg-white dark:bg-gray-800 shadow"},le={class:"max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"},ne={__name:"GeneralLayout",setup(b){const i=x(!1);return(s,n)=>{var h,p,o,d;return l(),u("div",null,[e("div",z,[e("nav",T,[e("div",U,[e("div",F,[e("div",G,[e("div",Z,[a(R,{class:"block h-9 w-auto fill-current text-gray-800 dark:text-gray-200"})]),e("div",q,[a(V,{href:s.route("admin.index"),active:s.route().current("dashboard")},{default:t(()=>[r(" Dashboard ")]),_:1},8,["href","active"]),e("div",H,[a(M,{align:"right",width:"48"},{trigger:t(()=>[I]),content:t(()=>[a(g,{href:s.route("roles.index")},{default:t(()=>[r(" Roles ")]),_:1},8,["href"]),a(g,{href:s.route("permisos.index")},{default:t(()=>[r("Permisos")]),_:1},8,["href"])]),_:1})])])]),e("div",J,[e("div",K,[a(M,{align:"right",width:"48"},{trigger:t(()=>[e("span",Q,[e("button",W,[r(m(s.$page.props.auth.user.name)+" ",1),X])])]),content:t(()=>[a(g,{href:s.route("profile.edit")},{default:t(()=>[r(" Profile ")]),_:1},8,["href"]),a(g,{href:s.route("logout"),method:"post",as:"button"},{default:t(()=>[r(" Log Out ")]),_:1},8,["href"])]),_:1})])]),e("div",Y,[e("button",{onClick:n[0]||(n[0]=c=>i.value=!i.value),class:"inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"},[(l(),u("svg",ee,[e("path",{class:f({hidden:i.value,"inline-flex":!i.value}),"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 6h16M4 12h16M4 18h16"},null,2),e("path",{class:f({hidden:!i.value,"inline-flex":i.value}),"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"},null,2)]))])])])]),e("div",{class:f([{block:i.value,hidden:!i.value},"sm:hidden"])},[e("div",se,[a(v,{href:s.route("admin.index"),active:s.route().current("dashboard")},{default:t(()=>[r(" Dashboard ")]),_:1},8,["href","active"])]),e("div",te,[e("div",ae,[e("div",oe,m(s.$page.props.auth.user.name),1),e("div",re,m(s.$page.props.auth.user.email),1)]),e("div",ie,[a(v,{href:s.route("profile.edit")},{default:t(()=>[r(" Profile ")]),_:1},8,["href"]),a(v,{href:s.route("logout"),method:"post",as:"button"},{default:t(()=>[r(" Log Out ")]),_:1},8,["href"])])])],2)]),s.$slots.header?(l(),u("header",de,[e("div",le,[k(s.$slots,"header")])])):w("",!0),(p=(h=s.$page)==null?void 0:h.props.flash)!=null&&p.message?(l(),y(A,{key:1,message:(d=(o=s.$page)==null?void 0:o.props.flash)==null?void 0:d.message},null,8,["message"])):w("",!0),e("main",null,[k(s.$slots,"default")])])])}}},ce=e("h2",{class:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"},"Dashboard",-1),ue={class:"py-12"},me={class:"max-w-7xl mx-auto sm:px-6 lg:px-8"},he={class:"bg-white dark:bg-gray-800 dark:text-white overflow-hidden shadow-sm sm:rounded-lg"},pe={class:""},ge={class:"grid grid-flow-col grid-cols-3 p-5 justify-items-center"},fe={class:""},_e={class:"text-2xl"},ve={class:"text-gray-900 dark:text-gray-100"},xe={class:"flex flex-col overflow-x-auto"},ye={class:"sm:-mx-6 lg:-mx-8"},be={class:"inline-block min-w-full py-2 sm:px-6 lg:px-8"},ke={class:"overflow-x-auto p-5"},we={class:"ms-2 text-sm text-gray-600 dark:text-gray-400"},$e={class:"mt-6 flex justify-end"},De={__name:"Edit",props:{permissionNames:{type:Object,default:()=>({})},role:{type:Object,default:()=>({})},permission:{type:Object,default:()=>({})}},setup(b){const i=b;x([]);const s=x(!1),n=N({id:"",name:"",RolPermiso:[i.permissionNames]});function h(){n.patch(route("roles.update")),n.reset(),closeModal()}function p(o){return s.value=!1,i.permissionNames.forEach(d=>{o===d.permiso_id&&(s.value=!0)}),s.value}return(o,d)=>(l(),u($,null,[a(_(P),{title:"Dashboard-Admin"}),a(ne,null,{header:t(()=>[ce]),default:t(()=>[e("div",ue,[e("div",me,[e("div",he,[e("div",pe,[e("div",ge,[e("div",fe,[B(e("input",{type:"text","onUpdate:modelValue":d[0]||(d[0]=c=>o.search=c),placeholder:"Search...",class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5"},null,512),[[L,o.search]])]),e("div",_e,[e("strong",null,"Editar Permisos de: "+m(o.$page.props.role.name),1)])]),e("div",ve,[e("div",xe,[e("div",ye,[e("div",be,[e("div",ke,[e("pre",null,m(o.$page.props.permissionNames),1),e("form",{onSubmit:D(h,["prevent"]),class:"px-8 pt-6 pb-8"},[(l(!0),u($,null,O(o.$page.props.permission,c=>(l(),u("div",{key:o.$page.props.permission.id},[p(c.id)?(l(),y(C,{key:0,value:c.id,checked:""},null,8,["value"])):(l(),y(C,{key:1,checked:_(n).RolPermiso,"onUpdate:checked":d[1]||(d[1]=j=>_(n).RolPermiso=j),value:c.id},null,8,["checked","value"])),e("span",we,m(c.name),1)]))),128)),e("div",$e,[a(S,{onClick:o.closeModal},{default:t(()=>[r(" Cancelar ")]),_:1},8,["onClick"]),a(E,{class:"ms-3"},{default:t(()=>[r("Aceptar")]),_:1})])],32)])])])])])])])])])]),_:1})],64))}};export{De as default};
