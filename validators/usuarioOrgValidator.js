const z = require('zod')

const usuarioOrgSchema = z.object({
    cnpj: z.string().optional(), // permite não enviar
    nome_fantasia: z.string({
        required_error: "nome_fantasia é obrigatório",
        invalid_type_error: "nome_fantasia deve ser uma string"
    }),

    nome_fantasia: z.string({
        required_error: "nome_fantasia é obrigatório",
        invalid_type_error: "nome_fantasia deve ser uma string"
    }),

    email: z.string({
        required_error: "email é obrigatório",
        invalid_type_error: "email deve ser uma string"
    }),

   telefone: z.string({
        required_error: "telefone é obrigatório",
        invalid_type_error: "telefone deve ser uma string"
    }),

    razao_social: z.string().optional(),
    senha: z.string({
        required_error: "senha é obrigatória",
        invalid_type_error: "senha deve ser uma string"
    }),

    senha: z.string({
        required_error: "senha é obrigatória",
        invalid_type_error: "senha deve ser uma string"
    }),
});

function validateUserOrgInput(data) {
  try {
    usuarioOrgSchema.parse(data);
    return [];
  } catch (error) {
    return error.errors.map(err => err.message);
  }
}

module.exports = { validateUserOrgInput };