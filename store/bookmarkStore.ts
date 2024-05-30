import { defineStore } from "pinia";

// Define the structure of a Bookmark
interface Bookmark {
  manga_id: string;
}

// Create the store
export const useBookmarkStore = defineStore("bookmark", {
  state: () => ({
    bookmarks: [] as Bookmark[],
  }),

  actions: {
    // Add a new bookmark if it doesn't already exist
    addBookmark(manga_id: string) {
      const existingIndex = this.bookmarks.findIndex(
        (bookmark) => bookmark.manga_id === manga_id
      );
      if (existingIndex === -1) {
        const newBookmark: Bookmark = {
          manga_id,
        };
        this.bookmarks.push(newBookmark);
      }
    },

    // Remove a bookmark by manga_id
    removeBookmark(manga_id: string) {
      this.bookmarks = this.bookmarks.filter(
        (bookmark) => bookmark.manga_id !== manga_id
      );
    },

    // Fetch details for a manga from the API
    async fetchMangaDetails(manga_id: string) {
      try {
        const response = await fetch(`https://api.example.com/manga/${manga_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch manga details");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching manga details:", error);
        return null;
      }
    },
  },

  getters: {
    // Check if a manga is bookmarked
    isBookmarked: (state) => (manga_id: string) => {
      return state.bookmarks.some((bookmark) => bookmark.manga_id === manga_id);
    },

    // Get all bookmarked manga_ids
    getAllBookmarks(state) {
      return state.bookmarks.map((bookmark) => bookmark.manga_id);
    },
  },

  persist: {
    storage: persistedState.localStorage,
  },
});
