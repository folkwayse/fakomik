

export const useChapterStore = defineStore('chapter', {
  state: () => ({
    chapter: [] as any[],
    route: useRoute(),
    config: useRuntimeConfig(),
    imageLoaded: 0,
    currentSegment: 0,
    errorIndexes: [] as number[],
    reloadTimestamps: {} as Record<number, number>,

  }),
  
  actions: {
    async fetchChapter() {
      const slug = this.route.params.slug as string;
      const { data, error } = await useFetch(
        `${this.config.public.baseURL}chapters/getchapter/${slug}`
      );

      if (error.value) {
        console.error(error.value);
      } else {
        this.chapter = data.value as any;
      }
    },

    LoadedImages() {
      this.imageLoaded += 1;
    },

    errorImages(index: number) {
      if (!this.errorIndexes.includes(index)) {
        this.errorIndexes.push(index);
      }
    },

    reloadImages() {
      this.errorIndexes = [];
      this.imageLoaded = 0;
    },

    reloadImage(index: number) {
      this.reloadTimestamps[index] = new Date().getTime();
      this.errorIndexes = this.errorIndexes.filter((i) => i !== index);
    },

    setCurrentSegment(index: number) {
      this.currentSegment = index;
      console.log(index);
      window.scrollBy({
        top: 250,
        behavior: 'smooth',
      });
    },

    getImageSrc(i: string, index: number) {
      const timestamp = this.reloadTimestamps[index]
        ? `?reload=${this.reloadTimestamps[index]}`
        : '';
      return `${i}${timestamp}`;
    },
  },
 
});
