const generateUniqueId = require('../utils/generateUniqueId')
const connection = require('../database/connection')  //conexão com o banco

module.exports = {
  // Listar ONGs
  async index (req, res) {
    const ongs = await connection('ongs').select('*')  //todos os registros

    return res.json(ongs)
  },

  /*******************************************************************************************************************************/

  // Criação de ONG
  async create (req, res) {
    const { name, email, whatsapp, city, uf } = req.body

    const id = generateUniqueId()

    // Inserir ONG
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })

    return res.json({ id })
  }
}

/*******************************************************************************************************************************/
