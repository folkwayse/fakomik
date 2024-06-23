<template>
   <section class="container mx-auto p-4 lg:w-2/3">
      Daftar Chapters list:
      <!-- <ul class="list-disc max-h-96 overflow-auto">
        <NuxtLink
          v-for="i in manga.chapter"
          :key="i.slug"
          :to="`/chapters/${i.slug}`"
        >
          <li class="text-gray-200 p-2">Chapter {{ i.chapter_number }}</li>
        </NuxtLink>
      </ul> -->
    </section>
</template>

<script>

const { params } = useRoute();
const slug = params.slug;
// const config = useRuntimeConfig();
// const { data: chapter, error } = await useFetch(
//   () => `${config.public.baseURL}chapters/getchapter/${slug}`
// );

console.log(slug);

</script>