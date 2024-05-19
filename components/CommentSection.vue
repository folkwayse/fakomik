<template>
    <section class="container mx-auto w-full">
        <DisqusComments :identifier="path" />
    </section>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const path = route.path; // Mengambil path dari route saat ini
</script>
