<template>
  
    <section>
      
      <div class="container w-full m-auto">
       
        <img
          v-for="(i, index) in chapter.Chapter.content"
          :key="i"
          class="w-full p-0 m-0 object-fill"
          :src="i"
          :alt="`${chapter.Chapter.name} segment ${index+1}`"
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