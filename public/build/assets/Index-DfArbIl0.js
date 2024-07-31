import{Q as H,r as v,T as b,k as q,o as y,c as C,a as o,u as s,b as a,F as E,Z as T,d as e,f as n,h as A,t as x,l as z}from"./app-Bl3T2PEu.js";import{_ as g,a as V}from"./InputLabel-CILBcnRa.js";import{_ as k}from"./TextInput-BKMRR2kh.js";import{_ as L}from"./AuthenticatedLayout-BMfegmjn.js";import{P as m}from"./PrimaryButton-UegWikxo.js";import{_ as w}from"./Modal-BbqnY8Wa.js";import{_ as M}from"./SecondaryButton-CWnMiVNa.js";import{V as N}from"./datatables.net-vue3-BB9rLPIq.js";import{D as P}from"./dataTables-r9xCXzu8.js";import"./ApplicationLogo-DFav5x2P.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./Swal-C35AGuOh.js";const U=e("h2",{class:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"},"Articulos",-1),X={class:"py-12"},Q={class:"max-w-7xl mx-auto sm:px-6 lg:px-8"},R={class:"bg-white dark:bg-gray-800 dark:text-white overflow-hidden shadow-sm sm:rounded-lg"},W={class:""},Z={class:"grid grid-flow-col grid-cols-3 mt-5 mr-5 ml-5 justify-items-center"},G=e("span",null,null,-1),J=e("div",{class:"text-2xl"},[e("strong",null,"Articulos")],-1),K=e("svg",{class:"h-4 w-4 mr-1 text-slate-100",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[e("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"}),e("line",{x1:"12",y1:"8",x2:"12",y2:"16"}),e("line",{x1:"8",y1:"12",x2:"16",y2:"12"})],-1),O=e("svg",{class:"h-6 w-6 text-green-500",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{stroke:"none",d:"M0 0h24v24H0z"}),n(),e("path",{d:"M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"}),n(),e("polyline",{points:"7 9 12 4 17 9"}),n(),e("line",{x1:"12",y1:"4",x2:"12",y2:"16"})],-1),Y={class:"text-gray-900 dark:text-gray-100"},ee={class:"flex flex-col"},te={class:"sm:-mx-6 lg:-mx-8"},oe={class:"inline-block min-w-full py-2 sm:px-6 lg:px-8"},se={class:"overflow-x-auto p-3"},le=e("thead",null,[e("tr",null,[e("th",null,"ID- Numero"),e("th",null,"Numero de Articulo"),e("th",null,"Descripcion de articulos"),e("th",null,"Acciones")])],-1),re={class:"p-6"},ae=e("h2",{class:"text-lg font-medium text-gray-900 dark:text-gray-100"}," Agrega un nuevo Articulo ",-1),ne={class:"mt-6 flex justify-end"},ie={class:"p-6"},ce={class:"text-lg font-medium text-gray-900 dark:text-gray-100"},ue=e("br",null,null,-1),de={class:"p-6"},me=e("h2",{class:"text-lg font-medium text-gray-900 dark:text-gray-100"}," Agrega un nuevo Articulo ",-1),pe=["value"],_e={class:"mt-6 flex justify-end"},Ne={__name:"Index",setup(he){N.use(P);const d=H(),p=v(!1),_=v(!1),h=v(!1),l=b({numero_articulo:"",descripcion_articulo:""}),i=b({excel:""}),B=()=>{p.value=!0},j=r=>{d.props.articulos.forEach(t=>{t.id==r&&(l.numero_articulo=t.numero_articulo,l.descripcion_articulo=t.descripcion_articulo)}),_.value=!0},I=()=>{h.value=!0},c=()=>{p.value=!1,h.value=!1,_.value=!1,l.reset()},S=()=>{l.post(route("articulo.store"),{onSuccess:()=>c(),onFinish:()=>l.reset()})},D=()=>{i.post(route("articulo.import_articulos"),{onSuccess:()=>c(),onFinish:()=>i.reset()})},f=r=>({ver:'<button class="boton ver" @click="'+j(r)+'"><svg class="h-6 w-6 text-blue-800 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg></button>',editar:'<button class="boton editar" dataId="'+r+'"><svg class="h-6 w-6 text-blue-800 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>',eliminar:'<button class="boton eliminar" dataId="'+r+'"><svg class="h-6 w-6 text-blue-800 mr-3"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polyline points="3 6 5 6 21 6" />  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" /></svg></button>'}),$=[{data:null,render:function(r,t,u,F){return F.row+1}},{data:"numero_articulo"},{data:"descripcion_articulo"},{data:null,orderable:!1,render:function(r){if(d.props.isAdmin){let t=f(r.id);return t.ver+t.editar+t.eliminar}else if(d.props.isCompras){let t=f(r.id);return t.ver+t.editar+t.eliminar}else return d.props.isRt?f(r.id).ver:"Nulo"}}];return q(()=>{}),(r,t)=>(y(),C(E,null,[o(s(T),{title:"Dashboard"}),o(L,null,{header:a(()=>[U]),default:a(()=>[e("div",X,[e("div",Q,[e("div",R,[e("div",W,[e("div",Z,[G,J,o(m,{onClick:B,class:"bg-slate-500 text-base/4 hover:text-white"},{default:a(()=>[K,n(" Nuevo ")]),_:1}),o(m,{onClick:I,class:"bg-green-900 text-base/4 hover:text-white"},{default:a(()=>[O,n(" XLSX ")]),_:1})]),e("div",Y,[e("div",ee,[e("div",te,[e("div",oe,[e("div",se,[o(s(N),{id:"example",class:"example display w-full border border-gray-400",data:r.$page.props.articulos,columns:$,options:{stateSave:!0,responsive:!0,autoWidth:!1}},{default:a(()=>[le]),_:1},8,["data"])])])])])])])])])])]),_:1}),o(w,{show:p.value,onClose:c},{default:a(()=>[e("div",re,[ae,e("form",{onSubmit:A(S,["prevent"]),class:"px-8 pt-6 pb-8"},[e("div",null,[o(g,{for:"name",value:"Numero del Articulo"}),o(k,{id:"name",type:"text",class:"mt-1 block w-full",modelValue:s(l).numero_articulo,"onUpdate:modelValue":t[0]||(t[0]=u=>s(l).numero_articulo=u),required:"",autofocus:"",autocomplete:"name"},null,8,["modelValue"]),o(g,{for:"name",value:"Descripcion del Articulo"}),o(k,{id:"name",type:"text",class:"mt-1 block w-full",modelValue:s(l).descripcion_articulo,"onUpdate:modelValue":t[1]||(t[1]=u=>s(l).descripcion_articulo=u),required:"",autofocus:"",autocomplete:"name"},null,8,["modelValue"]),o(V,{class:"mt-2",message:s(l).errors.name},null,8,["message"])]),e("div",ne,[o(M,{onClick:c},{default:a(()=>[n(" Cancelar ")]),_:1}),o(m,{class:"ms-3"},{default:a(()=>[n("Aceptar")]),_:1})])],32)])]),_:1},8,["show"]),o(w,{show:_.value,onClose:c},{default:a(()=>[e("div",ie,[e("h2",ce,[n(x(s(l).numero_articulo)+" ",1),ue,n(" "+x(s(l).descripcion_articulo),1)])])]),_:1},8,["show"]),o(w,{show:h.value,onClose:c},{default:a(()=>[e("div",de,[me,e("form",{onSubmit:A(D,["prevent"]),class:"px-8 pt-6 pb-8"},[e("div",null,[o(g,{for:"name",value:"Seleccione el Archivo de Excel"}),o(k,{id:"name",type:"file",class:"mt-1 block w-full",onInput:t[2]||(t[2]=u=>s(i).excel=u.target.files[0]),required:"",autofocus:"",autocomplete:"name"}),s(i).progress?(y(),C("progress",{key:0,value:s(i).progress.percentage,max:"100"},x(s(i).progress.percentage)+"% ",9,pe)):z("",!0),o(V,{class:"mt-2",message:s(i).errors.name},null,8,["message"])]),e("div",_e,[o(M,{onClick:c},{default:a(()=>[n(" Cancelar ")]),_:1}),o(m,{class:"ms-3"},{default:a(()=>[n("Aceptar")]),_:1})])],32)])]),_:1},8,["show"])],64))}};export{Ne as default};