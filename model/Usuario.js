class Usuario {
  constructor(
    id_usuario = null,
    admin,
    email,
    senha,
    nome_usuario,
    nome_completo,
    sobre,
    foto_perfil,
    data_nascimento
  ) {
    this.id_usuario = id_usuario;
    this.admin = admin;
    this.email = email;
    this.senha = senha;
    this.nome_usuario = nome_usuario;
    this.nome_completo = nome_completo;
    this.sobre = sobre;
    this.foto_perfil = foto_perfil;
    this.data_nascimento = data_nascimento;
  }
}

module.exports = Usuario;