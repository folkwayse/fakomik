<template>
  <section>
    <div class="container w-full m-auto">
      <ChapterInfo
        :chapterName="chapter.Chapter.name"
        :slug="chapter.Chapter.slug"
        :mangaTitle="chapter.Chapter.manga.title"
      />
      <div
        class="fixed top-24 right-2 bg-gray-700 text-white text-sm py-1 px-2 rounded z-50"
        v-if="imageLoaded !== chapter.Chapter.content.length"
      >
        {{ imageLoaded }} / {{ chapter.Chapter.content.length }}
      </div>
      <div
        v-for="(i, index) in chapter.Chapter.content"
        :key="index"
        class="relative"
      >
        <NuxtImg
        @contextmenu.prevent
          class="w-full p-0 m-0 object-fill"
          :src="getImageSrc(i, index)"
          :alt="`${chapter.Chapter.name} segment ${index + 1}`"
          @load="LoadedImages"
          loading="lazy"
          @error="errorImages(index)"
          @click="setCurrentSegment(index)"
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
import ChapterInfo from "./ChapterInfo.vue";
const { params } = useRoute();
const slug = params.slug;
const config = useRuntimeConfig();
const { data: chapter, error } = await useFetch(
  () => `${config.public.baseURL}chapters/getchapter/${slug}`
);

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
  errorIndexes.value = errorIndexes.value.filter((i) => i !== index);
};

const setCurrentSegment = (index) => {
  currentSegment.value = index;
  console.log(index);
  window.scrollBy({
    top: 250,
    behavior: "smooth",
  });
};

const getImageSrc = (i, index) => {
  const timestamp = reloadTimestamps.value[index]
    ? `?reload=${reloadTimestamps.value[index]}`
    : "";
  return `${i}${timestamp}`;
};

useJsonld(() => {
  if (chapter.value) {
    

    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: chapter.value.Chapter.manga.title,
      datePublished: "2020-07-16T12:54:58",
      dateModified: "2024-05-25T04:55:27",
      description:
        chapter.value.Chapter.name +
        " - " +
        chapter.value.Chapter.manga.description,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://google.com/article",
      },
      image: {
        "@type": "ImageObject",
        url: chapter.value.Chapter.manga.poster,
        height: 391,
        width: 696,
      },
      author: {
        "@type": "Person",
        name: "Fakomik",
        url: "https://Fakomik.cloud/author/Fakomik",
      },
      publisher: {
        "@type": "Organization",
        name: "Fakomik",
        logo: {
          "@type": "ImageObject",
          url: "https://i.imgur.com/iw7S99a.png",
          width: 600,
        },
        url: "https://Fakomik.cloud",
      },
      articleBody:
        chapter.value.Chapter.name +
        " - " +
        chapter.value.Chapter.manga.description,
      keywords: chapter.value.Chapter.name,
    };
  }
});

// implementasi watch history dan add views
import { useHistoryStore } from "~/store/historyStore";
const historyStore = useHistoryStore();
historyStore.addHistory(slug, chapter.value.Chapter.name);
</script>
