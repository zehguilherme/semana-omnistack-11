const crypto = require('crypto')
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

        const id = crypto.randomBytes(4).toString('HEX')  //geração de 4 bites de caracteres hexadecimais (letras)

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
