
const { z } = require('zod');

const cupomSchema = z.object({
    estabelecimento_id: z.number({ required_error: "estabelecimento_id é obrigatório" }),
    descricao: z.string({ 
        required_error: "Descrição é obrigatória", 
        invalid_type_error: "Tipo deve ser string"
    }),
    expiration: z.string({
        required_error: "Data de vencimento é obrigatória"
      }).refine((val) => {
        const data = new Date(val);
        const agora = new Date();
        return !isNaN(data) && data > agora;
      }, {
        message: "A data de vencimento deve ser uma data válida no futuro."
      })
});

function validateCupom(data) {
    try {
        cupomSchema.parse(data);
        return [];
    } catch (err) {
        return err.errors.map(e => e.message);
    }
}

const cupomClienteSchema = z.object({
    cliente_id: z.number({ required_error: "cliente_id é obrigatório" }),
    cupom_id: z.number({ required_error: "cupom_id é obrigatório" }),
    usado: z.boolean().optional(),
    data_resgate: z.string().optional().refine((val) => {
        if (!val) return true;
        const d = new Date(val);
        const agora = new Date();
        return !isNaN(d) && d <= agora; // resgate não pode ser uma data no futuro
    }, { message: "data_resgate deve ser uma data válida (não no futuro)." })
});

function validateCupomCliente(data) {
    try {
        cupomClienteSchema.parse(data);
        return [];
    } catch (err) {
        return err.errors.map(e => e.message);
    }
}

module.exports = { validateCupom, validateCupomCliente };
