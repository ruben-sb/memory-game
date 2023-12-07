const createLeaderBoard = () => {
  const resultsContainer = document.getElementById('results-container')
  resultsContainer.style.display = 'none'

  const leaderboardContainer = document.getElementById('leaderboard-container')
  leaderboardContainer.style.display = 'flex'

  const buttonRefrescar = document.createElement('button')
  buttonRefrescar.innerText = 'Volver a jugar'
  buttonRefrescar.addEventListener('click', () => window.location.reload())

  leaderboardContainer.append(buttonRefrescar)
  getData()
}

async function getData() {
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    const response = await fetch(apiUrl)

    const data = await response.json()

    displayDataInLeaderboard(data)
  } catch (error) {
    console.error('Error:', error.message)
  }
}

function displayDataInLeaderboard(data) {
  const leaderboardContainer = document.getElementById('leaderboard-container')
  leaderboardContainer.innerHTML('<h2>Top 10</h2>')
  data.forEach((user) => {
    const userDiv = document.createElement('div')
    userDiv.innerText = `Nombre: ${user.username}, Tiempo: ${user.time}`
    leaderboardContainer.appendChild(userDiv)
  })
}
export { createLeaderBoard }
