import { defineStore } from 'pinia';

interface HistoryItem {
  timestamp: string;
  manga_id: string;
  chapter_slug: string;
  manga_title: string;
  manga_chapter: string;
}

export const useHistoryStore = defineStore("history", {
  state: () => ({
    histories: [] as HistoryItem[],
  }),
  actions: {
    addHistory(manga_id: string, chapter_slug: string, manga_title: string, manga_chapter: string) {
      const existingIndex = this.histories.findIndex(
        (history) => history.manga_id === manga_id
      );
      const timestamp = new Date().toISOString();
      if (existingIndex !== -1) {
        this.histories[existingIndex].chapter_slug = chapter_slug;
        this.histories[existingIndex].timestamp = timestamp;
        this.histories[existingIndex].manga_title = manga_title;
        this.histories[existingIndex].manga_chapter = manga_chapter;
      } else {
        const newHistory: HistoryItem = {
          timestamp,
          manga_id,
          chapter_slug,
          manga_title,
          manga_chapter
        };
        this.histories.splice(0, 0, newHistory);
        
        // Ensure maximum of 100 histories, remove oldest if exceeded
        if (this.histories.length > 100) {
          this.histories.pop();
        }
      }
    },
    getLastReadHistory(manga_id: string): HistoryItem | null {
      const index = this.histories.findIndex( (history) => history.manga_id === manga_id );
    
      const history = this.histories[index];
    
      return index === -1 ? null : history;
    },
    
  },
  getters: {
    getHistoriesByTimestamp(): Record<string, HistoryItem[]> {
      const groupedHistories = this.histories.reduce((groupedHistories, history) => {
        const date = history.timestamp.split("T")[0];
        if (!groupedHistories[date]) {
          groupedHistories[date] = [];
        }
        groupedHistories[date].push(history);
        return groupedHistories;
      }, {} as Record<string, HistoryItem[]>);

      // Sort histories by timestamp in descending order
      const sortedGroupedHistories: Record<string, HistoryItem[]> = {};
      Object.keys(groupedHistories)
        .sort((a, b) => (a < b ? 1 : -1))
        .forEach((date) => {
          sortedGroupedHistories[date] = groupedHistories[date].sort((a, b) =>
            a.timestamp < b.timestamp ? 1 : -1
          );
        });

      return sortedGroupedHistories;
    },

    // Return the latest HistoryItem or null if no matching HistoryItem is found
    getLatestHistory(): HistoryItem | null {
      if (this.histories.length === 0) return null;
      return this.histories.slice().sort((a, b) => b.timestamp.localeCompare(a.timestamp))[0];
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
