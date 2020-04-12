const connection = require('../database/connection')  //conexão com o banco

module.exports = {
  // Listar casos
  async index (req, res) {
    const { page = 1 } = req.query

    // Retornar a quantidade de casos totais cadastrados
    const [count] = await connection('incidents').count()

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)                  // limitar busca para serem mostrados 5 registros por vez
      .offset((page - 1) * 5)    // pular a cada página de 5 em 5 registros em relação a anterior. Ex: 1 - 1 * 5
      .select([
        'incidents.*',    // todos os dados da tabela incidents;
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ])

    //Total de itens na lista
    res.header('x-total-count', count['count(*)'])

    return res.json(incidents)
  },

  /*************************************************************************************************************************/

  // Criar caso (incident)
  async create (req, res) {
    const { title, description, value } = req.body

    const ong_id = req.headers.authorization // id da ONG logada

    // Inserir caso
    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    })

    return res.json({ id })
  },

  /*************************************************************************************************************************/

  // Deletar caso
  async delete (req, res) {
    const { id } = req.params
    const ong_id = req.headers.authorization // id da ONG logada

    // Busca o caso em que o id é igual ao id vindo do req.params
    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')  // selecionar apenas coluna ong_id
      .first()           // retorna apenas 1 resultado

    // Verifica se o id buscado no banco é diferente do id da ONG logada no momento
    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error: 'Operation not permitted.' })
    }

    // Deleção do banco de dados
    await connection('incidents')
      .where('id', id)
      .delete()

    return res.status(204).send()  // 204: resposta com sucesso mas sem conteúdo
  }
}
