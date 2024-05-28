<template>
  <section>
    <div class="container mx-auto p-4 lg:w-2/3">
      <Breadcumbs :title="data.Chapter.name" :slug="`chapters/${data.Chapter.slug}`"/>
      <div class="shadow-md rounded-lg p-6">
        <div v-if="data">
          <h1 class="text-2xl font-bold mb-4">{{ data.Chapter.name }}</h1>
          <div>
            <h3 class="text-sm">
              Baca manga {{ data.Chapter.name }} terbaru di Fakomik ID. Manga {{ data.Chapter.manga.title }} bahasa Indonesia selalu update di Fakomik ID. Jangan lupa membaca update manga lainnya ya. Daftar koleksi manga Fakomik ID ada di menu Daftar Manga.
            </h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Breadcumbs from "~/components/Breadcumbs.vue";
import { ref } from "vue";
// implementasi watch history dan add views
import {useHistoryStore} from "~/store/historyStore";

const historyStore = useHistoryStore();



const config = useRuntimeConfig();
const { params } = useRoute();
const slug = params.slug;
const { data, pending, error, refresh } = useAsyncData(
  'chapter',
  async () =>{
    const data = await $fetch(`${config.public.baseURL}chapters/gettitle/${slug}`);
    historyStore.addHistory(slug, data.Chapter.name);
    return data
  }
);



</script>
