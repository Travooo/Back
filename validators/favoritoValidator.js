
const { z } = require('zod');

const favoritoSchema = z.object({
    usuario_id: z.number({ required_error: "usuario_id é obrigatório" }),
    estabelecimento_id: z.number({ required_error: "estabelecimento_id é obrigatório" }),
    created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Data de criação inválida"
    })
});

function validateFavorito(data) {
    try {
        favoritoSchema.parse(data);
        return [];
    } catch (err) {
        return err.errors.map(e => e.message);
    }
}

module.exports = { validateFavorito };
