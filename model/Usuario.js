class Usuario {
  constructor(
    id = null,
    admin,
    email,
    senha,
    nome_usuario,
    nome_completo,
    sobre,
    foto_perfil,
    data_nascimento,
    created_at,
    tipo_plano
  ) {
    this.id = id;
    this.admin = admin;
    this.email = email;
    this.senha = senha;
    this.nome_usuario = nome_usuario;
    this.nome_completo = nome_completo;
    this.sobre = sobre;
    this.foto_perfil = foto_perfil;
    this.data_nascimento = data_nascimento;
    this.created_at = created_at;
    this.tipo_plano = tipo_plano;
  }
}

module.exports = Usuario;