import { defineStore } from "pinia";

// Definisi tipe data untuk genre
interface Genre {
  id: number;
  name: string;
}

export const useGenreStore = defineStore("genre", {
  state: () => ({
    genres: [] as Genre[],
  }),

  // Actions digunakan untuk mengubah state
  actions: {
    // Action untuk menambah genre
    addGenre(newGenre: Genre) {
      this.genres.push(newGenre);
    },

    // Action untuk menghapus genre berdasarkan ID
    removeGenre(id: number) {
      this.genres = this.genres.filter((genre) => genre.id !== id);
    },
    async fetchAllGenres() {
      const response = await fetch(process.env.API_URL + "genres");
      const data = await response.json();
      
      this.genres = data;
    }
  },

  // Getters digunakan untuk mendapatkan nilai dari state
  getters: {
    // Getter untuk mendapatkan semua genre
    allGenres(): Genre[] {
      return this.genres;
    },
  },
});
