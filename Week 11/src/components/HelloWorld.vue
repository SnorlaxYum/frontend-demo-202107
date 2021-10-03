<script setup>
import { ref } from 'vue'

const count = ref(100)
const count2 = ref(100)

const load = () => {
  count.value += 2
}
const load2 = () => {
  count2.value += 2
}
</script>

<template>
  <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto; height: 500px">
    <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
  </ul>
  <ul v-infinite-scroll="load2" class="infinite-list">
    <li v-for="i in count2" :key="i" class="infinite-list-item">{{ i }}</li>
  </ul>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
