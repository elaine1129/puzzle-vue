<template>
  <div class="home-container">
    <v-btn @click="enterGame('quick')">Quick mode</v-btn>
    <v-btn @click="enterGame('challenge')">Challenge mode</v-btn>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
function enterGame(mode = 'quick') {
  router.push({
    name: "Game",
    query: {mode: mode === 'challenge' ? 2 : 1}
  })
}
onMounted(() => {
})

</script>

<style lang="less">
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 80px;
  height: 100%;
}
</style>
