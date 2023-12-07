import { createLeaderBoard } from './leaderboard'

const endScreen = (elapsedTime) => {
  const gameContainer = document.getElementById('game-container')
  gameContainer.style.display = 'none'

  const resultsContainer = document.getElementById('results-container')
  resultsContainer.style.display = 'flex'

  resultsContainer.innerHTML = `<h2>Enhorabuena!</h2>
  <p id="result-message"></p>
  <button id="show-leaderboard">Ver clasificacion</button>`
  const resultMessage = document.getElementById('result-message')

  const userNameFromLS = localStorage.getItem('name')
  resultMessage.textContent = `Enhorabuena ${userNameFromLS}!! Tu tiempo ha sido de ${elapsedTime} segundos.`
  const buttonShowLeaderboard = document.getElementById('show-leaderboard')
  buttonShowLeaderboard.addEventListener('click', createLeaderBoard)
  sendResult(elapsedTime)
}

const sendResult = async (elapsedTime) => {
  const userNameFromLS = localStorage.getItem('name')

  const apiUrl = import.meta.env.VITE_API_URL
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userNameFromLS,
        time: elapsedTime,
      }),
    })
  } catch (error) {
    console.error('Error', error)
  }
}
export { endScreen }
