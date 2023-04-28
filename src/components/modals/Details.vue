<script setup lang="ts">
  import Modal from './Modal.vue'
  import { type Video } from '../../types'

  defineProps<{
    video: null | Video
  }>()

  defineEmits<{
    (e: 'close'): void
  }>()

  const isVimeo = (video: Video) => video.originalUrl.match(/vimeo/)


</script>

<template>
    <Teleport to="body">
        <Modal :show="!!video" @close="$emit('close')">
            <div class="flex flex-wrap">
                <div class="video-container">
                    <iframe v-if="isVimeo(video!)"
                        :src="`https://player.vimeo.com/video/${video?.id}`"
                         width="300" height="206" frameborder="0"
                         :title="video?.title"
                    ></iframe>
                    <iframe v-else class="w-full h-full" :src="`https://www.youtube.com/embed/${video!.id}?controls=0`"></iframe>
                </div>
                <div class="flex-grow max-h-60 overflow-y-scroll m-2 flex-basis-100">
                    <h3 class="font-700 mb-2">{{ video!.title }}</h3>
                    <p> {{ video!.description }}</p>
                </div>
            </div>
        </Modal>
    </Teleport>
</template>

<style scoped>
.video-container {
    @apply: bg-black flex-shrink-0 m-2 w-full flex justify-center items-center;
    max-width: 360px;
    height: 206px;
}
</style>
