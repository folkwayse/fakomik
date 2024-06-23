<template>
  <main>
   
    
    <PrevNextNavigation></PrevNextNavigation>
    <Notif />
    <ChapterContent/>
    <PrevNextNavigation></PrevNextNavigation>
    <ChapterList />
    <CommentSection/>
    <MangaRekomendasi />
    
   
  </main>
</template>
<script setup>


import ChapterList from "~/components/ChapterList.vue";
import ChapterContent from "~/components/ChapterContent.vue";
import PrevNextNavigation from "~/components/PrevNextNavigation.vue";
import MangaRekomendasi from "~/components/MangaRekomendasi.vue";
import CommentSection from "~/components/CommentSection.vue";
import Notif from "~/components/Notif.vue";



</script>
