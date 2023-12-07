import { endScreen } from './end-screen'

const CARD_NUMBER = 20
const EMOJIS = ['😎', '😍', '🚀', '🌟', '🎉', '🤘', '🌈', '🎸', '🤖', '🍕']
let firstTurn = true
let momentoInicial
let momentoFinal
let successes = 0

const createBoard = () => {
  const gameContainer = document.getElementById('game-container')
  const emojisDoubled = getShuffledArray(EMOJIS)

  for (let i = 0; i < CARD_NUMBER; i++) {
    const createdCard = document.createElement('div')
    const labelCard = document.createElement('label')
    labelCard.innerHTML = emojisDoubled[i]
    labelCard.classList.add('label-invisible')
    createdCard.id = `card${i}`
    createdCard.classList.add('card')
    createdCard.append(labelCard)
    gameContainer.append(createdCard)
  }
  const gameContainerDiv = document.getElementById('game-container')
  gameContainerDiv.addEventListener('click', playerTurn)
  momentoInicial = new Date()
}

const playerTurn = (e) => {
  if (
    !e.target.classList.contains('card') ||
    e.target.classList.contains('card-active')
  )
    return

  if (e.target.classList.contains('card')) {
    e.target.firstChild.classList.remove('label-invisible')
    e.target.firstChild.classList.add('label-visible')
    e.target.classList.add('card-active')
  }

  if (firstTurn) {
    firstTurn = false
    return
  }

  const activeCards = document.querySelectorAll('.card-active')
  const [firstCard, secondCard] = activeCards

  firstCard.classList.remove('card-active')
  secondCard.classList.remove('card-active')

  if (firstCard.textContent === secondCard.textContent) {
    successes++
    setTimeout(() => {
      firstCard.classList.add('card-hidden')
      secondCard.classList.add('card-hidden')
    }, 200)
  } else {
    firstCard.classList.remove('card-active')
    secondCard.classList.remove('card-active')
    setTimeout(() => {
      firstCard.firstChild.classList.remove('label-visible')
      secondCard.firstChild.classList.remove('label-visible')
      firstCard.firstChild.classList.add('label-invisible')
      secondCard.firstChild.classList.add('label-invisible')
    }, 200)
  }
  if (checkVictory()) {
    momentoFinal = new Date()
    const elapsedTime = (momentoFinal - momentoInicial) / 1000

    endScreen(elapsedTime)
  }
  firstTurn = true
}

const checkVictory = () => {
  if (successes === 10) {
    return true
  }
  return false
}

const shuffle = (array) => {
  return array.toSorted(() => Math.random() - 0.5)
}

const getShuffledArray = (array) => {
  return shuffle(array.concat(array))
}

export { createBoard, playerTurn }
