// Responsável pelo perfil de uma entidade (ONG)

const connection = require('../database/connection')  //conexão com o banco

module.exports = {
    // Lista os casos específicos de uma única ONG
    async index (req, res) {
        const ong_id = req.headers.authorization // id da ONG logada

        // Buscar os casos criados pela ong de id ong_id
        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*')

        return res.json(incidents)
    }
}
