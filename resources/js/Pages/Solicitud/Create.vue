<script setup>
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'; /*Aqui cambio de Layout*/
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DangerButton from '@/Components/PrimaryButton.vue';
import Modal from '@/Components/Modal.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import { onMounted, ref, watch } from 'vue';
import { Head, router, useForm, usePage } from '@inertiajs/vue3';
import Checkbox from '@/Components/Checkbox.vue';
import Pagination from '@/Components/Pagination.vue';


const page = usePage();

const props = defineProps({
    articulos: {
        type: Object,
        default: () => ({}),
    },
    filters: {
        type: Object,
        default: () => ({}),
    },
    proyectos: {
        type: Object,
        default: () => ({}),
    },
});

const mostrarModal = ref(false);
let lista = ref([]);
let mess = ref();

let search = ref(props.filters.search);
watch(search, (value) => {
    router.get(
        "solicitud-crear",
        { search: value },
        {
            preserveState: true,
            replace: true,
        }
    );
});
const form = useForm({
    usuario: page.props.auth.user.id,
    proyecto: '',
    fecha_deseada:'',
    cantidad: '',
    comentarios: '',
    coleccion:[],
});

const AgregarALista = (id, num, desc, cant, comn) => {
    var c = 1;
    lista.value.forEach(element => {
        if (element.id == id) {
            c++;
            mess.value = {msg:'El item que intentó agregar ya pertenece a la lista',id:1};
            //tipo.value=2;

        }
    });
    if (c == 1) {
       
        lista.value.push({ id, num, desc, cant, comn });
        //form.coleccion=lista;
        console.log(form.coleccion);
        mess.value = {msg:'Producto Agregado Exitosamente',id:2};
        //tipo.value=1;
    }
    form.reset();
};

const Guardar = () => {
    //router.post('solicitud',{form,lista});
    form.coleccion=lista;
    form.post(route('solicitud.store'), {
        onFinish: () => form.reset(),
    });
};

let exclude = []

const Eliminar = (id) => {
    exclude.push(id)
    lista.value = lista.value.filter((item) => !exclude.includes(item.id))
    //form.coleccion=lista;
    exclude = [];
}

const closeModal = () => {
    mostrarModal.value = false;
    form.reset();
};
</script>

<template>

    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Solicitudes -> Crear</h2>
        </template>
        <div class="py-8">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="overflow-hidden sm:rounded-lg">
                    <div class="text-2xl">
                            <strong>Crear Solicitud</strong>
                        </div>
                    <div class="grid grid-flow-col grid-cols-3 p-5 justify-items-start align-middle">
                        <!--div class="">
                                <input type="text" v-model="search" placeholder="Search..."
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5" />
                            </div-->
                        <div class="grid grid-flow-row">
                            <InputLabel for="name" value="Solicitud desde:" />
                            <select name="proyecto" v-model="form.proyecto">
                                <option v-for="proyecto in $page.props.proyectos" :value="proyecto.id">
                                    {{ proyecto.name }}</option>
                            </select>
                        </div>
                        <div>
                            <InputLabel for="fecha" value="Fecha deseada de entrega:" />
                            <TextInput id="fecha" type="date" v-model="form.fecha_deseada" pattern="\d{4}-\d{2}-\d{2}" required autofocus/>
                        </div>
                        <div>
                        </div>
                        <PrimaryButton @click="Guardar" class="bg-slate-500 text-base/4 hover:text-white">
                            <svg class="h-4 w-4 mr-1 text-slate-100" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <line x1="12" y1="8" x2="12" y2="16" />
                                <line x1="8" y1="12" x2="16" y2="12" />
                            </svg>
                            Guardar Solicitud
                        </PrimaryButton>
                    </div>
                </div>
                <div class="flex flex-row gap-4">
                    <div class="basis-1/2 p-5 bg-white rounded-sm ">
                        <div class="grid grid-flow-row">
                            <form @submit.prevent="s">
                                <div class="grid grid-flow-col gap-2">
                                    <div>
                                        <InputLabel for="name" value="Descripcion del Articulo" />
                                        <input type="text" v-model="search" placeholder="Buscar..."
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                    </div>
                                    <div>
                                        <InputLabel for="cantidad" value="Cantidad" />
                                        <TextInput id="cantidad" type="text"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5"
                                            v-model="form.cantidad" required autofocus autocomplete="cantidad" />
                                    </div>
                                    <div>
                                        <InputLabel for="comentarios" value="comentarios" />
                                        <TextInput id="comentarios" type="text"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            v-model="form.comentarios" required autofocus autocomplete="comentarios" />
                                    </div>
                                    <!--div>
                                        <TextInput id="usuario" class="hidden" type="text" v-model="form.usuario" :value="$page.props.auth.user.id"/>
                                    </div-->
                                </div>
                                <br>
                                <table class="min-w-full text-start text-sm font-light text-surface dark:text-white">
                                    <thead
                                        class="border-b border-neutral-200 font-bold text-sm text-gray-950 dark:border-white/10">
                                        <tr class="bg-slate-200 border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="col" class="py-3 px-6">Numero de Articulo</th>
                                            <th scope="col" class="py-3 px-6">Descripcion</th>
                                            <th scope="col" class="py-3 px-6">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="border-b dark:bg-gray-800 dark:border-gray-700"
                                            v-for="articulo in $page.props.articulos.data"
                                            :key="$page.props.articulos.data.id">
                                            <th scope="col" class="">
                                                {{ articulo.numero_articulo }}
                                            </th>
                                            <th scope="col" class="">
                                                {{ articulo.descripcion_articulo }}
                                            </th>

                                            <th>
                                                <PrimaryButton class="bg-slate-200"
                                                    v-if="form.cantidad && form.comentarios"
                                                    @click="AgregarALista(articulo.id, articulo.numero_articulo, articulo.descripcion_articulo, form.cantidad, form.comentarios)">
                                                    <svg class="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24"
                                                        stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </PrimaryButton>

                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                                <Pagination class="mt-6" :links="$page.props.articulos.links" />
                            </form>
                        </div>
                    </div>
                    <div class="basis-1/2 bg-white rounded-sm p-5">
                        <div class="flex flex-col">
                            <div v-if="mess">
                                <div v-if="mess.id==1"
                                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                role="alert">

                                <span class="block sm:inline">{{ mess.msg }}</span>
                                <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                                    <button @click="mess = null">
                                        <svg class="fill-current h-6 w-6 text-red-500" role="button"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <title>Close</title>
                                            <path
                                                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                                        </svg>
                                    </button>
                                </span>
                            </div>
                            <div v-if="mess.id==2"
                                class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                                role="alert">

                                <span class="block sm:inline">{{ mess.msg }}</span>
                                <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                                    <button @click="mess = null">
                                        <svg class="fill-current h-6 w-6 text-green-500" role="button"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <title>Close</title>
                                            <path
                                                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                                        </svg>
                                    </button>
                                </span>
                            </div>
                            </div>
                            <br>
                            <table class="min-w-full text-start text-sm font-light text-surface dark:text-white">
                                <thead
                                    class="border-b border-neutral-200 font-bold text-sm text-gray-950 dark:border-white/10">
                                    <tr class="bg-slate-200 border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="col" class="py-3 px-6">Número de artículo</th>
                                        <th scope="col" class="py-3 px-6">Descripción de artículo</th>
                                        <th scope="col" class="py-3 px-6">Cantidad Requerida</th>
                                        <th scope="col" class="py-3 px-6">Comentarios</th>
                                        <th scope="col" class="py-3 px-6">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="border-b dark:bg-gray-800 dark:border-gray-700" v-for="item in lista"
                                        :key="item.id">
                                        <th scope="col" class="py-3 px-6">
                                            {{ item.num }}
                                        </th>
                                        <th scope="col" class="py-3 px-6">
                                            {{ item.desc }}
                                        </th>
                                        <th scope="col" class="py-3 px-6">
                                            {{ item.cant }}
                                        </th>
                                        <th scope="col" class="py-3 px-6">
                                            {{ item.comn }}
                                        </th>
                                        <th>
                                            <DangerButton class="ms-3 bg-slate-200" @click="Eliminar(item.id)">
                                                <svg class="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round">
                                                    <polyline points="3 6 5 6 21 6" />
                                                    <path
                                                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                    <line x1="10" y1="11" x2="10" y2="17" />
                                                    <line x1="14" y1="11" x2="14" y2="17" />
                                                </svg>
                                            </DangerButton>
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>
    </AuthenticatedLayout>


    <Modal :max-width="''" :show="mostrarModal" @close="closeModal">
        <!---MODAL AGREGAR--><!---MODAL AGREGAR--><!---MODAL AGREGAR--><!---MODAL AGREGAR--><!---MODAL AGREGAR-->
        <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                Agrega un nuevo Articulo
            </h2>
            <form @submit.prevent="nuevo" class="px-8 pt-6 pb-8">
                <div>
                    <div>

                    </div>

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
</template>
