<template>
    <div>
      <Notif />
      <MangaBaru
        :page = "parseInt($route.params.slug)"
      /> 
    </div>
  </template>
  
  <script setup>


  import Notif from "~/components/Notif.vue";
  import MangaBaru from "~/components/MangaBaru.vue";
  </script>
  