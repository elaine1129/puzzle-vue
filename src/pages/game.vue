<template>
  <div class="gameContainer">
    <div class="header">
      <v-icon icon="fas fa-arrow-left" @click="backToHomePage"/>
    </div>
    <div class="puzzle-container">
      <v-form v-if="state.gameMode === 1">
        <v-select
          v-model="searchInput.level"
          label="Level"
          :items="levels"
          width="300"></v-select>
        <span>Difficulties</span>
        <v-slider
          v-model="searchInput.difficulty"
          :max="difficulties.length - 1"
          :ticks="ticks"
          show-ticks="always"
          step="1"
          tick-size="5"
          width="500"></v-slider>
      </v-form>
      <!-- Puzzle -->
      <Puzzle ref="puzzleGame" @ON_WIN="next"></Puzzle>

      <div class="button-container layout_center_center gap-10">
        <v-btn @click="startGame"> <v-icon icon="fas fa-rotate-right"></v-icon> Restart</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Puzzle from '../components/puzzle.vue'

const router = useRouter()
const route = useRoute()
var state = ref({
  gameMode: 1  // 1: 快速模式 2: 闯关模式
})
var levels: number[] = [1, 2, 3, 4, 5]
var difficulties: number[] = [1, 2, 3, 4, 5]
var searchInput: { level: number, difficulty: number } = reactive({
  level: 1, 
  difficulty: 0
})
var ticks: string[] = function () {
  var labels: any = {}
  for (var i = 0; i < difficulties.length; i++){
    labels[i] = "Level " + difficulties[i]
  }
  return labels
}()

const puzzleGame = ref(null)
function startGame() {
  if (puzzleGame) {
    puzzleGame.value.start(searchInput.level, searchInput.difficulty + 1)
  }
}
function next() {
  if (puzzleGame && searchInput.level < 8 ) {
    puzzleGame.value.start(++searchInput.level, ++searchInput.difficulty + 1)
  }
}
function backToHomePage() {
  router.push({name: "Home"})
}
onMounted(() => {
  if (route.query.mode) {
    state.value.gameMode = Number(route.query.mode)
  }
  
})
watch(searchInput, () => {
  startGame()
}, { deep: true })

</script>

<style lang="less">
.gameContainer {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  flex: 0 0 50px;
  display: flex;
  height: 100px;
  .fas {
    cursor: pointer;
  }
}
.puzzle-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .puzzle {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
