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
  const titleTop10 = document.createElement('h2')
  titleTop10.innerHTML = 'Top 10'
  leaderboardContainer.append(titleTop10)
  data.forEach((user) => {
    const userDiv = document.createElement('div')
    userDiv.innerText = `Nombre: ${user.username}, Tiempo: ${user.time}s`
    leaderboardContainer.appendChild(userDiv)
  })
}
export { createLeaderBoard }
