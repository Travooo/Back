const ModeloBase = require("./ModeloBase");

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexSenha = /^[a-zA-Z0-9!@#\$%\^&\*\)\(+=._-]+$/;
const regexNomeUsuario = /^[a-zA-Z0-9_]+$/;
const regexNomeCompleto = /^[A-Za-zÀ-ÿ\s]+$/;

class Usuario extends ModeloBase {
  static #schema = {
    // #: Privado
    email: {
      tipo: "string",
      required: true,
      atributo: "email",
      formato: regexEmail,
      erro: "Formato de email inválido.",
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
    nome_usuario: {
      tipo: "string",
      required: true,
      atributo: "nome_usuario",
      min: 4,
      max: 30,
      formato: regexNomeUsuario,
      erro: "O nome de usuário pode conter apenas letras, números ou underline.",
    },
    nome_completo: {
      tipo: "string",
      required: true,
      atributo: "nome_completo",
      min: 3,
      max: 60,
      formato: regexNomeCompleto,
      erro: "O nome completo deve conter apenas letras e espaços.",
    },
    foto_perfil: {
      tipo: "foto",
      atributo: "foto_perfil",
      tiposPermitidos: ["image/jpeg", "image/png"],
      tamanhoMaxMB: 3,
    },
    sobre: {
      tipo: "string",
      atributo: "sobre",
      min: 10,
      max: 300,
    },
    data_nascimento: {
      tipo: "date",
      required: true,
      atributo: "data_nascimento",
    },
    admin: {
      tipo: "option",
      required: true,
      atributo: "admin",
    },
    tipo_plano: {
      tipo: "option",
      required: true,
      atributo: "tipo_plano",
    },
  };
  static getSchema() {
    return this.#schema;
  }
}

module.exports = Usuario;
