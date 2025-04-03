const validator = require("validator");

class Organizacao {
  constructor(cnpj, nome_fantasia, email, telefone, razao_social, senha) {
    if (
      !cnpj ||
      !nome_fantasia ||
      !email ||
      !telefone ||
      !razao_social ||
      !senha
    ) {
      throw new Error("Campos obrigatórios ausentes ou inválidos.");
    }
    if (typeof cnpj !== "string") {
      throw new Error("Atributo 'cnpj' inválido.");
    }
    if (typeof nome_fantasia !== "string") {
      throw new Error("Atributo 'nome_fantasia' inválido.");
    }
    if (typeof email !== "string" || !validator.isEmail(email)) {
      throw new Error("Atributo 'e-mail' inválido.");
    }
    if (typeof telefone !== "string") {
      throw new Error("Atributo 'telefone' inválido.");
    }
    if (typeof razao_social !== "string") {
      throw new Error("Atributo 'razao_social' inválido.");
    }
    if (typeof senha !== "string") {
      throw new Error("Atributo 'senha' inválido.");
    }
    if (senha.length < 6) {
      throw new Error("Atributo 'senha' deve ter pelo menos 6 caracteres.");
    }

    this.cnpj = cnpj;
    this.nome_fantasia = nome_fantasia;
    this.email = email;
    this.telefone = telefone;
    this.razao_social = razao_social;
    this.senha = senha;
  }
}

module.exports = Organizacao;
