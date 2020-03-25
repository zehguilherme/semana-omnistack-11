const express = require('express')

const OngController = require('./controllers/OngController')

const routes = express.Router()  //modulo de rotas do express passa para a variavel em questão

// Listar ONGs
routes.get('/ongs', OngController.index)

/**********************************************************************************************************************/

// Criar ONG
routes.post('/ongs', OngController.create)

module.exports = routes
