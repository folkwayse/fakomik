// stores/genre.js
import { defineStore } from "pinia";
const config = useRuntimeConfig();

export const useGenreStore = defineStore("manga", {
  state: () => ({
    manga: [],
  }),

  actions: {
    async fetchMangaBySlug(slug: string) {
      const {data:manga , error} = await fetch("/api/mangas/getmanga/" + slug).then(res => res.json());
      console.log(manga)
      this.manga = manga;
    },
  },

  getters: {},
});
