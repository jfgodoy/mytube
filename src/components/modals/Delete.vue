<script setup lang="ts">
  import Modal from './Modal.vue'
  import { type Video } from '../../types'
  import { store } from "../../store"

  const props = defineProps<{
    video: null | Video
  }>()

  const emit = defineEmits<{
    (e: 'close'): void
  }>()

  function handleRemove() {
    store.removeVideo(props.video!.id);
    emit('close')
  }

</script>

<template>
    <Teleport to="body">
        <Modal :show="!!video" @close="$emit('close')">
            <div class="">
                <h3 class="font-700 mb-2">¿Seguro que quieres eliminar este video?</h3>
                <div class="flex justify-end mt-6">
                    <button class="b-1 b-blue c-blue px-4 rounded line-height-10" @click="$emit('close')">Cancelar</button>
                    <button class="bg-blue c-white px-4 rounded mx-2 line-height-10" @click="handleRemove()">Eliminar</button>
                </div>
            </div>
        </Modal>
    </Teleport>
</template>
