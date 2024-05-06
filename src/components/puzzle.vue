<template>
  {{ pieces }}
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
</template>

<script setup lang="ts">
import { reactive } from 'vue'
var pieces = reactive([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 0],
])

// common function to move puzzle
function move(x: number, y: number, newX: number, newY: number) {
  // swap position
  var pieceToMove = pieces[y][x]
  pieces[y][x] = pieces[newY][newX]
  pieces[newY][newX] = pieceToMove
}
function moveUp(x: number, y: number) {
  if (y === 0) return -1
  console.log('moveUp')
  move(x, y, x, y - 1)
  return {
    x: x,
    y: y - 1,
  }
}
function moveDown(x: number, y: number) {
  if (y >= pieces.length - 1) return -1
  console.log('moveDown')
  move(x, y, x, y + 1)
  return {
    x: x,
    y: y + 1,
  }
}
function moveLeft(x: number, y: number) {
  if (x === 0) return -1
  console.log('moveLeft')
  move(x, y, x - 1, y)
  return {
    x: x - 1,
    y: y,
  }
}
function moveRight(x: number, y: number) {
  if (x >= pieces[y].length - 1) return -1
  console.log('moveRight')
  move(x, y, x + 1, y)
  return {
    x: x + 1,
    y: y,
  }
}
function handleMove(x: number, y: number) {
  //2,1
  var { emptyX, emptyY } = seekEmpty() // 2, 2
  if (emptyX === x) {
    if (emptyY - y === 1) {
      moveDown(x, y)
    } else if (y - emptyY === 1) {
      moveUp(x, y)
    }
  } else if (emptyY === y) {
    if (emptyX - x === 1) {
      moveRight(x, y)
    } else if (x - emptyX === 1) {
      moveLeft(x, y)
    }
  }
}
function seekEmpty() {
  for (var i in pieces) {
    for (var j in pieces[i]) {
      if (Number(pieces[i][j]) === 0) {
        return {
          emptyX: Number(j),
          emptyY: Number(i),
        }
      }
    }
  }
  return {
    emptyX: -1,
    emptyY: -1,
  }
}
function initGame() {
  var level = 3 // 决定拼图碎片数量
  pieces = createMatrix(level)
  var difficulty = 5 // 决定碎片打乱次数 (difficulty * 5 = 次数)
  moveInit(difficulty)
}

function createMatrix(level: number) {
  const row = level + 1
  const col = level + 1
  let count = 1
  var matrix = []
  for (let i = 0; i < row; i++) {
    var rowP = []
    for (let j = 0; j < col; j++) {
      if (count === row * col) {
        rowP.push(0)
        break
      }
      rowP.push(count)
      count++
    }
    matrix.push(rowP)
  }
  return reactive(matrix)
}

function moveInit(diff: number) {
  const fns = [moveUp, moveRight, moveDown, moveLeft]
  let count = 1
  let lastMove = -1
  let fn
  let moveTimes = diff * 5
  var { emptyX, emptyY } = seekEmpty() // 2, 2
  while (count <= moveTimes) {
    const randomIndex: number = Math.floor(Math.random() * 4)
    if (randomIndex + 2 === lastMove || randomIndex - 2 === lastMove) {
      console.log('same as last move, skip')
    } else {
      fn = fns[randomIndex](emptyX, emptyY)
      if (fn != -1) {
        lastMove = randomIndex
        var { x, y } = fn
        emptyX = x
        emptyY = y
        count += 1
      }
    }
  }
}

initGame()
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
