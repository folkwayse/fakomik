<template>
  <div>
    <Notif />
    <MangaUpdate :page="parseInt($route.params.slug)" />
  </div>
</template>

<script setup>
import Notif from '~/components/Notif.vue';
import MangaUpdate from '~/components/MangaUpdate.vue';


</script>
