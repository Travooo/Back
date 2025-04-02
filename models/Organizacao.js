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
    if (typeof email !== "string") {
      throw new Error("Atributo 'email' inválido.");
    }
    if (typeof titulo !== "string") {
      throw new Error("Atributo 'titulo' inválido.");
    }
    if (typeof razao_social !== "string") {
      throw new Error("Atributo 'razao_social' inválido.");
    }
    if (typeof senha !== "string") {
      throw new Error("Atributo 'senha' inválido.");
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
