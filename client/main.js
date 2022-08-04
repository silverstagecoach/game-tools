const gamesContainer = document.querySelector('#games-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4004/api/games`

const gamesCallback = ({ data: games }) => displayGames(games)
const errCallback = err => console.log(err.response.data)

const getAllGames = () => axios.get(baseURL).then(gamesCallback).catch(errCallback)
const createGame = body => axios.post(baseURL, body).then(gamesCallback).catch(errCallback)
const deleteGame = id => axios.delete(`${baseURL}/${id}`).then(gamesCallback).catch(errCallback)
const updateGame = (id) => {
    let rating = document.querySelector(`input[name="${id}-ratings"]:checked`).value
    axios.put(`${baseURL}/${id}/${rating}`)
    .then(gamesCallback)
    .catch(errCallback)
    alert(`your rating of ${rating} has been posted`)
    }
function submitHandler(e) {
    e.preventDefault()

    let title = document.querySelector('#title')
    let rating = document.querySelector('input[name="addratings"]:checked')
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
    <p class="game-rating">${game.rating} stars</p>
    <div class="btns-container">
        <div id="radio-container">
        <label for="${game.id}-one">
            <input
                type="radio"
                name="${game.id}-ratings"
                value="1"
                id="${game.id}-one"/>
            1
        </label>
        <label for="${game.id}-two">
            <input
                type="radio"
                name="${game.id}-ratings"
                value="2"
                id="${game.id}-two"/>
            2
        </label>
        <label for="${game.id}-three">
            <input
                type="radio"
                name="${game.id}-ratings"
                value="3"
                id="${game.id}-three"/>
            3
        </label>
        <label for="${game.id}-four">
            <input
                type="radio"
                name="${game.id}-ratings"
                value="4"
                id="${game.id}-four"/>
            4
        </label>
        <label for="${game.id}-five">
            <input
                type="radio"
                name="${game.id}-ratings"
                value="5"
                id="${game.id}-five"/>
            5
        </label>
    </div>
    </div>
    <button onclick="updateGame(${game.id})">submit</button>
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

function hideInput() {
    let form = document.querySelector('form')
    if (form.visibility === 'visible') {
        visibility = 'collapse'
    }
    else {
        visibility = 'visible'
    }
}

form.addEventListener('submit', submitHandler)
form.addEventListener('click', hideInput)


getAllGames()