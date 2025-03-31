class Organizacao {
  constructor(
    id_organizacao = null,
    id_usuario,
    cnpj,
    razao_social,
    nome_fantasia,
    email,
    telefone,
    senha
  ) {
    this.id_organizacao = id_organizacao;
    this.id_usuario = id_usuario;
    this.cnpj = cnpj;
    this.nome_fantasia = nome_fantasia;
    this.endereco = endereco;
    this.razao_social = razao_social;
    this.email = email;
    this.telefone = telefone;
    this.senha = senha;
  }
}

module.exports = Organizacao;
