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
        <v-radio-group v-model="picMode">
          <v-radio label="Default" :value="0"></v-radio>
          <v-radio label="Custom" :value="1"></v-radio>
        </v-radio-group>
        <div v-if="picMode">
          <v-file-input
            v-model="imageFile"
            accept="image/*"
            label="Custom Image"
            @change="changeFile"
            @click:clear="clearFile"
          ></v-file-input>
          <div class="image-preview" v-if="previewImageUrl">
            <img :src="previewImageUrl" width="100">
          </div>
        </div>
        <v-item-group v-else class="d-flex ga-4" selected-class="item-selected" v-model="image">
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
import { ref, computed, getCurrentInstance, onMounted, Ref } from 'vue';
import { DEFAULT_IMG_LIST } from '../utils/conf.ts'
var piecesMode = ref(0) // 0: 数字模式； 1: 图片模式
var picMode = ref(0) // 0: 默认图 1: 自定义（用户上传）
var image: Ref<number | string> = ref(0)
var imageFile: File | null = null
var previewImageUrl = ref("")
var saveBtnDisabled = computed(() => {
  return piecesMode.value !== 0 && ((picMode.value === 0 && image.value == null) || (picMode.value === 1 && !previewImageUrl.value))
})
function getImgSrc(path: string) {
  return new URL(path, import.meta.url).href
}
const instance = getCurrentInstance();
const $confirm = instance?.appContext.config.globalProperties.$confirm

function handleSave() {
  let url = picMode.value ? JSON.stringify({
    name: imageFile.name ,uri: previewImageUrl.value}): image.value
  if (piecesMode.value === 1) {
    localStorage.setItem("config", JSON.stringify({ type: piecesMode.value, value: url }))
  } else {
    localStorage.setItem("config", JSON.stringify({ type: piecesMode.value, value: "" }))
  }
  $confirm?.success('Save successfully');
}
function changeFile() {
  if (imageFile) {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(imageFile)
    fileReader.onloadend = () => {
      const base64Data = fileReader.result as string
      previewImageUrl.value = base64Data
    }
  }
}
function clearFile() {
  previewImageUrl.value = ""
  imageFile = null
}
onMounted(() => {
  var configItem = localStorage.getItem("config")
  var savedConfig = configItem ? JSON.parse(configItem) : null
  if (savedConfig) {
    piecesMode.value = savedConfig.type
    if (typeof savedConfig.value === 'number') {
      picMode.value = 0
      image.value = savedConfig.value
    } else {
      picMode.value = 1
      if (savedConfig.value) {
        previewImageUrl.value = JSON.parse(savedConfig.value).uri
        const byteNumbers = new Array(previewImageUrl.value.length)
        
        for (let i = 0; i < previewImageUrl.value.length; i++){
          byteNumbers[i] = previewImageUrl.value.charCodeAt(i)
        }
        const byteArray = new Uint8Array(byteNumbers)
        const file = new File([byteArray], JSON.parse(savedConfig.value).name)
        imageFile = file
      }
    }
    
  }
})
</script>

<style scoped>
.v-card {
  &.item-selected {
    opacity: 1;
  }
}
</style>