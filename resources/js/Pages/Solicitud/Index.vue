<script setup>
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'; /*Aqui cambio de Layout*/
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DangerButton from '@/Components/PrimaryButton.vue';
import Modal from '@/Components/Modal.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import { onMounted, ref, render, watch  } from 'vue';
import { Head, router, useForm, usePage, Link } from '@inertiajs/vue3';
import Checkbox from '@/Components/Checkbox.vue';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import Pagination from '@/Components/Pagination.vue';


DataTable.use(DataTablesCore);

const mostrarModalDetalles = ref(false);
const mostrarModalAprobar = ref(false);
const solicitudObjectDetalle = ref([]);
//const table=ref();
const page = usePage();
const form = useForm({
    id_solicitud: '',
    observaciones_gerencia: [],
    aprobados: [],
    isAdmin:page.props.isAdmin,
    isCompras:page.props.isCompras,
});
let search = ref('');
watch(search, (value) => {
    router.get(
        "solicitud",
        { search: value },
        {
            preserveState: true,
            replace: true,
        }
    );
});

const Nuevo = () => {
    form.get(route('solicitud.create'), {
        onFinish: () => form.reset(),
    });
};

const closeModal = () => {
    solicitudObjectDetalle.value=[];
    mostrarModalAprobar.value = false;
    mostrarModalDetalles.value = false;
    form.reset();
   
};
const verDetalles = (id) => {
    page.props.solicitudDetalle.forEach(solicitud_Detalle => {
        if (solicitud_Detalle.solicitud_id==id) {
            solicitudObjectDetalle.value.push(solicitud_Detalle);
        }
    });
    form.id_solicitud = id;
    mostrarModalDetalles.value = true;
}
const aprobarDetalles = (id) => {
    page.props.solicitudDetalle.forEach(solicitud_Detalle => {
        if (solicitud_Detalle.solicitud_id==id) {
            solicitudObjectDetalle.value.push(solicitud_Detalle);
        }
    });
    //console.log(solicitudObjectDetalle);
    form.id_solicitud = id;
    mostrarModalAprobar.value = true;
}
const GuardarAprobacion = () => {
    form.post(route('solicitud.update'), {
        onFinish: () => form.reset(),
    });
    closeModal();
    
    /*window.location.reload();    */
}

const aprobarSolicitud = (id) => {
    form.reset();
    form.id_solicitud = id;
    form.post(route('solicitud.aprobar'), {
        onFinish: () => form.reset(),
    });
    /*window.location.reload();    */

}

const negarSolicitud = (id) => {
    form.reset();
    form.id_solicitud = id;
    form.post(route('solicitud.negar'), {
        onFinish: () => form.reset(),
    });
}
const ExportarSolicitud = (id) => {
    //form.get(route.){}
    //redirect('/solicitud-excel');
    //form.get(router.get("/solicitud-export"));
   // window.open(`/url/to/excel/download?slug=${generalDetails.}`, '_blank')
   // window.open("/solicitud-export",'_blank');
   /*form.get(route('solicitud.msg'),{
    onFinish:()=>form.reset(),
   })*/
   form.reset();
   form.id_solicitud = id,
   form.get(route('solicitud.exportsolicitud'), {        
        onFinish: () => form.reset(),
    });
    //Inertia::location('/solicitud-export');
}

const botones=(id) => {    
    return {
        ver: '<button class="boton ver" dataId="'+id+'"><svg class="h-6 w-6 text-blue-800 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg></button>',
        editar: '<button class="boton editar" dataId="'+id+'"><svg class="h-6 w-6 text-blue-800 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>',
        aprobar: '<button class="boton aprobar" dataId="'+id+'"><svg class="h-6 w-6 text-blue-800 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>',
        negar: '<button class="boton negar" dataId="'+id+'"><svg class="h-6 w-6 text-blue-800 mr-3" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><circle cx="12" cy="12" r="9" /><path d="M10 10l4 4m0 -4l-4 4" /></svg></button>',
        excel:'<button><a href="/solicitud-export/'+id+'"  target="_blank"><svg class="h-6 w-6 text-blue-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg></a></button>'
        //excel: '<button class="boton excel" dataId="'+id+'"><svg class="h-6 w-6 text-blue-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg></button>'
    }
}
const columnas = [
    { data: null, render: function (data, type, row, meta) { return (meta.row + 1) } },
    { data: 'solicitud_id' },
    { data: 'fecha_realizada' },
    { data: 'fecha_deseada' },
    { data: 'estado' },
    { data: 'proyecto' },
    { data: 'usuario' },
    {
        data: null, orderable: false,
        render: function (data) {
            if (page.props.isAdmin) {
                let btns=botones(data.solicitud_id);
                return (btns['ver'] + btns['editar'] + btns['aprobar'] + btns['negar']+btns['excel']);
            } else if (page.props.isCompras) {
                let btns=botones(data.solicitud_id);
                return (btns['ver'] + btns['editar']+btns['excel']);
            } else if (page.props.isRt) {
                let btns=botones(data.solicitud_id);
                return (btns['ver']);
            } else {
                return ('Nulo');
            }
        },
    },
];
onMounted(() => {
    const botones = document.getElementsByClassName('boton');
    for (const element of botones) {
        let boton = element; 
        if (boton.classList.contains('ver')) {
            boton.addEventListener("click", function (event) {
                event.preventDefault();
                let id = boton.getAttribute("dataId"); 
                verDetalles(id);
            });
        }
        if (boton.classList.contains('editar')) {
            boton.addEventListener("click", function (event) {
                event.preventDefault();
                let id = boton.getAttribute("dataId"); 
                aprobarDetalles(id);
            });

        }
        if (boton.classList.contains('aprobar')) {
            boton.addEventListener("click", function (event) {
                event.preventDefault();
                let id = boton.getAttribute("dataId"); 
                aprobarSolicitud(id);
            });
        }
        if (boton.classList.contains('negar')) {
            boton.addEventListener("click", function (event) {
                event.preventDefault();
                let id = boton.getAttribute("dataId"); 
                negarSolicitud(id);
            });
        }
        if (boton.classList.contains('excel')) {
            boton.addEventListener("click", function (event) {
                event.preventDefault();
                let id = boton.getAttribute("dataId"); 
                ExportarSolicitud(id);
            });
        }
    }
})
</script>
<template>
    <Head title="Dashboard" />
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Solicitudes</h2>
        </template>
        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 dark:text-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="">
                        <div class="grid grid-flow-col grid-cols-3 p-5 justify-items-center ">
                           
                            <div class="">
                                <input type="text" v-model="search" placeholder="Search..."
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5" />
                            </div>
                            <div class="text-2xl">
                                <strong>Solicitudes</strong>
                            </div>
                            <PrimaryButton @click="Nuevo" class="bg-slate-500  text-base/4 hover:text-white">
                                <svg class="h-4 w-4 mr-1 text-slate-100" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                    <line x1="12" y1="8" x2="12" y2="16" />
                                    <line x1="8" y1="12" x2="16" y2="12" />
                                </svg>
                                Nuevo
                            </PrimaryButton>
                        </div>
                        <div class="text-gray-900 dark:text-gray-100">
                            <div class=" -mt-10 flex flex-col ">
                                <div class="sm:-mx-6 lg:-mx-8">
                                    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                        <div class=" p-5">
                                            <div class="bg-gray-50 overflow-hidden sm:py-12">
                                                <!--DataTable id="example" class="example display w-full border border-gray-400"
                                                    :data="$page.props.solicitudes" :columns="columnas"
                                                    :options="{ stateSave: true, responsive: true, autoWidth: false ,dom:'Bftip' }">
                                                    <thead>
                                                        <tr>

                                                            <th>ID</th>
                                                            <th>Id Solicitud</th>
                                                            <th>Fecha Realizada</th>
                                                            <th>Fecha Deseada</th>
                                                            <th>Estado</th>
                                                            <th>Proyecto</th>
                                                            <th>Usuario</th>
                                                            <th>Acciones</th>
                                                        </tr>
                                                    </thead>{{ $page.props.solicitudes }}
                                                </DataTable-->
                                                <table
                                                class="min-w-full text-start text-sm font-light text-surface dark:text-white">
                                                <thead
                                                    class="border-b border-neutral-200 font-bold text-xl text-gray-950 dark:border-white/10">
                                                    <tr
                                                        class="bg-slate-200 border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <th scope="col" class="py-3 px-6">Solcitud ID</th>
                                                        <th scope="col" class="py-3 px-6">Fecha Realizada</th>
                                                        <th scope="col" class="py-3 px-6">Fecha Deseada</th>
                                                        <th scope="col" class="py-3 px-6">Estado</th>
                                                        <th scope="col" class="py-3 px-6">Proyecto</th>
                                                        <th scope="col" class="py-3 px-6">Usuario</th>
                                                        <th scope="col" class="py-3 px-6">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr class="border-b dark:bg-gray-800 dark:border-gray-700"
                                                        v-for="solicitud in $page.props.solicitudes.data"
                                                        :key="$page.props.solicitudes.data.id">
                                                        <th scope="col" class="">
                                                            {{ solicitud.solicitud_id }}                                                        </th>
                                                        <th scope="col" class="">
                                                            {{ solicitud.fecha_realizada }}
                                                        </th>
                                                        <th scope="col" class="">
                                                            {{ solicitud.fecha_deseada }}
                                                        </th>
                                                        <th scope="col" class="">
                                                            {{ solicitud.estado }}
                                                        </th>
                                                        <th scope="col" class="">
                                                            {{ solicitud.proyecto }}
                                                        </th>
                                                        <th scope="col" class="">
                                                            {{ solicitud.usuario }}
                                                        </th>
                                                        <th scope="col" class="">
                                                            <button @click="verDetalles(solicitud.solicitud_id)"><svg class="h-6 w-6 text-blue-800 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg></button>
                                                            <button @click="aprobarDetalles(solicitud.solicitud_id)"><svg class="h-6 w-6 text-blue-800 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                                                            <button v-if="$page.props.isAdmin" @click="aprobarSolicitud(solicitud.solicitud_id)"><svg class="h-6 w-6 text-blue-800 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
                                                            <button v-if="$page.props.isAdmin" @click="negarSolicitud(solicitud.solicitud_id)"><svg class="h-6 w-6 text-blue-800 mr-3" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><circle cx="12" cy="12" r="9" /><path d="M10 10l4 4m0 -4l-4 4" /></svg></button>
                                                            <button><a :href="'/solicitud-export/'+solicitud.solicitud_id"  target="_blank"><svg class="h-6 w-6 text-blue-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg></a></button>

                                                            
                                                        </th>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <Pagination class="mt-6" :links="$page.props.solicitudes.links" />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>

    <Modal :max-width="''" :show="mostrarModalDetalles" @close="closeModal">
        <!---MODAL AGREGAR--><!---MODAL AGREGAR--><!---MODAL AGREGAR--><!---MODAL AGREGAR--><!---MODAL AGREGAR-->
        <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                Detalles Solicitud {{ form.id_solicitud }}
            </h2>
        </div>
        <div class="p-6">
            <table class="min-w-full text-start text-sm font-light text-surface dark:text-white">
                <thead class="border-b border-neutral-200 font-bold text-xl text-gray-950 dark:border-white/10">
                    <tr class="bg-slate-200 border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="col" class="py-3 px-6">Descripcion</th>
                        <th scope="col" class="py-3 px-6">Cantidad</th>
                        <th scope="col" class="py-3 px-6">Comentarios</th>
                        <th scope="col" class="py-3 px-6">Observaciones</th>
                        <!--th v-if="$page.props.isRt && $page.props.isAdmin" scope="col" class="py-3 px-6">Observaciones Compras</th-->
                        <th scope="col" class="py-3 px-6">Observaciones Compras</th>
                        <th scope="col" class="py-3 px-6">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="solicitud_detalle in solicitudObjectDetalle" class="border-b dark:bg-gray-800 dark:border-gray-700" >
                        <th scope="col" class="py-3 px-6">
                            {{ solicitud_detalle.descripcion }}</th>
                        <th scope="col" class="py-3 px-6">
                            {{ solicitud_detalle.cantidad }}</th>
                        <th scope="col" class="py-3 px-6">
                            {{ solicitud_detalle.observaciones }}</th>
                        <th scope="col" class="py-3 px-6" >
                            {{ solicitud_detalle.obs_gerencia }}
                        </th>
                        <th scope="col" class="py-3 px-6">
                            {{ solicitud_detalle.obs_compras }}
                        </th>
                        <th scope="col" class="py-3 px-6">
                            {{ solicitud_detalle.estado_articulo }}
                        </th>
                    </tr>
                </tbody>
            </table>
            <div class="mt-6 flex justify-end">
                <PrimaryButton @click="closeModal" class="ms-3">Aceptar</PrimaryButton>
            </div>
        </div>
    </Modal>

    <Modal :max-width="'gr'" :show="mostrarModalAprobar" @close="closeModal">
        <!---MODAL AGREGAR--><!---MODAL AGREGAR--><!---MODAL AGREGAR--><!---MODAL AGREGAR--><!---MODAL AGREGAR-->
        <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                Solicitud {{ form.id_solicitud }}
            </h2>
        </div>
        <div class="p-6">
            <form @submit.prevent="GuardarAprobacion">
                <table class="min-w-full text-start text-sm font-light text-surface dark:text-white">
                    <thead class="border-b border-neutral-200 font-bold text-xl text-gray-950 dark:border-white/10">
                        <tr class="bg-slate-200 border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="col" class="py-3 px-6">Descripcion</th>
                            <th scope="col" class="py-3 px-6">Cantidad</th>
                            <th scope="col" class="py-3 px-6">Comentarios</th>
                            <th scope="col" class="py-3 px-6">Observaciones</th>
                            <th scope="col" class="py-3 px-6">Aprobado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(solicitud_detalle,index) in solicitudObjectDetalle"
                            class="border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="col"
                                class="py-3 px-6">{{
                                    solicitud_detalle.descripcion }}</th>
                            <th scope="col"
                                class="py-3 px-6">{{
                                    solicitud_detalle.cantidad }}</th>
                            <th scope="col"
                                class="py-3 px-6">{{
                                    solicitud_detalle.observaciones }}</th>
                            <th scope="col"
                                class="py-3 px-6">
                                <TextInput id="observaciones" type="text"
                                    v-model="form.observaciones_gerencia[index]" />
                            </th>
                            <th v-if="!$page.props.isCompras && solicitud_detalle.solicitud_id == form.id_solicitud">
                                <Checkbox v-model:checked="form.aprobados" :value="solicitud_detalle.articulo_id" />
                            </th>
                        </tr>
                    </tbody>
                </table>
                <div class="mt-6 flex justify-end">
                    <SecondaryButton @click="closeModal"> Cancelar </SecondaryButton>
                    <PrimaryButton class="ms-3">Aceptar</PrimaryButton>
                </div>
            </form>
        </div>


    </Modal>
</template>
