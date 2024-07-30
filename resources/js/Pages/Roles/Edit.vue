<script setup>
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import GeneralLayout from '@/Layouts/GeneralLayout.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DangerButton from '@/Components/PrimaryButton.vue';
import Modal from '@/Components/Modal.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import { computed, ref, watch } from 'vue';
import { Head, router, useForm } from '@inertiajs/vue3';
import Checkbox from '@/Components/Checkbox.vue';

const props = defineProps({
    permissionNames: {
        type: Object,
        default: () => ({}),
    },
    role: {
        type: Object,
        default: () => ({}),
    },
    permission: {
        type: Object,
        default: () => ({}),
    }
});

const RolPermiso = ref([]);
const m = ref(false);

const form = useForm({
    id: '',
    name: '',
    RolPermiso:[props.permissionNames],
});

function editaRol() {
    form.patch(route("roles.update"));
    form.reset();
    closeModal();
}

function verificar(elemento) {
    m.value=false;
    props.permissionNames.forEach(element => {
        if(elemento===element.permiso_id){
            m.value=true;
        }
    });
    return m.value;
  }
</script>

<template>

    <Head title="Dashboard-Admin" />

    <GeneralLayout>
        <!--pre>{{ $page.props.permission }}</pre-->
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
                                <strong>Editar Permisos de: {{ $page.props.role.name }} </strong>
                            </div>
                            <!---PrimaryButton @click="aggRol"
                                class="bg-slate-500  text-base/4 hover:text-white">
                                <svg class="h-4 w-4 mr-1 text-slate-100" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                    <line x1="12" y1="8" x2="12" y2="16" />
                                    <line x1="8" y1="12" x2="16" y2="12" />
                                </svg>
                                Nuevo
                            </PrimaryButton--->
                        </div>

                        <div class="text-gray-900 dark:text-gray-100">

                            <div class="flex flex-col overflow-x-auto">
                                <div class="sm:-mx-6 lg:-mx-8">
                                    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                        <div class="overflow-x-auto p-5">
                                            <pre>{{ $page.props.permissionNames }}</pre> 
                                            <form @submit.prevent="editaRol" class="px-8 pt-6 pb-8">
                                                <div v-for="permiso in $page.props.permission"
                                                    :key="$page.props.permission.id">
                                                    <Checkbox v-if="verificar(permiso.id)" :value="permiso.id" checked/>
                                                    <Checkbox v-else v-model:checked="form.RolPermiso" :value="permiso.id" />
                                                    <span class="ms-2 text-sm text-gray-600 dark:text-gray-400">{{
                                                        permiso.name
                                                        }}</span>
                                                </div>
                                                <div class="mt-6 flex justify-end">
                                                    <SecondaryButton @click="closeModal"> Cancelar </SecondaryButton>
                                                    <PrimaryButton class="ms-3">Aceptar</PrimaryButton>
                                                </div>
                                            </form>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </GeneralLayout>
    <!---VER MODAL--->


</template>