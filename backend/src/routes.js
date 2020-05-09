/* eslint-disable no-undef */
const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()  //modulo de rotas do express passa para a variavel em questão

/************************************************************************************ONG*/
routes.get('/ongs', OngController.index)   // Listar

routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  }),
}), OngController.create) // Criar

/**********************************************************************************Profile*/
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),
}), ProfileController.index)   // Listar os casos específicos de uma única ONG

/********************************************************************************Login - criar (post) uma sessão*/
routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object({
    id: Joi.string().required()
  })
}), SessionController.create)

/*************************************************************************************Caso*/
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object({
    page: Joi.number()
  })
}), IncidentController.index)          // Listar

routes.post('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),
  [Segments.BODY]: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required()
  })
}), IncidentController.create)        // Criar

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.number().required()
  })
}), IncidentController.delete)  // Deletar

module.exports = routes
