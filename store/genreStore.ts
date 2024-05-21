// // stores/genre.js
// import { defineStore } from 'pinia';

// interface Genre {
//   id: string;
//   name: string;
// }

// export const useGenreStore = defineStore('genre', {
//   state: () => ({
//     genres: [] as Genre[],
//   }),

//   actions: {
//     addGenre(newGenre: Genre) {
//       this.genres.push(newGenre);
//     },
//     removeGenre(id: string) {
//       this.genres = this.genres.filter((genre) => genre.id !== id);
//     },
//     async fetchAllGenres() {
//       const response = await useFetch('/api/genres');
//       this.genres = response.data.value;
//     }
//   },

//   getters: {
//     allGenres(): Genre[] {
//       return this.genres;
//     },
//   },
// });
