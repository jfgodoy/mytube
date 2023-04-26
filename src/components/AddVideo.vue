<script setup lang="ts">
  import { store } from "../store"
  import { getVideoData } from "../services/youtube"
  import { ref, watch } from "vue"

  const newVideo = ref("")
  const errMessage = ref("")

  async function addVideo() {
    const url = newVideo.value;
    try {
        const video = await getVideoData(url)
        store.addVideo(video)
        newVideo.value = ""
    } catch (err: any) {
        errMessage.value = err.message
    }
  }

  watch(newVideo, () => errMessage.value = "")


</script>

<template>
    <form @submit.prevent="addVideo">
        <h2 class="font-500 text-xl my-1">Añadir nuevo video</h2>
        <div class="flex <sm:flex-wrap">
            <input v-model="newVideo" class="b-1 b-black b-op-30 <sm:rounded-2 rounded-l-2 flex-grow-5 <sm:w-full max-w-5xl my-2 px-4 line-height-12 focus:shadow-blue"/>
            <button type="submit" class="bg-blue <sm:rounded-2 rounded-r-2 c-white flex-grow-1 <sm:w-full my-2 px-4 font-700 line-height-12" >Añadir</button>
        </div>
        <div class="c-red">{{ errMessage }}</div>
    </form>
</template>
