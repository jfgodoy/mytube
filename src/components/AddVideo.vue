<script setup lang="ts">
  import { store } from "../store"
  import { getVideoData as getVideoDataYoutube } from "../services/youtube"
  import { getVideoData as getVideoDataVimeo } from "../services/vimeo"
  import { ref, Ref, watch } from "vue"
  import Feedback from './Feedback.vue'

  const newVideo = ref("")
  const feedback: Ref<typeof Feedback | null> = ref(null)


  async function addVideo() {
    feedback.value?.showInfo('Agregando video...')
    const url = newVideo.value;
    try {
        let video;
        if (url.match(/vimeo/)) {
          video = await getVideoDataVimeo(url)
        } else {
          video = await getVideoDataYoutube(url)
        }
        await store.addVideo(video)
        newVideo.value = ""
        feedback.value?.showSuccess('Video agregado correctamente')
    } catch (err: any) {
        feedback.value?.showError(err.message)
    }
  }

  watch(newVideo, () => feedback.value?.clean('error'))


</script>

<template>
    <form @submit.prevent="addVideo">
        <h2 class="font-500 text-xl my-1">Añadir nuevo video</h2>
        <div class="flex <sm:flex-wrap">
            <input v-model="newVideo" class="b-1 b-black b-op-30 <sm:rounded-2 rounded-l-2 flex-grow-5 <sm:w-full max-w-5xl my-2 px-4 line-height-12 focus:shadow-blue"/>
            <button type="submit" class="bg-blue <sm:rounded-2 rounded-r-2 c-white flex-grow-1 <sm:w-full my-2 px-4 font-700 line-height-12" >Añadir</button>
        </div>
        <Feedback ref="feedback"/>
    </form>
</template>
