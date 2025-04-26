const { z } = require('zod');

const userSchema = z.object({
  nome_usuario: z.string({
    required_error: "Nome de usuário é obrigatório.",
    invalid_type_error: "Nome de usuário deve ser uma string.",
  }),

  email: z.string({
    required_error: "Email é obrigatório.",
    invalid_type_error: "Email deve ser uma string.",
  }).email("Email inválido."),

  senha: z.string({
    required_error: "Senha é obrigatória.",
    invalid_type_error: "Senha deve ser uma string.",
  }).min(6, "Senha deve ter pelo menos 6 caracteres."),

  sobre: z.string().max(1000, "O campo 'sobre' deve ter no máximo 1000 caracteres.").optional(),

  data_nascimento: z.string({
    required_error: "Data de nascimento é obrigatório",
    invalid_type_error: "A data deve ser tipo DATE"
  }).refine((val) => {
    const date = new Date(val);
    const now = new Date();
    return !isNaN(date) && date <= now;
  }, {
    message: "Data de nascimento inválida ou no futuro.",
  }),

  admin: z.boolean({
    required_error: "Campo 'admin' deve ser informado.",
    invalid_type_error: "O campo 'admin' deve ser verdadeiro ou falso (boolean)."
  }),

});

function validateUserInput(data) {
  try {
    userSchema.parse(data);
    return [];
  } catch (error) {
    return error.errors.map(err => err.message);
  }
}

module.exports = { validateUserInput };
