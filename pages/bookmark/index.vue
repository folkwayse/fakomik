<template>
  <div>
    <div class="w-10/12 mx-auto">
      <div
        class="flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700"
        role="alert"
      >
        <svg
          class="w-5 h-5 inline mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <div>
          <span class="font-medium"></span> Anda dapat menyimpan daftar anime di
          sini hingga 500 judul. Daftar ditampilkan berdasarkan tanggal update
          terbaru. Daftar anime disimpan di browser yang anda gunakan saat ini.
        </div>
      </div>
    </div>
    <section class="lg:w-2/3 sm:w-full mx-auto py-8">
      <header class="mb-4 mx-4">
        <h2 class="text-2xl font-bold">Bookmark Anda</h2>
      </header>
      <div class="flex flex-wrap justify-center mx-4">
        <article
          v-for="i in mangas"
          :key="i.slug"
          class="w-1/3 sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/6 p-2 rounded overflow-hidden bg-gray-800 text-white"
        >
          <header class="w-full mx-auto mb-2">
            <nuxt-link :to="`/manga/${i.slug}`">
              <NuxtImg
                class="w-full h-48 object-cover"
                alt="Manga Cover"
                :src="i.poster"
                loading="lazy"
              />
            </nuxt-link>
          </header>

          <NuxtLink :to="`/manga/${i.slug}`">
            <h3 class="text-sm font-bold p-2 truncate">
              {{ i.title }}
            </h3>
          </NuxtLink>
          <span class="text-xs font-bold px-2 block">
            Chapter {{ i.last_chapters }}
          </span>
          <div class="flex items-center px-2 py-1">
            <div class="flex space-x-1">
              <span v-for="n in 5" :key="n" class="text-yellow-500">
                <svg
                  v-if="n <= i.rating"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.174h4.382c.969 0 1.371 1.24.588 1.81l-3.547 2.573 1.357 4.174c.3.921-.755 1.688-1.538 1.21L10 13.347l-3.547 2.573c-.783.578-1.838-.289-1.538-1.21l1.357-4.174-3.547-2.573c-.783-.57-.381-1.81.588-1.81h4.382l1.357-4.174z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.174h4.382c.969 0 1.371 1.24.588 1.81l-3.547 2.573 1.357 4.174c.3.921-.755 1.688-1.538 1.21L10 13.347l-3.547 2.573c-.783.578-1.838-.289-1.538-1.21l1.357-4.174-3.547-2.573c-.783-.57-.381-1.81.588-1.81h4.382l1.357-4.174z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </svg>
              </span>
            </div>
            <span class="ml-2 text-xs">{{ i.rating }}</span>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useBookmarkStore } from "~/store/bookmarkStore";
import { ref, onMounted } from "vue";
const bookmarkStore = useBookmarkStore();
const config = useRuntimeConfig();

const mangas = ref(null);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await $fetch(
      `${config.public.baseURL}mangas/getbookmark`,
      {
        method: "POST",
        body: JSON.stringify({
          mangaIds: bookmarkStore.bookmarks.map(
            (bookmark) => bookmark.manga_id
          ),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    mangas.value = response;
  } catch (err) {
    error.value = err;
  }
});
</script>

<style scoped>
/* Add any custom styles here */
</style>
