<template>
<section class="container mx-auto p-4 lg:w-2/3">
  <Listbox
    v-model="selectedCity"
    :options="cities"
    filter
    listStyle="max-height:250px"
    optionLabel="name"
    class="w-full bg-gray-800 "
  />
</section>

</template>

<script setup>
import { ref, onMounted } from "vue";

const selectedCity = ref();
const cities = ref([
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
  { name: "Chapter 30", code: "CH30" },
 
]);


</script>
