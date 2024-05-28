import { reactive, ref } from "vue"
export default function createGame() {
  var pieces = ref([])
  var state = ref({
    level: 1,
    difficulty: 1
  })
  function setConfig(level: number, difficulty: number) {
    state.value.level = level
    state.value.difficulty = difficulty
  }
  // common function to move puzzle
  function move(x: number, y: number, newX: number, newY: number) {
    // swap position
    var pieceToMove = pieces.value[y][x]
    pieces.value[y][x] = pieces.value[newY][newX]
    pieces.value[newY][newX] = pieceToMove
  }
  function moveUp(x: number, y: number) {
    if (y === 0) return -1
    move(x, y, x, y - 1)
    return {
      x: x,
      y: y - 1,
    }
  }
  function moveDown(x: number, y: number) {
    if (y >= pieces.value.length - 1) return -1
    move(x, y, x, y + 1)
    return {
      x: x,
      y: y + 1,
    }
  }
  function moveLeft(x: number, y: number) {
    if (x === 0) return -1
    move(x, y, x - 1, y)
    return {
      x: x - 1,
      y: y,
    }
  }
  function moveRight(x: number, y: number) {
    if (x >= pieces.value[y].length - 1) return -1
    move(x, y, x + 1, y)
    return {
      x: x + 1,
      y: y,
    }
  }
  function handleMove(x: number, y: number) {
    if (checkWin()) return;
  
    var { emptyX, emptyY } = seekEmpty() 
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
  function checkWin() {
    var flatten = pieces.value.flat()
    for (var i = 1; i < flatten.length; i++){
      if (flatten[i - 1] !== i) {
        return false
      }
    }
    return true
  }
  function initGame() {
    pieces.value = createMatrix(state.value.level)
    moveInit(state.value.difficulty)
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
    let moveTimes = diff * diff
    var { emptyX, emptyY } = seekEmpty() // 2, 2
    while (count <= moveTimes) {
      const randomIndex: number = Math.floor(Math.random() * 4)
      if (randomIndex + 2 !== lastMove && randomIndex - 2 !== lastMove) {
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
  function seekEmpty() {
    for (var i in pieces.value) {
      for (var j in pieces.value[i]) {
        if (Number(pieces.value[i][j]) === 0) {
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

  return {
    pieces, 
    setConfig,
    initGame,
    checkWin,
    handleMove
  }
}