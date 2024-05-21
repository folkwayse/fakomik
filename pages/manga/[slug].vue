<template>
  <article>
 
    <DetailManga
    :slug="slug"
    />
   
    <MangaRekomendasi/>
  </article>
</template>

<script setup>

import DetailManga from "~/components/DetailManga.vue";

import MangaRekomendasi from "~/components/MangaRekomendasi.vue";

// get router params
const route = useRoute();
const slug = route.params.slug;

</script>
