const express = require('express')

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')

const routes = express.Router()  //modulo de rotas do express passa para a variavel em questão

// ONG
routes.get('/ongs', OngController.index)   // Listar
routes.post('/ongs', OngController.create) // Criar

// Caso
routes.get('/incidents', IncidentController.index)   // Listar
routes.post('/incidents', IncidentController.create) // Criar
routes.delete('/incidents/:id', IncidentController.delete)  // Deletar

module.exports = routes
