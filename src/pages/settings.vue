<template>
  <div class="custom-dropdown">
    <v-radio-group :model="piecesMode">
      <v-radio label="Numbers" :value="0"></v-radio>
      <v-radio label="Picture" :value="1"></v-radio>
    </v-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
var piecesMode = ref(0) // 0: 数字模式； 1: 图片模式
</script>