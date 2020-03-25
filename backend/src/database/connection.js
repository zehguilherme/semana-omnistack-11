const knex = require('knex')
const configuration = require('../../knexfile')  //configurações do banco de dados

const connection = knex(configuration.development)

module.exports = connection
