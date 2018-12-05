const router = require('express').Router()
const gameController = require('../controllers/game.controller')
const authController = require('../controllers/auth.controller')

router.get('/games', gameController.getAll)
router.get('/games/:gameId', gameController.getById)
router.post('/gamesr/', gameController.addNewGame)
router.post('/games/insert/', gameController.insertNewGame)
router.post('/games/update/:gameId', gameController.updatetNewGame)

router.post('/register', authController.register)
router.get('/users', authController.allUsers)
router.post('/login', authController.login)


module.exports = router