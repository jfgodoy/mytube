<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps<{
  show: Boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()


const onEscape = (e: KeyboardEvent) => {
  if (props.show && e.key === 'Escape') {
    emit('close')
  }
}

watch(() => props.show, show => {
  if (show) {
    document.addEventListener('keydown', onEscape)
  } else {
    document.removeEventListener('keydown', onEscape)
  }
})



</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container relative w-full max-w-4xl" >
        <slot />
        <button class="absolute top-1 right-3" @click="$emit('close')">✕</button>
      </div>
    </div>
  </Transition>
</template>

<style>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
