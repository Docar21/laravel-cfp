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
import { Head, router, useForm } from '@inertiajs/vue3';
import Checkbox from '@/Components/Checkbox.vue';
//import AuthenticatedLayout from 'vendor/laravel/breeze/stubs/inertia-vue-ts/resources/js/Layouts/AuthenticatedLayout.vue';


const props = defineProps({
    usuarios: {
        type: Object,
        default: () => ({}),
    },
    permisos: {
        type: Object,
        default: () => ({}),
    },
    roles: {
        type: Object,
        default: () => ({}),
    },
    filters: {
        type: Object,
        default: () => ({}),
    },
    allRolesPermission:{
        type: Object,
        default: () => ({}),
    }
});

const RolPermiso = ref();

function idpermisos(id){
    props.allRolesPermission.forEach(element=>{
        if (element.id===id) {
            element.roles.forEach(rol=>{
                RolPermiso.value=rol.id;
                console.log(RolPermiso.value);
                form.RolPermiso=RolPermiso.value;
            })            
        }
    });
    
}


let search = ref(props.filters.search);
watch(search, (value) => {
    router.get(
        "roles",
        { search: value },
        {
            preserveState: true,
            replace: true,
        }
    );
});

const form = useForm({
    id: '',
    name: '',
    RolPermiso:'',
});

const mostrarModal = ref(false);
const verModal = ref(false);
const mostrarModalEdit = ref(false);
const confirmarEliminar = ref(false);


const Nuevo = () => {
    mostrarModal.value = true;

};

const modalEliminar = (id) => {
    form.id = id;
    idpermisos(id);
    confirmarEliminar.value = true;
}
const modalEditar = (id, name) => {
    form.id = id;
    form.name = name;
    idpermisos(id);
    mostrarModalEdit.value = true;
}

const closeModal = () => {
    mostrarModal.value = false;
    confirmarEliminar.value = false;
    mostrarModalEdit.value = false;
    verModal.value=false;
    RolPermiso.value='';
    form.reset();
};

const deleteRol = () => {
    form.delete(route('admin.delete'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onFinish: () => form.reset(),
    });
};

function editaRol() {
    form.patch(route("admin.update"));
    form.reset();
    closeModal();
}
const nuevo = () => {
    form.post(route('admin.store'), {
        onSuccess: () => closeModal(),
        onFinish: () => form.reset(),
    });
};

</script>

<template>

    <Head title="Dashboard-Admin" />
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>
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
                                <strong>Usuarios</strong>
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
                        </div>

                        <div class="text-gray-900 dark:text-gray-100">
                            <div class="flex flex-col overflow-x-auto">
                                <div class="sm:-mx-6 lg:-mx-8">
                                    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                        <div class="overflow-x-auto p-5">
                                            <table
                                                class="min-w-full text-start text-sm font-light text-surface dark:text-white">
                                                <thead
                                                    class="border-b border-neutral-200 font-bold text-xl text-gray-950 dark:border-white/10">
                                                    <tr
                                                        class="bg-slate-200 border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <th scope="col" class="py-3 px-6">Nombre de Usuario</th>
                                                        <th scope="col" class="py-3 px-6">Rol</th>
                                                        <th scope="col" class="py-3 px-6">Estado</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr class="border-b dark:bg-gray-800 dark:border-gray-700"
                                                        v-for="usuario in $page.props.allRolesPermission"
                                                        :key="$page.props.usuarios.id">
                                                        <th scope="col" class="py-3 px-6">
                                                            {{ usuario.name }}
                                                        </th>
                                                        <th scope="col" class="py-3 px-6">
                                                            <div v-for="rol in usuario.roles" >
                                                                {{rol.name}}
                                                            </div>
                                                        </th>
                                                        <th>
                                                            <PrimaryButton class="bg-slate-200"
                                                                @click="modalEditar(usuario.id, usuario.name)">
                                                                <svg class="h-6 w-6 text-green-500" fill="none"
                                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                                        stroke-width="2"
                                                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                </svg>
                                                            </PrimaryButton>
                                                            <PrimaryButton class=" ms-3 bg-slate-200"
                                                                @click="modalVer(usuario.id, usuario.name)">
                                                                <svg class="h-6 w-6 text-sky-400" fill="none"
                                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                                        stroke-width="2"
                                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                                        stroke-width="2"
                                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                </svg>
                                                            </PrimaryButton>
                                                            <DangerButton class="ms-3 bg-slate-200"
                                                                @click="modalEliminar(usuario.id)">
                                                                <svg class="h-6 w-6 text-red-500" viewBox="0 0 24 24"
                                                                    fill="none" stroke="currentColor" stroke-width="2"
                                                                    stroke-linecap="round" stroke-linejoin="round">
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
                    </div>

                </div>
            </div>
        </div>
    </AuthenticatedLayout>
    <!---VER MODAL--->
    <Modal :show="verModal" @close="closeModal">
        <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                Mostrando permisos de            </h2>
            <div class="mt-6 flex justify-end">
               
                <SecondaryButton @click="closeModal"> Cancelar </SecondaryButton>
                <PrimaryButton class="ms-3">Aceptar</PrimaryButton>
            </div>
        </div>

    </Modal>
    <!--Asignar Permiso a Rol-->
    <Modal :show="mostrarModalEdit" @close="closeModal">
        <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                Editar Rol a {{ form.name }}
            </h2>
            <form @submit.prevent="editaRol" class="px-8 pt-6 pb-8">
                <div v-for="rol in $page.props.roles" :key="$page.props.roles.id">
                    <input v-model="form.RolPermiso" :value="rol.id" type="radio" name="rol" id="rol" >
                    <!--Checkbox v-model:checked="form.RolPermiso" :value="rol.id"/-->
                    <span class="ms-2 text-sm text-gray-600 dark:text-gray-400">{{ rol.name }}</span>
                </div>
                <!--div>
                    <InputLabel for="name" value="Nombre del Rol" />

                    <TextInput id="name" type="text" class="mt-1 block w-full" v-model="form.name" required autofocus
                        autocomplete="name" :value=form.name />

                    <InputError class="mt-2" :message="form.errors.name" />
                </div-->
                <div class="mt-6 flex justify-end">
                    <SecondaryButton @click="closeModal"> Cancelar </SecondaryButton>
                    <PrimaryButton class="ms-3">Aceptar</PrimaryButton>
                </div>
            </form>
        </div>

    </Modal>

    <Modal :show="mostrarModal" @close="closeModal">

        <!---MODAL AGREGAR--><!---MODAL AGREGAR--><!---MODAL AGREGAR--><!---MODAL AGREGAR--><!---MODAL AGREGAR-->

        <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                Agrega un nuevo Usario
            </h2>
            <form @submit.prevent="nuevo" class="px-8 pt-6 pb-8">
                <div>
                    <InputLabel for="name" value="Nombre del Rol" />

                    <TextInput id="name" type="text" class="mt-1 block w-full" v-model="form.name" required autofocus
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
    <!---MODAL ELIMINAR--><!---MODAL ELIMINAR--><!---MODAL ELIMINAR--><!---MODAL ELIMINAR--><!---MODAL ELIMINAR-->
    <Modal :show="confirmarEliminar" @close="closeModal">
        <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                ¿Estas Seguro que deseas eliminar este rol?
            </h2>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Esta accion es irreversible.
            </p>
            <div class="mt-6 flex justify-end">
                <form @submit.prevent="deleteRol" class="px-8 pt-6 pb-8">
                <div v-for="rol in $page.props.roles" :key="$page.props.roles.id">
                    <!--input type="radio" name="rol" id="rol" :v-model:checked="form.RolPermiso"-->
                    <Checkbox v-model:checked="form.RolPermiso" :value="rol.id"/>
                    <span class="ms-2 text-sm text-gray-600 dark:text-gray-400">{{ rol.name }}</span>
                </div>
            
                <SecondaryButton @click="closeModal"> Cancelar </SecondaryButton>
                <DangerButton class="ms-3">
                    Eliminar Rol
                </DangerButton>
            </form>
            </div>
        </div>
    </Modal>
</template>