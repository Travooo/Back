
const { z } = require('zod');

const conexaoSchema = z.object({
    usuario1_id: z.number({ required_error: "usuario1_id é obrigatório" }),
    usuario2_id: z.number({ required_error: "usuario2_id é obrigatório" }),
    data_conexao: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Data de conexão inválida"
    })
});

function validateConexao(data) {
    try {
        conexaoSchema.parse(data);
        return [];
    } catch (err) {
        return err.errors.map(e => e.message);
    }
}

module.exports = { validateConexao };
