import { defineStore } from 'pinia'

interface HistoryItem {
  date: string;
  url: string;
  title: string;
}

export const useHistoryStore = defineStore('history', {
  state: () => ({
    histories: [] as HistoryItem[],
  }),
  actions: {
    addHistory(url: string, title: string) {
      const existingIndex = this.histories.findIndex(history => history.url === url);
      if (existingIndex !== -1) {
        this.histories[existingIndex].title = title;
        this.histories[existingIndex].date = new Date().toISOString();
      } else {
        const newHistory: HistoryItem = {
          date: new Date().toISOString(),
          url,
          title,
        };
        this.histories.splice(0, 0, newHistory);
      }
    },
  },

  getters: {
    getHistoriesByDate(): Record<string, HistoryItem[]> {
      const groupedHistories = this.histories.reduce((groupedHistories, history) => {
        const date = history.date.split('T')[0];
        if (!groupedHistories[date]) {
          groupedHistories[date] = [];
        }
        groupedHistories[date].push(history);
        return groupedHistories;
      }, {} as Record<string, HistoryItem[]>);

      // Mengurutkan riwayat berdasarkan tanggal secara descending
      const sortedGroupedHistories: Record<string, HistoryItem[]> = {};
      Object.keys(groupedHistories)
        .sort((a, b) => (a < b ? 1 : -1))
        .forEach(date => {
          sortedGroupedHistories[date] = groupedHistories[date];
        });

      return sortedGroupedHistories;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
