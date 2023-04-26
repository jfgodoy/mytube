<script setup lang="ts">
  import AddVideo from "../components/AddVideo.vue";
  import List from "../components/List.vue"
</script>


<template>
  <div class="max-w-screen-xl m-auto">
    <h1 class="text-center text-4xl font-700 mt-8">MyTube</h1>
    <AddVideo class="mx-8 my-32" />
    <List />
  </div>
</template>

<style scoped>
.grid-cols {
    grid-template-columns: repeat(auto-fit, minmax(120px, 360px));
}
</style>
