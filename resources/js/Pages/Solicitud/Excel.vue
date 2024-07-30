<script setup>
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'; /*Aqui cambio de Layout*/
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DangerButton from '@/Components/PrimaryButton.vue';
import Modal from '@/Components/Modal.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import { onMounted, ref, render, watch } from 'vue';
import { Head, router, useForm, usePage } from '@inertiajs/vue3';
import Checkbox from '@/Components/Checkbox.vue';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';

</script>
<template>
    <Head title="Dashboard" />
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Solicitudes</h2>
        </template>
        <div class="py-12">
            <!--pre>{{ $page.props.isAdmin }}</pre-->
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 dark:text-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="">
                        <div class="grid grid-flow-col grid-cols-3 p-5 justify-items-center ">
                            <div></div>
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
                            <div class=" -mt-10 flex flex-col overflow-x-auto">
                                <div class="sm:-mx-6 lg:-mx-8">
                                    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                        <div class="overflow-x-auto p-5">
                                            <div class="bg-gray-50 overflow-hidden sm:py-12">
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

</template>
