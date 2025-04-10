class UsuarioOrganizacao {
  constructor({ 
    id,
    cnpj,
    nome_fantasia,
    created_at,
    email,
    telefone,
    razao_social,
    senha
  }) {
    if (id !== undefined) {
      this.id = id;
    }
    this.cnpj = cnpj;
    this.nome_fantasia = nome_fantasia;
    this.created_at = created_at;
    this.email = email;
    this.telefone = telefone;
    this.razao_social = razao_social;
    this.senha = senha;
  }
}

module.exports = UsuarioOrganizacao;