class Notificacoes {
  constructor(id_notificacoes = null, titulo, descricao, id_usuario) {
    this.id_notificacoes = id_notificacoes;
    this.titulo = titulo;
    this.descricao = descricao;
    this.id_usuario = id_usuario;
  }
}

module.exports = Notificacoes;
