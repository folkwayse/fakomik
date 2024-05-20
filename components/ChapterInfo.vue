<template>
  <section>
    <div class="container mx-auto p-4 lg:w-2/3">
      
      <Panel v-if="data">
        <template #header>
          <h1 class="text-2xl font-bold">
            {{ data.Chapter.name }}
          </h1>
        
        </template>
        <template #footer>
          <h3>
            Baca manga {{ data.Chapter.name }}  terbaru di
            Fakomik ID. Manga {{ data.Chapter.manga.title }} bahasa Indonesia selalu update di
            Fakomik ID. Jangan lupa membaca update manga lainnya ya. Daftar
            koleksi manga Fakomik ID ada di menu Daftar Manga.
          </h3>
        </template>
      </Panel>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const config = useRuntimeConfig();
const { params } = useRoute();
const slug = params.slug;
const { data, pending, error, refresh } = useAsyncData(
  'chapter',
  () => $fetch(`${config.public.baseURL}chapters/gettitle/${slug}`)
);


</script>
