<template>
  <section>

    <div v-if="isSwiping === true && direction === 'left'"
      class="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 bg-black">

      <div>
        <ChevronRight class="h-6 w-6 transition-transform duration-200 ease-in-out animate-swipe" />
      </div>
    </div>
    <div class="fixed bottom-5 right-5 z-50">
      <Button @click="scrollToTop">
        <Icon name="mdi:chevron-up" class="h-6 w-6" />
      </Button>
    </div>

    <div class="container w-full m-auto" ref="target">
      <ChapterInfo :chapterName="chapter.Chapter.name" :slug="chapter.Chapter.slug"
        :mangaTitle="chapter.Chapter.manga.title" />
      <ChapterList :chapterslug="slug" />
      <div class="container mx-auto p-4 lg:w-2/3">

        <div class="flex items-center justify-between gap-3">

          <NuxtLink v-if="chapterData && chapterData.prev" :to="`/chapters/${chapterData.prev.slug}`"
            class="bg-indigo-700 text-white px-4 py-2 rounded flex items-center gap-2">
            <Icon name="mdi:chevron-left" class="h-6 w-6" />
            <span>Sebelumnya</span>
          </NuxtLink>
          <span v-else class="text-gray-500">Chapter Awal</span>

          <NuxtLink v-if="chapterData && chapterData.next" :to="`/chapters/${chapterData.next.slug}`"
            class="bg-indigo-700 text-white px-4 py-2 rounded flex items-center gap-2">
            <span>Selanjutnya</span>
            <Icon name="mdi:chevron-right" class="h-6 w-6" />
          </NuxtLink>
          <span v-else class="text-gray-500">Chapter Akhir</span>
        </div>

      </div>

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

    <div class="container mx-auto p-4 lg:w-2/3">

      <div class="flex items-center justify-between gap-3">
        <NuxtLink v-if="chapterData && chapterData.prev" :to="`/chapters/${chapterData.prev.slug}`"
          class="bg-indigo-700 text-white px-4 py-2 rounded flex items-center gap-2">
          <Icon name="mdi:chevron-left" class="h-6 w-6" />
          <span>Sebelumnya</span>
        </NuxtLink>
        <span v-else class="text-gray-500">Chapter Awal</span>

        <NuxtLink v-if="chapterData && chapterData.next" :to="`/chapters/${chapterData.next.slug}`"
          class="bg-indigo-700 text-white px-4 py-2 rounded flex items-center gap-2">
          <span>Selanjutnya</span>
          <Icon name="mdi:chevron-right" class="h-6 w-6" />
        </NuxtLink>
        <span v-else class="text-gray-500">Chapter Akhir</span>
      </div>

    </div>

    <ChapterList :chapterslug="slug" />
  </section>
</template>

<script setup>
import { ref, watch } from 'vue';


import ChapterInfo from "./ChapterInfo.vue";
import ChapterList from "~/components/ChapterList.vue";
import { useHistoryStore } from "~/store/historyStore";
import { ChevronLeftCircle, ChevronRight } from 'lucide-vue-next';


const prevSlug = ref('');
const nextSlug = ref('');
const target = ref(null);
const router = useRouter();
const { isSwiping, direction, distanceX } = useSwipe(target, {
  threshold: 150,

  onSwipeEnd(e) {
    if (direction.value === 'left') {
      console.log('swipe left');
      gotoNextChapter();
    }

  }
});


const gotoNextChapter = () => {
  console.log('goto next chapter');
  console.log(nextSlug.value)
  navigateTo(`/chapters/${nextSlug.value.slug}`);
}


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



const { data: chapterData, prevNexterror } = await useFetch(
  () => `${config.public.baseURL}chapters/getprevnext/${slug}`
);

if (chapterData.value) {
  prevSlug.value = chapterData.value.prev;
  nextSlug.value = chapterData.value.next;
}




// const { data: chapterData } = useFetch('prevnext', async () => {
//   const response = await fetch(`${config.public.baseURL}chapters/getprevnext/${slug}`);
//   const data = await response.json();

//   console.log(data);
//   prevSlug.value = data.prev.slug;
//   nextSlug.value = data.next.slug;
//   return data;
// });




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
        `${chapter.value.Chapter.name} - ${chapter.value.Chapter.manga.description}`,
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
      articleBody: `${chapter.value.Chapter.name} - ${chapter.value.Chapter.manga.description}`,
      keywords: chapter.value.Chapter.name,
    };
  }
});

const historyStore = useHistoryStore();

if (chapter.value) {
  historyStore.addHistory(
    chapter.value.Chapter.manga.id,
    chapter.value.Chapter.slug,
    chapter.value.Chapter.manga.title,
    chapter.value.Chapter.chapter_number
  );
}

onMounted(() => {
  window.scrollTo({
    top: 600,
    behavior: 'smooth',
  });
});

</script>
