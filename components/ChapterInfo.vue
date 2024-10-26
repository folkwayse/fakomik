<template>
  <section>
    <div class="container mx-auto p-4 lg:w-2/3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              :href="`/manga/${data.Chapter.manga.slug}`"
            >
              {{ data.Chapter.manga.title }}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{{ data.Chapter.name }}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div class="shadow-md rounded-lg p-6">
        <div v-if="data">
          <h1 class="text-2xl font-bold mb-4">{{ data.Chapter.name }}</h1>
          <div>
            <h3 class="text-sm">
              Baca manga / komik {{ data.Chapter.name }} terbaru di
              {{ config.public.siteName }} . Manga / komik
              {{ data.Chapter.manga.title }} bahasa Indonesia selalu update di
              {{ config.public.siteName }}. Jangan lupa membaca update manga / komik lainnya ya.
              Daftar koleksi manga / komik di  {{ config.public.siteName }} ada di menu Manga.
            </h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const config = useRuntimeConfig();

// Access baseURL universally
const homeUrl = config.public.homeUrl;
const siteConfig = ref(config.public);
const { params } = useRoute();
const slug = params.slug;
const { data, pending, error, refresh } = await useAsyncData(
  "chapter",
  async () => {
    const data = await $fetch(
      `${config.public.baseURL}chapters/gettitle/${slug}`
    );
    useJsonld(() => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Manga",
          item: homeUrl + "manga",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: data.value.Chapter.manga.title,
          item: homeUrl + "manga/" + data.value.Chapter.manga.slug,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: data.value.Chapter.name,
        },
      ],
    }));
    return data;
  }
);
</script>
