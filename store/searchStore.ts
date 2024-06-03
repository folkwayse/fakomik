import { defineStore } from 'pinia';

export const useSearchStore = defineStore('searchStore', {
  state: () => ({
    selectedGenres: [],
    selectedType: null,
    selectedSortyBY: null,
    mangas: [],
  }),
  actions: {
    async fetchGenres() {
      const config = useRuntimeConfig();
      const { data: genres } = await useFetch(`${config.public.baseURL}genres`);
      return genres;
    },
    async advSearch() {
      const config = useRuntimeConfig();
      if (this.selectedGenres.length < 1) {
        alert("paling tidak harus memilih 1 genre");
        return;
      }

      const jsonData = {
        genres: this.selectedGenres,
        type: this.selectedType,
        sortyBy: this.selectedSortyBY,
      };

      const { data, pending, error, refresh } = await useAsyncData(
        "mangas",
        async () => {
          const data = await $fetch(
            `${config.public.baseURL}mangas/advancesearch`,
            {
              method: "POST",
              body: jsonData,
            }
          );
          this.mangas  = data ;
          return data;
        }
      );
    },
  },
});
