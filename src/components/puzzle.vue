<template>
  <div class="puzzle">
    <div v-for="(row, i) in pieces" class="puzzle_row">
      <div
        class="piece"
        v-for="(col, j) in row"
        :class="{ empty: col === 0 }"
        @click="handleMove(j, i)"
      >
        {{ col !== 0 ? col : '' }}
      </div>
    </div>
  </div>
  <wDialog :dialog="winDialog" title="Congratulations!" content="You win!" @close="closeWinDialog"></wDialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineExpose} from 'vue'
import wDialog from "./dialog.vue"
import createGame from "../utils/puzzle"
var { pieces, initGame, setConfig, checkWin, handleMove } = createGame() //初始化 
setConfig(1, 1) //初始化 
initGame()
function closeWinDialog() {
  winDialog.value = false
}
function start(level: number, difficulties: number) {
  setConfig(level, difficulties)
  initGame()
}
var winDialog = ref(false)
watch(pieces, () => {
  if (checkWin()) {
   winDialog.value = true
  }
}, { deep: true, immediate: true })
onMounted(() => {
  
})
defineExpose({
  start
})
</script>

<style lang="less">
.puzzle {
  &_row {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    .piece {
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      background-color: #777777;
      border-radius: 10px;
      cursor: pointer;
      &.empty {
        opacity: 0;
        cursor: default;
      }
      transition: linear 0.1s;
    }
  }
  &__row:last-child {
    margin-bottom: 0;
  }
}
</style>
