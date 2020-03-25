const connection = require('../database/connection')  //conexão com o banco

module.exports = {
    // Listar casos
    async index (req, res) {
        const incidents = await connection('incidents').select('*')

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
        if (incident.ong_id != ong_id) {
            return res.status(401).json({ error: 'Operation not permitted.' })
        }

        // Deleção do banco de dados
        await connection('incidents')
            .where('id', id)
            .delete()

        return res.status(204).send()  // 204: resposta com sucesso mas sem conteúdo
    }
}
