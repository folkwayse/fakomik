<template>
  <section>
    <div class="container w-full m-auto">
      <div class="fixed top-2 right-2 bg-gray-700 text-white text-sm py-1 px-2 rounded z-50">
        {{ imageLoaded }} / {{ chapter.Chapter.content.length }} - Segment {{ currentSegment + 1 }}
      </div>
      <div v-for="(i, index) in chapter.Chapter.content" :key="index" class="relative">
        <NuxtImg
          class="w-full p-0 m-0 object-fill"
          :src="getImageSrc(i, index)"
          :alt="`${chapter.Chapter.name} segment ${index + 1}`"
          @load="LoadedImages"
          loading="lazy"
          format="webp"
          @error="errorImages(index)"
          @click="setCurrentSegment(index)"
          sizes="sm:50vw md:400px"
        />
        <button 
          v-if="errorIndexes.includes(index)" 
          @click="reloadImage(index)"
          class="absolute top-0 right-0 bg-red-500 text-white p-2"
        >
          Reload
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const { params } = useRoute();
const slug = params.slug;
const config = useRuntimeConfig();
const { data: chapter, error } = await useFetch(() => `${config.public.baseURL}chapters/getchapter/${slug}`);

const imageLoaded = ref(0);
const currentSegment = ref(0);
const errorIndexes = ref([]);
const reloadTimestamps = ref({});

const LoadedImages = () => {
  imageLoaded.value += 1;
};

const errorImages = (index) => {
  if (!errorIndexes.value.includes(index)) {
    errorIndexes.value.push(index);
  }
};

const reloadImages = () => {
  errorIndexes.value = [];
  imageLoaded.value = 0;
};

const reloadImage = (index) => {
  reloadTimestamps.value[index] = new Date().getTime();
  errorIndexes.value = errorIndexes.value.filter(i => i !== index);
};

const setCurrentSegment = (index) => {
  currentSegment.value = index;
  console.log(index);
  window.scrollBy({
    top: 250,
    behavior: 'smooth'
  });
};

const getImageSrc = (i, index) => {
  const timestamp = reloadTimestamps.value[index] ? `?reload=${reloadTimestamps.value[index]}` : '';
  return `${i}${timestamp}`;
};


</script>
