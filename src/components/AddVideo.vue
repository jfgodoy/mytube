<script setup lang="ts">
  import { useStore } from "../store"
  import { getVideoData } from "../services/youtube"
  import { ref } from "vue"

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
    <form @submit.prevent="addVideo">
        <h2 class="font-500 text-xl my-1">Añadir nuevo video</h2>
        <div class="flex <sm:flex-wrap">
            <input v-model="newVideo" class="b-1 b-black b-op-30 <sm:rounded-2 rounded-l-2 flex-grow-5 <sm:w-full max-w-5xl my-2 px-4 line-height-12 focus:shadow-blue"/>
            <button type="submit" class="bg-btn <sm:rounded-2 rounded-r-2 c-white flex-grow-1 <sm:w-full my-2 px-4 font-700 line-height-12" >Añadir</button>
        </div>
    </form>
</template>

<style scoped>
.bg-btn {
    background: #136AE4;
}
</style>
