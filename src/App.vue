<script setup lang="ts">
  import { useStore } from "./store"
  import { getVideoData } from "./services/youtube"
  import { ref } from "vue"
  import { formatDuration } from "./utils"

  const store = useStore()
  const newVideo = ref("")

  async function addVideo() {
    const url = newVideo.value;
    const video = await getVideoData(url)
    store.addVideo(video)
    newVideo.value = ""
  }

</script>


<template>
  <div>
    <h1>MyTube</h1>
    <form @submit.prevent="addVideo">
      <input v-model="newVideo" /><button type="submit">Añadir</button>
    </form>
    <ul>
      <li v-for="video in store.state.videos" :key="video.id">
        <div>
          {{ video.id }}
          <img :alt="video.title" :src="video.thumbnail" />
          {{ formatDuration(video.duration) }}
        </div>
      </li>
    </ul>
  </div>
</template>
