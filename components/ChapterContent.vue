<template>
  
    <section>
      
      <div class="container w-full m-auto">
        <img
          v-for="i in chapter.Chapter.content"
          :key="i"
          class="w-full p-0 m-0 object-fill"
          :src="i"
        />
      </div>
    </section>
</template>

<script setup>

const { params } = useRoute();
const slug = params.slug;
const config = useRuntimeConfig();
const {data:chapter , error} = await useFetch(() => `${config.public.baseURL}chapters/getchapter/${slug}`);
// console.log(chapter);

</script>