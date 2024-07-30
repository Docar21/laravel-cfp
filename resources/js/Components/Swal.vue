<template></template>
<script setup>
import { onMounted, onUpdated } from 'vue';
const props = defineProps({
    message: {
        type: Object,
        default: {}
    },
});

function showSwal() {
    Swal.fire(
        props.message.action,
        props.message.text,
        props.message.type
    )
}

onMounted(() => {
    if (props.message) {
        showSwal()
    }
})

onUpdated(() => {
    if (props.message) {
        showSwal()
    }
})
</script>