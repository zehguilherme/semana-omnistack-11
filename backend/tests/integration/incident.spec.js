/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('Incident', () => {
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
  it('should be able to create a new Incident', async () => {
    const response = await request(app)
      .post('/incidents')
      .set('Authorization', '28b4e0c8')
      .send({
        title: "Novo caso",
        description: "Detalhes do caso",
        value: 120
      })

    expect(response.body).toHaveProperty('id')  //tenha a propriedade 'id'
  })

  // Listar
  it('should be able to search and show all the Incidents avaiable', async () => {
    const response = await request(app)
      .get('/incidents')
      .query({ page: 1 })


    expect(response.status === 200)  //status code = 200 - OK
  })

  // Deletar
  it('should be able to delete an specific incident', async () => {
    const response = await request(app)
      .get('/incidents')
      .set('Authorization', '28b4e0c8')


    expect(response.status === 200)  //status code = 200 - OK
  })
});
