<script setup>
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'; /*Aqui cambio de Layout*/
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DangerButton from '@/Components/PrimaryButton.vue';
import Modal from '@/Components/Modal.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import { onMounted, onUpdated, ref } from 'vue';
import { Head, useForm, usePage } from '@inertiajs/vue3';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';

DataTable.use(DataTablesCore);

const page = usePage();

const mostrarModal = ref(false);
const verModal=ref(false);
const mostrarModalImportar=ref(false);

const form = useForm({
    numero_articulo: '',
    descripcion_articulo: '',
});
const formImport=useForm({
    excel:'',
})

const Nuevo = () => {
    mostrarModal.value = true;

};
const verArticulo=(id)=>{
    page.props.articulos.forEach(articulo => {
        if (articulo.id==id) {
            form.numero_articulo=articulo.numero_articulo;
            form.descripcion_articulo=articulo.descripcion_articulo;
        }
    });
    verModal.value=true;
}

const Importar=()=>{
    mostrarModalImportar.value=true;
}

const closeModal = () => {
    mostrarModal.value = false;
    mostrarModalImportar.value=false;
    verModal.value=false;
    form.reset();
};
const nuevo = () => {
    form.post(route('articulo.store'), {
        onSuccess: () => closeModal(),
        onFinish: () => form.reset(),
    });
};
const importar_excel = () => {
    formImport.post(route('articulo.import_articulos'), {
        //forceFormData: true, 
        onSuccess: () => closeModal(),
        onFinish: () => formImport.reset(),
    });
};

const accion_boton =()=>{
    const botones = document.getElementsByClassName('boton');
    for (const element of botones) {
        let boton = element; 
        if (boton.classList.contains('ver')) {
            boton.addEventListener("click", function (event) {
                event.preventDefault();
                let id = boton.getAttribute("dataId"); 
                verArticulo(id);
            });
        }
        if (boton.classList.contains('editar')) {
            boton.addEventListener("click", function (event) {
                event.preventDefault();
                let id = boton.getAttribute("dataId"); 
                //editarArticulo(id);
            });
        }
        if (boton.classList.contains('eliminar')) {
            boton.addEventListener("click", function (event) {
                event.preventDefault();
                let id = boton.getAttribute("dataId"); 
                //eliminarArticulo(id);
            });
        }
    }
}

const botones=(id) => {    
    return {
        ver: '<button class="boton ver" @click="'+verArticulo(id)+'"><svg class="h-6 w-6 text-blue-800 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg></button>',
        editar: '<button class="boton editar" dataId="'+id+'"><svg class="h-6 w-6 text-blue-800 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>',
        eliminar: '<button class="boton eliminar" dataId="'+id+'"><svg class="h-6 w-6 text-blue-800 mr-3"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polyline points="3 6 5 6 21 6" />  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" /></svg></button>',   
    }
}

const columnas = [
    { data: null, render: function (data, type, row, meta) { return (meta.row + 1) } },
    { data: 'numero_articulo' },
    { data: 'descripcion_articulo' },
    {
        data: null, orderable: false,
        render: function (data) {
            if (page.props.isAdmin) {
                let btns=botones(data.id);
                return (btns['ver'] + btns['editar']+ btns['eliminar']);
            } else if (page.props.isCompras) {
                let btns=botones(data.id);
                return (btns['ver'] + btns['editar']+btns['eliminar']);
            } else if (page.props.isRt) {
                let btns=botones(data.id);
                return (btns['ver']);
            } else {
                return ('Nulo');
            }
        },
    },
];

onMounted(() => {
    //accion_boton();
})


</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Articulos</h2>
        </template>
        
        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 dark:text-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="">
                        <div class="grid grid-flow-col grid-cols-3 mt-5 mr-5 ml-5 justify-items-center ">
                            <span></span>

                            <div class="text-2xl">
                                <strong>Articulos</strong>
                            </div>
                            <PrimaryButton @click="Nuevo"
                                class="bg-slate-500  text-base/4 hover:text-white">
                                <svg class="h-4 w-4 mr-1 text-slate-100" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                    <line x1="12" y1="8" x2="12" y2="16" />
                                    <line x1="8" y1="12" x2="16" y2="12" />
                                </svg>
                                Nuevo
                            </PrimaryButton>
                            <PrimaryButton @click="Importar"
                                class="bg-green-900  text-base/4 hover:text-white">
                                <svg class="h-6 w-6 text-green-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />  <polyline points="7 9 12 4 17 9" />  <line x1="12" y1="4" x2="12" y2="16" /></svg>
                                XLSX
                            </PrimaryButton>
                        </div>
                        <div class="text-gray-900 dark:text-gray-100">
                            <div class="flex flex-col">
                                <div class="sm:-mx-6 lg:-mx-8">
                                    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                        <div class="overflow-x-auto p-3">
                                            <!--div class="bg-gray-50 overflow-hidden sm:py-12"></div-->
                                                <DataTable id="example"  class="example display w-full border border-gray-400"
                                                    :data="$page.props.articulos" :columns="columnas"
                                                    :options="{ stateSave: true, responsive: true, autoWidth: false }">
                                                    <thead>
                                                        <tr>
                                                            <th>ID- Numero</th>
                                                            <th>Numero de Articulo</th>
                                                            <th>Descripcion de articulos</th>
                                                            <th>Acciones</th>
                                                        </tr>
                                                    </thead>
                                                </DataTable>
                                            
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


<Modal :show="mostrarModal" @close="closeModal">
<!---MODAL AGREGAR--><!---MODAL AGREGAR--><!---MODAL AGREGAR--><!---MODAL AGREGAR--><!---MODAL AGREGAR-->
<div class="p-6">
    <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
        Agrega un nuevo Articulo
    </h2>
    <form @submit.prevent="nuevo" class="px-8 pt-6 pb-8">
        <div>
            <InputLabel for="name" value="Numero del Articulo" />
            <TextInput id="name" type="text" class="mt-1 block w-full" v-model="form.numero_articulo" required autofocus
                autocomplete="name" />
            <InputLabel for="name" value="Descripcion del Articulo" />
            <TextInput id="name" type="text" class="mt-1 block w-full" v-model="form.descripcion_articulo" required autofocus
                autocomplete="name" />

            <InputError class="mt-2" :message="form.errors.name" />
        </div>
        <div class="mt-6 flex justify-end">
            <SecondaryButton @click="closeModal"> Cancelar </SecondaryButton>
            <PrimaryButton class="ms-3">Aceptar</PrimaryButton>
        </div>
    </form>
</div>
<!--AGREGAR ROL-->

</Modal>

<Modal :show="verModal" @close="closeModal">
<!---MODAL AGREGAR--><!---MODAL AGREGAR--><!---MODAL AGREGAR--><!---MODAL AGREGAR--><!---MODAL AGREGAR-->
<div class="p-6">
    <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
        {{ form.numero_articulo }} <br>
        {{ form.descripcion_articulo }}
    </h2>
    <!--form class="px-8 pt-6 pb-8">
        <div>
            <InputLabel for="name" value="Numero del Articulo" />
            <TextInput id="name" type="text" class="mt-1 block w-full" v-model="form.numero_articulo" required autofocus
                autocomplete="name" />
            <InputLabel for="name" value="Descripcion del Articulo" />
            <TextInput id="name" type="text" class="mt-1 block w-full" v-model="form.descripcion_articulo" required autofocus
                autocomplete="name" />

            <InputError class="mt-2" :message="form.errors.name" />
        </div>
        <div class="mt-6 flex justify-end">
            <SecondaryButton @click="closeModal"> Cancelar </SecondaryButton>
            <PrimaryButton class="ms-3">Aceptar</PrimaryButton>
        </div>
    </form-->
</div>
<!--AGREGAR ROL-->

</Modal>

<Modal :show="mostrarModalImportar" @close="closeModal">
<!---MODAL AGREGAR--><!---MODAL AGREGAR--><!---MODAL AGREGAR--><!---MODAL AGREGAR--><!---MODAL AGREGAR-->
<div class="p-6">
    <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
        Agrega un nuevo Articulo
    </h2>
    <form @submit.prevent="importar_excel" class="px-8 pt-6 pb-8">
        <div>
            <InputLabel for="name" value="Seleccione el Archivo de Excel" />
            <TextInput id="name" type="file" class="mt-1 block w-full" @input="formImport.excel = $event.target.files[0]"  required autofocus
                autocomplete="name" />
                <progress v-if="formImport.progress" :value="formImport.progress.percentage" max="100">
                 {{ formImport.progress.percentage }}%
            </progress>
            <InputError class="mt-2" :message="formImport.errors.name" />
        </div>
        <div class="mt-6 flex justify-end">
            <SecondaryButton @click="closeModal"> Cancelar </SecondaryButton>
            <PrimaryButton class="ms-3">Aceptar</PrimaryButton>
        </div>
    </form>
</div>
<!--AGREGAR ROL-->

</Modal>
</template>


