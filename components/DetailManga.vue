<template>
  <section class="container mx-auto p-4 lg:w-2/3">
    <div class="bg-gray-800 text-white rounded-lg shadow-lg p-6">
      <div class="flex flex-col md:flex-row">
        <div class="md:w-1/3 mb-4 md:mb-0">
          <figure>
            <img
              class="w-1/2 h-auto m-auto object-cover rounded-lg "
              alt="The Demon Prince goes to the Academy"
              src="https://cdn.myanimelist.net/images/anime/1758/141268.jpg"
            />
          </figure>
          <div class="mt-4 text-center">
            <button
              class="bg-purple-600 text-white px-4 py-2 rounded mb-2 w-full"
            >
              Bookmark
            </button>
            <div class="text-sm">Followed by 4636 people</div>
            <div class="flex justify-center items-center mt-2">
              <Rating
                v-model="value"
                readonly
                :cancel="false"
                class="text-yellow-500"
              />
              <span class="ml-2 text-xs">7.00</span>
            </div>
          </div>
        </div>
        <div class="md:w-2/3 md:pl-6">
          <h1 class="text-2xl font-bold">
            The Demon Prince goes to the Academy Bahasa Indonesia
          </h1>
          <h2 class="text-lg italic mb-4">마왕은 학원에 간다</h2>
          <p class="text-sm mb-4">
            Saya meninggal saat membaca komentar kebencian di novel saya. Saya
            sudah shock atas kematian saya, tetapi beberapa 'Grim Reaper' muncul
            dan mengatakan kepada saya bahwa menjadi penulis yang buruk adalah
            dosa. Untuk menebus dan membuatnya masuk surga, saya diberi tahu
            bahwa saya harus bertahan melewati akhir dari salah satu novel saya.
            Jadi, saya masuk ke novel 'The Demon King is Dead'... "Sialan!!
            Kenapa ini harus terjadi padaku?!" Sayangnya, karakter yang kumiliki
            adalah Pangeran Iblis, karakter yang tidak memiliki kemampuan
            bertarung—yang mati di awal cerita!!
          </p>
          <div
            class="flex flex-col sm:flex-row items-center sm:justify-start mb-4"
          >
            <span class="bg-gray-700 text-white px-4 py-2 rounded m-1"
              >Awal: Chapter 00</span
            >
            <span class="bg-gray-700 text-white px-4 py-2 rounded m-1"
              >Terbaru: Chapter 66</span
            >
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <div><strong>Status:</strong> Ongoing</div>
              <div><strong>Released:</strong> 2023</div>
              <div><strong>Posted By:</strong> Danzell</div>
            </div>
            <div>
              <div><strong>Type:</strong> Manhwa</div>
              <div><strong>Author:</strong> Geul Jengi S</div>
              <div><strong>Posted On:</strong> Januari 28, 2023</div>
              <div><strong>Updated On:</strong> Mei 14, 2024</div>
              <div><strong>Views:</strong> 881.9K</div>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex flex-wrap gap-2">
              <span class="bg-gray-700 text-white px-4 py-1 rounded"
                >Action</span
              >
              <span class="bg-gray-700 text-white px-4 py-1 rounded"
                >Adventure</span
              >
              <span class="bg-gray-700 text-white px-4 py-1 rounded"
                >Comedy</span
              >
              <span class="bg-gray-700 text-white px-4 py-1 rounded"
                >Drama</span
              >
              <span class="bg-gray-700 text-white px-4 py-1 rounded"
                >Fantasy</span
              >
              <span class="bg-gray-700 text-white px-4 py-1 rounded"
                >Harem</span
              >
              <span class="bg-gray-700 text-white px-4 py-1 rounded"
                >Psychological</span
              >
              <span class="bg-gray-700 text-white px-4 py-1 rounded"
                >Romance</span
              >
              <span class="bg-gray-700 text-white px-4 py-1 rounded"
                >School Life</span
              >
              <span class="bg-gray-700 text-white px-4 py-1 rounded"
                >Tragedy</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
