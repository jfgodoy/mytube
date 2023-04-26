<script setup lang="ts">
  import { type Ref, ref } from 'vue'
  import { store } from "../store"
  import { formatDuration } from "../utils"
  import DetailsModal from './modals/Details.vue'
  import { type Video } from '../types'

  const detailsVideo: Ref<null | Video> = ref(null)

</script>


<template>
    <ul class="grid grid-gap-14 grid-cols justify-center">
        <li v-for="video in store.videos" :key="video.id" class="relative inline-block"  @click="detailsVideo = video">
            <img :alt="video.title" :src="video.thumbnail" height="206" width="360" class="object-cover <sm:w-full b-4 b-transparent hover:b-blue"/>
            <span class="absolute right-2 bottom-2 bg-black color-white op-80 px-2 py-1 rounded font-sans font-bold tabular-nums pointer-events-none">
                {{ formatDuration(video.duration) }}
            </span>
        </li>
    </ul>
    <DetailsModal :video="detailsVideo" @close="detailsVideo = null" />
</template>

<style scoped>
.grid-cols {
    grid-template-columns: repeat(auto-fit, minmax(120px, 360px));
}
</style>
