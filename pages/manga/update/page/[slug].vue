<template>
    <div>
      <Notif />
      <MangaUpdate
      :page = "parseInt($route.params.slug)"
      /> 
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    title: "Fakomik Cloud Home - Update Terbaru Manga Manhwa Manhua",
  });
  import Notif from "~/components/Notif.vue";
  import MangaUpdate from "~/components/MangaUpdate.vue";
  </script>
  