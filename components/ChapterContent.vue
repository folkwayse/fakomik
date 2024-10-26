<template>
  <section>



    <div class="fixed bottom-5 right-5 z-50">
      <Button @click="scrollToTop">
        <Icon name="mdi:chevron-up" class="h-6 w-6" />
      </Button>
    </div>

    <div class="container w-full m-auto">
      <ChapterInfo :chapterName="chapter.Chapter.name" :slug="chapter.Chapter.slug"
        :mangaTitle="chapter.Chapter.manga.title" />
      <ChapterList :chapterslug="slug" />
      <PrevNextNavigation />
      <!-- <div
        class="bg-gray-700 text-white text-sm py-1 px-2 rounded z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        v-if="imageLoaded !== chapter.Chapter.content.length">
        Loading images : {{ (imageLoaded / chapter.Chapter.content.length) * 100 | numberFormat }}%
      </div> -->

      <div v-for="(i, index) in chapter.Chapter.content" :key="index" class="relative">
        <NuxtImg @contextmenu.prevent class="w-full p-0 m-0 object-fill" :src="getImageSrc(i, index)"
          :alt="`${chapter.Chapter.name} segment ${index + 1}`" @load="LoadedImages" loading="lazy"
          @error="errorImages(index)" @click="setCurrentSegment(index)" />
        <button v-if="errorIndexes.includes(index)" @click="reloadImage(index)"
          class="absolute top-0 right-0 bg-red-500 text-white p-2">
          Reload
        </button>
      </div>
    </div>

    <PrevNextNavigation />

    <ChapterList :chapterslug="slug" />
  </section>
</template>

<script setup>
import ChapterInfo from "./ChapterInfo.vue";
import ChapterList from "~/components/ChapterList.vue";
import PrevNextNavigation from "~/components/PrevNextNavigation.vue";

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

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
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
  // console.log(index);
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
      datePublished: chapter.value.Chapter.createdAt,
      dateModified: chapter.value.Chapter.updatedAt,
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
        name: config.public.siteName,
        url: config.public.homeUrl,
      },
      publisher: {
        "@type": "Organization",
        name: config.public.siteName,
        logo: {
          "@type": "ImageObject",
          url: "https://i.imgur.com/iw7S99a.png",
          width: 600,
        },
        url: config.public.HOME_URL,
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

if (chapter.value) {
  historyStore.addHistory(
    chapter.value.Chapter.manga.id,
    chapter.value.Chapter.slug,
    chapter.value.Chapter.manga.title,
    chapter.value.Chapter.chapter_number
  );
  // console.log('history added')
}
</script>
