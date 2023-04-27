<script setup lang="ts">
  import { ref, computed, defineExpose } from "vue"

  type Feed = {
    type: 'empty' | 'error' | 'info' | 'success',
    message: string,
    duration?: number
  }

  const feedMessage = ref<Feed>({type: 'empty', message: ''})

  const feedColor = computed(() => {
    const colorClass: {[key in Feed['type']]: string} = {
      'empty': 'c-white',
      'info': 'c-gray',
      'error': 'c-red',
      'success': 'c-green'
    };
    return colorClass[feedMessage.value.type]
  })

  const clean = <K extends Feed['type']>(type: K) => {
    if (feedMessage.value.type === type) {
      feedMessage.value = { type: 'empty', message: ''}
    }
  }

  const showInfo = (message: string) => {
    feedMessage.value = { type: 'info', message}
  }

  const showSuccess = (message: string) => {
    feedMessage.value = { type: 'success', message}
    setTimeout(() => clean('success'), 3000)
  }

  const showError = (message: string) => {
    feedMessage.value = { type: 'error', message}
  }

  defineExpose({
    showInfo,
    showSuccess,
    showError,
    clean
  });

</script>

<template>
    <div :class="feedColor" class="font-500 h-6">{{ feedMessage.message }}</div>
</template>
