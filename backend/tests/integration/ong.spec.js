/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
  // Antes de cada um dos testes
  beforeEach(async () => {
    await connection.migrate.rollback()
    await connection.migrate.latest() //executadas as migrations das tabelas
  })

  // Executar depois de todos os testes
  afterAll(async () => {
    await connection.destroy()  //desfaz a conexão do teste com o banco de dados
  })

  // Criação
  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "APAD2",
        email: "teste@teste.com",
        whatsapp: "14000000000",
        city: "Bauru",
        uf: "SP"
      })

    expect(response.body).toHaveProperty('id')  //tenha uma propriedade 'id'
    expect(response.body.id).toHaveLength(8)    //id tenha 8 caracteres
  })

  // Profile
  it('should be able to search the profile of each ONG', async () => {
    const response = await request(app)
      .get('/profile')
      .set('Authorization', '28b4e0c8')

    expect(response.status === 200)
  })

  // Listar
  it('should be able to search and show all the ONGs avaiable', async () => {
    const response = await request(app)
      .get('/ongs')

    expect(response.status === 200)
  })

})
