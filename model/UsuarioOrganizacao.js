class UsuarioOrganizacao {
  constructor(
    id_usuario_organizacao = null,
    id_usuario,
    cnpj,
    nome_fantasia,
    endereco
  ) {
    this.id_usuario_organizacao = id_usuario_organizacao;
    this.id_usuario = id_usuario;
    this.cnpj = cnpj;
    this.nome_fantasia = nome_fantasia;
    this.endereco = endereco;
  }
}

module.exports = UsuarioOrganizacao;