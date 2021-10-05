<script setup>
import { ref } from 'vue'

const count = ref(100)
const count2 = ref(100)
const count3 = ref(100)
const dia = ref(false)

const load = () => {
  dia.value = true
  setTimeout(() => {
    count.value += 2
    dia.value = false
  }, 2000)
}
const load2 = () => {
  count2.value += 2
}
const load3 = () => {
  count3.value += 2
}
</script>

<template>
  <ul v-infinite-scroll="load" infinite-scroll-disabled="dia" class="infinite-list" style="overflow: auto; height: 500px">
    <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
    <li v-show="dia">Loading....</li>
  </ul>
  <div style="height: 500px; overflow: auto">
    <ul v-infinite-scroll="load2" class="infinite-list">
      <li v-for="i in count2" :key="i" class="infinite-list-item">{{ i }}</li>
    </ul>
  </div>
  <ul v-infinite-scroll="load3" class="infinite-list">
    <li v-for="i in count3" :key="i" class="infinite-list-item">{{ i }}</li>
  </ul>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
