<template>
  <div class="home-container">
    <v-form>
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
    <Puzzle ref="puzzleGame"></Puzzle>
    <v-btn @click="startGame">Restart</v-btn>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, ref, onMounted }  from 'vue'
import Puzzle from '../components/puzzle.vue'
var gameStat: number = 0;
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
onMounted(() => {
})
watch(searchInput, () => {
  startGame()
}, { deep: true })

</script>

<style lang="less">
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
