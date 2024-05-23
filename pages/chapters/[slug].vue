<template>
  <main>
    <ChapterInfo />
    <PrevNextNavigation></PrevNextNavigation>
    <ChapterContent/>
    <PrevNextNavigation></PrevNextNavigation>
    <ChapterList />
    <CommentSection/>
    <MangaRekomendasi />
   
  </main>
</template>
<script setup>
import ChapterInfo from "~/components/ChapterInfo.vue";
import ChapterList from "~/components/ChapterList.vue";
import ChapterContent from "~/components/ChapterContent.vue";
import PrevNextNavigation from "~/components/PrevNextNavigation.vue";
import MangaRekomendasi from "~/components/MangaRekomendasi.vue";
import CommentSection from "~/components/CommentSection.vue";



</script>
