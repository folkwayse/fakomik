<template>
    <div>
      <Notif />
      <MangaBaru
        :page = "parseInt($route.params.slug)"
      /> 
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    title: "Fakomik Cloud Home - Update Terbaru Manga Manhwa Manhua",
  });
  import Notif from "~/components/Notif.vue";
  import MangaBaru from "~/components/MangaBaru.vue";
  </script>
  