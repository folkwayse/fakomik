<template>
  
    <section>
      <div class="container w-full m-auto">
        <img
          v-for="i in 5"
          :key="i"
          class="w-full p-0 m-0 object-fill"
          src="https://cdn.myanimelist.net/images/anime/1758/141268.jpg"
        />
      </div>
    </section>
</template>
