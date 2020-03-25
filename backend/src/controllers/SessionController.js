// Login - Criação de uma sessão

const connection = require('../database/connection')  //conexão com o banco

module.exports = {
    // Login - criar uma sessão
    async create (req, res) {
        const { id } = req.body  // id da ONG que vai fazer o login

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first()  // como a busca é por id, será retornado uma única ONG

        // Caso a ONG não exista
        if (!ong) {
            return res.status(400).json({ error: 'No ONG found with this ID' })  // status 400: bad request (há algum erro)
        }

        // Caso a ONG exista, retorna os dados dela, no caso, apenas o name
        return res.json(ong)

    }
}
