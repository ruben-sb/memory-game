import { createBoard } from './game'

const createWelcome = () => {
  const oldName = localStorage.getItem('name') ?? ''
  const welcomeContainer = document.getElementById('welcome-container')
  welcomeContainer.innerHTML = `<h2>Bienvenido a Memory Christmas!</h2>
  <form id="player-data-form" action="javascript:void(0);">
            <label for="name">Introduce tu nombre</label>
            <input type="text" name="name" id="name" placeholder="Nombre" required />
            <input type="submit" value="Jugar">
  </form>
  <div>
  <p>Encuentra las cartas iguales</p>
  <p>Hazlo lo más rápido que puedas</p>
  </div>`

  document.getElementById('name').value = oldName
  listenFormSubmit()
}

const listenFormSubmit = () => {
  const form = document.getElementById('player-data-form')
  form.addEventListener('submit', () => {
    localStorage.setItem('name', form.name.value)
    disableWelcomeContainer()
    createBoard()
  })
}

const disableWelcomeContainer = () => {
  const welcomeContainer = document.getElementById('welcome-container')
  welcomeContainer.style.display = 'none'
}

export { createWelcome }
