const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const {
    sendGames,
    updateGame,
    createGame,
    deleteGame
} = require('./controller.js')

app.get('/api/games', sendGames)
app.put('/api/games/:id', updateGame)
app.post('/api/games', createGame)
app.delete('/api/games/:id', deleteGame)

app.listen(4004, () => console.log('Docked at port 4004'))