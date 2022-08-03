const {games, ratings} = require('./db.json')
let globalId = 11

module.exports = {
    getGames: (req, res) => {
        for (let i = 0; i < games.length; i++) {
            let avgRatings = ratings[games[i].id].reduce((acc, curr) => acc + curr) / ratings[games[i].id].length
            avgRatings = avgRatings.toFixed(1)
            games[i].rating = avgRatings
        }
        res.status(200).send(games)
    },
    deleteGame: (req, res) => {
        let index = games.findIndex(elem => elem.id === +req.params.id)
        games.splice(index, 1)
        delete ratings[req.params.id]
        res.status(200).send(games)
    },
    createGame: (req, res) => {
        let { title, rating, imageURL } = req.body
        let newGame = {
            id: globalId,
            title, 
            imageURL
        }
        games.push(newGame)
        ratings[globalId] = [+rating]
        
        for (let i = 0; i < games.length; i++) {
            let avgRatings = ratings[games[i].id].reduce((acc, curr) => acc + curr) / ratings[games[i].id].length
            avgRatings = avgRatings.toFixed(1)
            games[i].rating = avgRatings
        }

        res.status(200).send(games)
        globalId++
    },
    updateGame: (req, res) => {
        let { id, rating } = req.params
        ratings[id].push(+rating)

        for (let i = 0; i < games.length; i++) {
            let avgRatings = ratings[games[i].id].reduce((acc, curr) => acc + curr) / ratings[games[i].id].length
            avgRatings = avgRatings.toFixed(1)
            games[i].rating = avgRatings
        }
        res.status(200).send(games)
    }
}