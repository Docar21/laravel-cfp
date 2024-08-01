import{r as y,Q as F,T as N,k as $,o as n,c as d,a as l,u as i,b as p,F as k,Z as z,d as t,f as b,t as c,g as C,h as H,l as m}from"./app-Bl3T2PEu.js";import{_ as O}from"./TextInput-BKMRR2kh.js";import{_ as U}from"./AuthenticatedLayout-BMfegmjn.js";import{P as w}from"./PrimaryButton-UegWikxo.js";import{_ as D}from"./Modal-BbqnY8Wa.js";import{_ as P}from"./SecondaryButton-CWnMiVNa.js";import{_ as T}from"./Checkbox-bBwqE_q_.js";import{V as A}from"./datatables.net-vue3-BB9rLPIq.js";import{D as R}from"./dataTables-r9xCXzu8.js";import"./ApplicationLogo-DFav5x2P.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./Swal-C35AGuOh.js";const G=t("h2",{class:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"},"Solicitudes",-1),Q={class:"py-12"},W={class:"max-w-7xl mx-auto sm:px-6 lg:px-8"},Z={class:"bg-white dark:bg-gray-800 dark:text-white overflow-hidden shadow-sm sm:rounded-lg"},q={class:""},J={class:"grid grid-flow-col grid-cols-3 p-5 justify-items-center"},K=t("div",null,null,-1),X=t("div",{class:"text-2xl"},[t("strong",null,"Solicitudes")],-1),Y=t("svg",{class:"h-4 w-4 mr-1 text-slate-100",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[t("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"}),t("line",{x1:"12",y1:"8",x2:"12",y2:"16"}),t("line",{x1:"8",y1:"12",x2:"16",y2:"12"})],-1),tt={class:"text-gray-900 dark:text-gray-100"},et={class:"-mt-10 flex flex-col overflow-x-auto"},st={class:"sm:-mx-6 lg:-mx-8"},ot={class:"inline-block min-w-full py-2 sm:px-6 lg:px-8"},at={class:"overflow-x-auto p-5"},rt={class:"bg-gray-50 overflow-hidden sm:py-12"},it=t("thead",null,[t("tr",null,[t("th",null,"ID"),t("th",null,"Id Solicitud"),t("th",null,"Fecha Realizada"),t("th",null,"Fecha Deseada"),t("th",null,"Estado"),t("th",null,"Proyecto"),t("th",null,"Usuario"),t("th",null,"Acciones")])],-1),lt={class:"p-6"},ct={class:"text-lg font-medium text-gray-900 dark:text-gray-100"},nt={class:"p-6"},dt={class:"min-w-full text-start text-sm font-light text-surface dark:text-white"},ut=t("thead",{class:"border-b border-neutral-200 font-bold text-xl text-gray-950 dark:border-white/10"},[t("tr",{class:"bg-slate-200 border-b dark:bg-gray-800 dark:border-gray-700"},[t("th",{scope:"col",class:"py-3 px-6"},"Descripcion"),t("th",{scope:"col",class:"py-3 px-6"},"Cantidad"),t("th",{scope:"col",class:"py-3 px-6"},"Comentarios"),t("th",{scope:"col",class:"py-3 px-6"},"Observaciones"),t("th",{scope:"col",class:"py-3 px-6"},"Observaciones Compras"),t("th",{scope:"col",class:"py-3 px-6"},"Estado")])],-1),pt={class:"border-b dark:bg-gray-800 dark:border-gray-700"},ht={scope:"col",class:"py-3 px-6"},_t={scope:"col",class:"py-3 px-6"},mt={scope:"col",class:"py-3 px-6"},bt={scope:"col",class:"py-3 px-6"},xt={scope:"col",class:"py-3 px-6"},ft={scope:"col",class:"py-3 px-6"},vt={class:"mt-6 flex justify-end"},gt={class:"p-6"},yt={class:"text-lg font-medium text-gray-900 dark:text-gray-100"},kt={class:"p-6"},wt={class:"min-w-full text-start text-sm font-light text-surface dark:text-white"},Ct=t("thead",{class:"border-b border-neutral-200 font-bold text-xl text-gray-950 dark:border-white/10"},[t("tr",{class:"bg-slate-200 border-b dark:bg-gray-800 dark:border-gray-700"},[t("th",{scope:"col",class:"py-3 px-6"},"Descripcion"),t("th",{scope:"col",class:"py-3 px-6"},"Cantidad"),t("th",{scope:"col",class:"py-3 px-6"},"Comentarios"),t("th",{scope:"col",class:"py-3 px-6"},"Observaciones"),t("th",{scope:"col",class:"py-3 px-6"},"Aprobado")])],-1),Dt={class:"border-b dark:bg-gray-800 dark:border-gray-700"},At={key:0,scope:"col",class:"py-3 px-6"},Mt={key:1,scope:"col",class:"py-3 px-6"},Vt={key:2,scope:"col",class:"py-3 px-6"},Bt={key:3,scope:"col",class:"py-3 px-6"},It={key:4},Lt={class:"mt-6 flex justify-end"},Gt={__name:"Index",setup(Et){A.use(R);const x=y(!1),f=y(!1),v=y([]),h=F(),s=N({id_solicitud:"",observaciones_gerencia:[],aprobados:[],isAdmin:h.props.isAdmin,isCompras:h.props.isCompras}),M=()=>{s.get(route("solicitud.create"),{onFinish:()=>s.reset()})},_=()=>{v.value=[],f.value=!1,x.value=!1,s.reset()},V=o=>{h.props.solicitudDetalle.forEach(a=>{a.solicitud_id==o&&v.value.push(a)}),s.id_solicitud=o,x.value=!0},B=o=>{s.id_solicitud=o,f.value=!0},I=()=>{s.post(route("solicitud.update"),{onFinish:()=>s.reset()}),_()},L=o=>{s.reset(),s.id_solicitud=o,s.post(route("solicitud.aprobar"),{onFinish:()=>s.reset()})},E=o=>{s.reset(),s.id_solicitud=o,s.post(route("solicitud.negar"),{onFinish:()=>s.reset()})},S=o=>{s.reset(),s.id_solicitud=o,s.get(route("solicitud.exportsolicitud"),{onFinish:()=>s.reset()})},g=o=>({ver:'<button class="boton ver" dataId="'+o+'"><svg class="h-6 w-6 text-blue-800 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg></button>',editar:'<button class="boton editar" dataId="'+o+'"><svg class="h-6 w-6 text-blue-800 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>',aprobar:'<button class="boton aprobar" dataId="'+o+'"><svg class="h-6 w-6 text-blue-800 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>',negar:'<button class="boton negar" dataId="'+o+'"><svg class="h-6 w-6 text-blue-800 mr-3" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><circle cx="12" cy="12" r="9" /><path d="M10 10l4 4m0 -4l-4 4" /></svg></button>',excel:'<button><a href="/solicitud-export/'+o+'"  target="_blank"><svg class="h-6 w-6 text-blue-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg></a></button>'}),j=[{data:null,render:function(o,a,e,r){return r.row+1}},{data:"solicitud_id"},{data:"fecha_realizada"},{data:"fecha_deseada"},{data:"estado"},{data:"proyecto"},{data:"usuario"},{data:null,orderable:!1,render:function(o){if(h.props.isAdmin){let a=g(o.solicitud_id);return a.ver+a.editar+a.aprobar+a.negar+a.excel}else if(h.props.isCompras){let a=g(o.solicitud_id);return a.ver+a.editar+a.excel}else return h.props.isRt?g(o.solicitud_id).ver:"Nulo"}}];return $(()=>{const o=document.getElementsByClassName("boton");for(const a of o){let e=a;e.classList.contains("ver")&&e.addEventListener("click",function(r){r.preventDefault();let u=e.getAttribute("dataId");V(u)}),e.classList.contains("editar")&&e.addEventListener("click",function(r){r.preventDefault();let u=e.getAttribute("dataId");B(u)}),e.classList.contains("aprobar")&&e.addEventListener("click",function(r){r.preventDefault();let u=e.getAttribute("dataId");L(u)}),e.classList.contains("negar")&&e.addEventListener("click",function(r){r.preventDefault();let u=e.getAttribute("dataId");E(u)}),e.classList.contains("excel")&&e.addEventListener("click",function(r){r.preventDefault();let u=e.getAttribute("dataId");S(u)})}}),(o,a)=>(n(),d(k,null,[l(i(z),{title:"Dashboard"}),l(U,null,{header:p(()=>[G]),default:p(()=>[t("div",Q,[t("div",W,[t("div",Z,[t("div",q,[t("div",J,[K,X,l(w,{onClick:M,class:"bg-slate-500 text-base/4 hover:text-white"},{default:p(()=>[Y,b(" Nuevo ")]),_:1})]),t("div",tt,[t("div",et,[t("div",st,[t("div",ot,[t("div",at,[t("div",rt,[l(i(A),{id:"example",class:"example display w-full border border-gray-400",data:o.$page.props.solicitudes,columns:j,options:{stateSave:!0,responsive:!0,autoWidth:!1,dom:"Bftip"}},{default:p(()=>[it]),_:1},8,["data"])])])])])])])])])])])]),_:1}),l(D,{"max-width":"",show:x.value,onClose:_},{default:p(()=>[t("div",lt,[t("h2",ct," Detalles Solicitud "+c(i(s).id_solicitud),1)]),t("div",nt,[t("table",dt,[ut,t("tbody",null,[(n(!0),d(k,null,C(v.value,e=>(n(),d("tr",pt,[t("th",ht,c(e.descripcion),1),t("th",_t,c(e.cantidad),1),t("th",mt,c(e.observaciones),1),t("th",bt,c(e.obs_gerencia),1),t("th",xt,c(e.obs_compras),1),t("th",ft,c(e.estado_articulo),1)]))),256))])]),t("div",vt,[l(w,{onClick:_,class:"ms-3"},{default:p(()=>[b("Aceptar")]),_:1})])])]),_:1},8,["show"]),l(D,{"max-width":"gr",show:f.value,onClose:_},{default:p(()=>[t("div",gt,[t("h2",yt," Solicitud "+c(i(s).id_solicitud),1)]),t("div",kt,[t("form",{onSubmit:H(I,["prevent"])},[t("table",wt,[Ct,t("tbody",null,[(n(!0),d(k,null,C(o.$page.props.solicitudDetalle,e=>(n(),d("tr",Dt,[e.solicitud_id==i(s).id_solicitud?(n(),d("th",At,c(e.descripcion),1)):m("",!0),e.solicitud_id==i(s).id_solicitud?(n(),d("th",Mt,c(e.cantidad),1)):m("",!0),e.solicitud_id==i(s).id_solicitud?(n(),d("th",Vt,c(e.observaciones),1)):m("",!0),e.solicitud_id==i(s).id_solicitud?(n(),d("th",Bt,[l(O,{id:"observaciones",type:"text",modelValue:i(s).observaciones_gerencia[e.articulo_id],"onUpdate:modelValue":r=>i(s).observaciones_gerencia[e.articulo_id]=r},null,8,["modelValue","onUpdate:modelValue"])])):m("",!0),!o.$page.props.isCompras&&e.solicitud_id==i(s).id_solicitud?(n(),d("th",It,[l(T,{checked:i(s).aprobados,"onUpdate:checked":a[0]||(a[0]=r=>i(s).aprobados=r),value:e.articulo_id},null,8,["checked","value"])])):m("",!0)]))),256))])]),t("div",Lt,[l(P,{onClick:_},{default:p(()=>[b(" Cancelar ")]),_:1}),l(w,{class:"ms-3"},{default:p(()=>[b("Aceptar")]),_:1})])],32)])]),_:1},8,["show"])],64))}};export{Gt as default};