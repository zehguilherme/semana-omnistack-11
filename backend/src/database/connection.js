/* eslint-disable no-undef */
const knex = require('knex')
const configuration = require('../../knexfile')  //configurações do banco de dados

//variáveis ambientes
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development

const connection = knex(config)

module.exports = connection
