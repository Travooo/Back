const validator = require("validator");

class Usuario {
  constructor(
    email,
    senha,
    nome_usuario,
    nome_completo,
    foto_perfil = null,
    sobre = null,
    data_nascimento,
    admin = false,
    tipo_plano = 1
  ) {
    if (
      !email ||
      !senha ||
      !nome_usuario ||
      !nome_completo ||
      !data_nascimento
    ) {
      throw new Error("Campos obrigatórios inválidos ou ausentes.");
    }
    if (typeof email !== "string" || !validator.isEmail(email)) {
      throw new Error("Atributo 'e-mail' inválido.");
    }
    if (typeof senha !== "string") {
      throw new Error("Atributo 'senha' inválido.");
    }
    if (senha.length < 6) {
      throw new Error("Atributo 'senha' deve ter pelo menos 6 caracteres.");
    }
    if (typeof nome_usuario !== "string") {
      throw new Error("Atributo 'nome_usuario' inválido.");
    }
    if (typeof nome_completo !== "string") {
      throw new Error("Atributo 'nome_completo' inválido.");
    }
    if (foto_perfil && !(foto_perfil instanceof Buffer)) {
      throw new Error("Atributo 'foto_perfil' inválido.");
    }
    if (sobre && !(typeof sobre !== "string")) {
      throw new Error("Atributo 'sobre' inválido.");
    }
    if (
      !(data_nascimento instanceof Date || isNaN(data_nascimento.getTime()))
    ) {
      throw new Error("Atributo 'data_nascimento' deve ser um objeto Date.");
    }
    if (typeof admin !== "boolean") {
      throw new Error("Atributo 'admin' inválido.");
    }
    const tiposPlanos = [1, 2, 3];
    if (!Number.isInteger(tipo_plano) || !tiposPlanos.includes(tipo_plano)) {
      throw new Error("Campos 'tipo_plano' inválido.");
    }
    this.email = email;
    this.senha = senha;
    this.nome_usuario = nome_usuario;
    this.nome_completo = nome_completo;
    this.foto_perfil = foto_perfil;
    this.sobre = sobre;
    this.data_nascimento = data_nascimento;
    this.admin = admin;
    this.tipo_plano = tipo_plano;
  }
}

module.exports = Usuario;
