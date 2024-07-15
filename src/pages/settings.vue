<template>
  <div>
    <div class="custom-dropdown">
      <v-radio-group v-model="piecesMode">
        <v-radio label="Numbers" :value="0"></v-radio>
        <v-radio label="Picture" :value="1"></v-radio>
      </v-radio-group>
    </div>
    <v-expand-transition>
      <div class="image-select" v-if="piecesMode === 1">
        <!-- <v-radio-group v-model="image">
          <v-radio v-for="img in DEFAULT_IMG_LIST" :value="img.name">
            <img :width="64" :src="getImgSrc(img.path)"></img>
          </v-radio>
        </v-radio-group> -->
        <v-item-group class="d-flex ga-4" selected-class="item-selected" v-model="image">
        <div v-for="img in DEFAULT_IMG_LIST" :value="img.name">
            <v-item v-slot="{ toggle, selectedClass }">
              <v-card
                class="d-flex align-center justify-center"
                height="150"
                width="150"
                :class="selectedClass? 'opacity-100' : 'opacity-50'"
              >
                <img :width="128" :src="getImgSrc(img.path)"      @click="toggle"></img>
              </v-card>
            </v-item>
          </div>
        </v-item-group>
      </div>
    </v-expand-transition>  
    <v-btn @click="handleSave" :disabled="saveBtnDisabled">Apply</v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, getCurrentInstance, onMounted } from 'vue';
import { DEFAULT_IMG_LIST } from '../utils/conf.ts'
var piecesMode = ref(0) // 0: 数字模式； 1: 图片模式
var image = ref(0)
var saveBtnDisabled = computed(() => {
  return piecesMode.value !== 0 && (image.value == null || image.value < 0)
})
function getImgSrc(path: string) {
  return new URL(path, import.meta.url).href
}
const instance = getCurrentInstance();
const $confirm = instance?.appContext.config.globalProperties.$confirm

function handleSave() {
  localStorage.setItem("config", JSON.stringify({ type: piecesMode.value, value: image.value }))
  $confirm?.success('Save successfully');
}
onMounted(() => {
  var configItem =  localStorage.getItem("config")
  var savedConfig = configItem ? JSON.parse(configItem) : null
  piecesMode.value = savedConfig.type
  image.value = savedConfig.value
})
</script>

<style scoped>
.v-card {
  &.item-selected {
    opacity: 1;
  }
}
</style>