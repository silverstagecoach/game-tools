const gamesContainer = document.querySelector('#games-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4004/api/games`

const gamesCallback = ({ data: games }) => displayGames(games)
const errCallback = err => console.log(err.response.data)

const getAllGames = () => axios.get(baseURL).then(gamesCallback).catch(errCallback)
const createGame = body => axios.post(baseURL, body).then(gamesCallback).catch(errCallback)
const deleteGame = id => axios.delete(`${baseURL}/${id}`).then(gamesCallback).catch(errCallback)
const updateGame = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(gamesCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let title = document.querySelector('#title')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        title: title.value,
        rating: rating.value, 
        imageURL: imageURL.value
    }

    createGame(bodyObj)

    title.value = ''
    rating.checked = false
    imageURL.value = ''
}

function createGameCard(game) {
    const gameCard = document.createElement('div')
    gameCard.classList.add('game-card')

    gameCard.innerHTML = `<img alt='game cover' src=${game.imageURL} class="game-cover"/>
    <p class="game-title">${game.title}</p>
    <div class="btns-container">
        <button onclick="updateGame(${game.id}, 'minus')">-</button>
        <p class="game-rating">${game.rating} stars</p>
        <button onclick="updateGame(${game.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteGame(${game.id})">delete</button>
    `


    gamesContainer.appendChild(gameCard)
}

function displayGames(arr) {
    gamesContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createGameCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllGames()