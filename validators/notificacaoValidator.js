
const { z } = require('zod');

const notificacaoSchema = z.object({
    titulo: z.string({ required_error: "Título é obrigatório", invalid_type_error: "Tipo deve ser String"}),
    descricao: z.string({ required_error: "Descrição é obrigatória", invalid_type_error: "Tipo deve ser String"}),
    usuario_id: z.number({ required_error: "usuario_id é obrigatório" }),
    created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Data de criação inválida"
    })
});

function validateNotificacao(data) {
    try {
        notificacaoSchema.parse(data);
        return [];
    } catch (err) {
        return err.errors.map(e => e.message);
    }
}

module.exports = { validateNotificacao };
