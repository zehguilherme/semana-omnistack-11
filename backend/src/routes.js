const express = require('express')

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()  //modulo de rotas do express passa para a variavel em questão

// ONG
routes.get('/ongs', OngController.index)   // Listar
routes.post('/ongs', OngController.create) // Criar

// Profile
routes.get('/incidents', ProfileController.index)   // Listar os casos específicos de uma única ONG

// Login - criar (post) uma sessão
routes.post('/sessions', SessionController.create)

// Caso
routes.get('/incidents', IncidentController.index)          // Listar
routes.post('/incidents', IncidentController.create)        // Criar
routes.delete('/incidents/:id', IncidentController.delete)  // Deletar

module.exports = routes
