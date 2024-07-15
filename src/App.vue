<template>
  <div class="header">
    <v-icon icon="fas fa-house" @click="routerLink('Home')" v-if="isHome"/>
    <v-btn class="mg-l-auto" @click="routerLink('Settings')" v-if="!isHome">
      <v-icon icon="fas fa-gear" />Custom</v-btn
    >
  </div>
  <router-view />
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { computed, onMounted } from 'vue';
const router = useRouter()
const route = useRoute()

const isHome = computed(() => {
  return route.name !== 'Home'
})
function routerLink(routeName: string) {
  router.push({ name: routeName })
}
onMounted(()=> {
  localStorage.setItem("config", JSON.stringify({ type: 0, value: '' }))
})
</script>

<style scoped></style>
