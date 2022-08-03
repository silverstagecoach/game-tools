const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.json())
app.use(cors())
app.use("/", express.static(path.join(__dirname, "../client/")))

const {
    getGames,
    updateGame,
    createGame,
    deleteGame
} = require('./controller.js')

app.get('/api/games', getGames)
app.put('/api/games/:id/:rating', updateGame)
app.post('/api/games', createGame)
app.delete('/api/games/:id', deleteGame)

app.listen(4004, () => console.log('Docked at port 4004'))