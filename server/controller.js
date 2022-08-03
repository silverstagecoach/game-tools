const games = require('./db.json')
let globalId = 11

module.exports = {
    getGames: (req, res) => res.status(200).send(games),
    deleteGame: (req, res) => {
        let index = games.findIndex(elem => elem.id === +req.params.id)
        games.splice(index, 1)
        res.status(200).send(games)
    },
    createGame: (req, res) => {
        let { title, rating, imageURL } = req.body
        let newGame = {
            id: globalId,
            title, 
            rating,
            imageURL
        }
        games.push(newGame)
        res.status(200).send(games)
        globalId++
    },
    updateGame: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        let index = games.findIndex(elem => +elem.id === +id)

        if (games[index].rating === 10 && type === 'plus') {
            res.status(400).send('cannot go above 10')
        } else if (games[index].rating === 0 && type === 'minus') {
            res.status(400).send('cannot go below 0')
        } else if (type === 'plus') {
            games[index].rating++
            res.status(200).send(games)
        } else if (type === 'minus') {
            games[index].rating--
            res.status(200).send(games)
        } else {
            res.sendStatus(400)
        }
    }
}