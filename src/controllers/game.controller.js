const Game = require('../models/game.model')
const ApiError = require('../models/apierror.model')
const pool = require('../config/db')

let games = [
	new Game('Battlefield 5', 'EA', 2018, 'FPS')
]

// Voorbeeld werken met arrays
games.forEach((item) => {
	// doe iets met item
})

module.exports = {

	getAll(req, res, next) {
		console.log('gameController.get called')

		// For pool initialization, see above
		pool.query("SELECT * FROM games", function (err, rows, fields) {
			// Connection is automatically released when query resolves
			if(err){
				console.log(err)
				return next(new ApiError(err, 500))
			}
			res.status(200).json({ result: rows }).end()
		})
	},

	getById(req, res, next) {
		const id = req.params.gameId

		// For pool initialization, see above
		pool.query(`SELECT * FROM games where id = ${id}`, function (err, rows, fields) {
			// Connection is automatically released when query resolves
			if(err){
				console.log(err)
				return next(new ApiError(err, 500))
			}
			res.status(200).json({ result: rows }).end()
		})
		
	},

	insertNewGame(req, res,next) {
		console.log('gameController.insertNewGame called')

		const query = 'INSERT INTO games(title, producer, year, Type) VALUES (?,?,?,?)'

		// For pool initialization, see above
		pool.query(query, [req.body.title, req.body.producer, req.body.year, req.body.Type],  
		 function (err, rows, fields) {
			// Connection is automatically released when query resolves
			if(err){
				console.log(err)
				return next(new ApiError(err, 500))
			}
			res.status(200).json({ result: rows }).end()
		})
	},

	updatetNewGame(req, res,next) {
		console.log('gameController.updatetNewGame called')
		const id = req.params.gameId
		const query = `UPDATE games SET title = ?, producer = ?, year = ?, Type = ?  WHERE id = ${id}`

		// For pool initialization, see above
		pool.query(query, [req.body.title, req.body.producer, req.body.year, req.body.Type] , 
		 function (err, rows, fields) {
			// Connection is automatically released when query resolves
			if(err){
				console.log(err)
				return next(new ApiError(err, 500))
			}
			res.status(200).json({ result: rows }).end()
		})
	},

	addNewGame(req, res) {
		console.log('gameController.addNewGame called')
		console.dir(req.body)

		// add game to array of games
		const game = new Game(req.body.name, req.body.producer, req.body.year, req.body.type)
		games.push(game)

		res.status(200).json({ 
			message: req.body.name + ' succesvol toegevoegd'
		}).end()
	}

}