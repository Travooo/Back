
const { z } = require('zod');

const eventoSchema = z.object({
    estabelecimento_id: z.number({ required_error: "estabelecimento_id é obrigatório" }),
    organizacao_id: z.number({ required_error: "organizacao_id é obrigatório" }),
    nome: z.string({ required_error: "Nome é obrigatório", invalid_type_error: "Tipo deve ser String" }),
    data: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Data do evento inválida"
    }),
    descricao: z.string({ required_error: "Descrição é obrigatória", invalid_type_error: "Tipo deve ser String"}),
    created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Data de criação inválida"
    })
});

function validateEvento(data) {
    try {
        eventoSchema.parse(data);
        return [];
    } catch (err) {
        return err.errors.map(e => e.message);
    }
}

module.exports = { validateEvento };
