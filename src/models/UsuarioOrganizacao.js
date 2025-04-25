const ModeloBase = require("./ModeloBase");

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexSenha = /^[a-zA-Z0-9!@#\$%\^&\*\)\(+=._-]+$/;
const regexRazaoSocial = /^[A-Za-z0-9À-ÿ\s.,'-]{2,200}$/;

class UsuarioOrganizacao extends ModeloBase {
  static #schema = {
    // #: Privado
    cnpj: {
      tipo: "string",
      required: true,
      atributo: "cnpj",
      min: 14,
      max: 14,
    },
    nome_fantasia: {
      tipo: "string",
      required: true,
      atributo: "nome_usuario",
      min: 1,
      max: 50,
    },
    email: {
      tipo: "string",
      required: true,
      atributo: "email",
      min: 3,
      max: 254,
      formato: regexEmail,
      erro: "Formato de email inválido.",
    },
    telefone: {
      tipo: "string",
      required: true,
      atributo: "telefone",
      min: 10,
      max: 11,
    },
    razao_social: {
      tipo: "string",
      required: true,
      atributo: "nome_usuario",
      min: 1,
      max: 40,
      formato: regexRazaoSocial,
      erro: "A razão social pode conter apenas letras, números, acentos, espaços, vírgulas, pontos, apóstrofos e hífens.",
    },
    senha: {
      tipo: "string",
      required: true,
      atributo: "senha",
      min: 6,
      max: 20,
      formato: regexSenha,
      erro: "A senha deve conter apenas letras, números ou caracteres especiais permitidos.",
    },
  };
  static getSchema() {
    return this.#schema;
  }
}

module.exports = UsuarioOrganizacao;
