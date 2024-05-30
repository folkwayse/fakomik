import { defineStore } from "pinia";

interface HistoryItem {
  timestamp: string;
  manga_id: string;
  manga_slug: string;
}

export const useHistoryStore = defineStore("history", {
  state: () => ({
    histories: [] as HistoryItem[],
  }),
  actions: {
    addHistory(manga_id: string, manga_slug: string) {
      const existingIndex = this.histories.findIndex(
        (history) => history.manga_id === manga_id
      );
      const timestamp = new Date().toISOString();
      if (existingIndex !== -1) {
        this.histories[existingIndex].manga_slug = manga_slug;
        this.histories[existingIndex].timestamp = timestamp;
      } else {
        const newHistory: HistoryItem = {
          timestamp,
          manga_id,
          manga_slug,
        };
        this.histories.splice(0, 0, newHistory);
      }
    },
    getLastReadHistory(manga_id: string): HistoryItem | null {
      const history = this.histories.find(
        (history) => history.manga_id === manga_id
      );
      if (!history) {
        return null;
      }
      return history;
    },
  },

  getters: {
    getHistoriesByTimestamp(): Record<string, HistoryItem[]> {
      const groupedHistories = this.histories.reduce(
        (groupedHistories, history) => {
          const date = history.timestamp.split("T")[0];
          if (!groupedHistories[date]) {
            groupedHistories[date] = [];
          }
          groupedHistories[date].push(history);
          return groupedHistories;
        },
        {} as Record<string, HistoryItem[]>
      );

      // Mengurutkan riwayat berdasarkan timestamp secara descending
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
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
