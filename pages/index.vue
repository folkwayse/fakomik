<template>
  <div>
    <Notif />
    <MangaUpdate />
    <MangaBaru />
  </div>
</template>

<script setup>
definePageMeta({
  title: "Fakomik Cloud Home - Update Terbaru Manga Manhwa Manhua",
});
import Notif from "~/components/Notif.vue";
import MangaUpdate from "~/components/MangaUpdate.vue";
import MangaBaru from "~/components/MangaBaru.vue";
</script>
