class Notificacoes {
  constructor(usuario_id, titulo, descricao) {
    if (!usuario_id || !titulo || !descricao) {
      throw new Error("Campos obrigatórios ausentes ou inválidos.");
    }
    if (!Number.isInteger(usuario_id) || usuario_id <= 0) {
      throw new Error("Atributo 'estabelecimento_id' inválido.");
    }
    if (typeof titulo !== "string") {
      throw new Error("Atributo 'titulo' inválido.");
    }
    if (typeof descricao !== "string") {
      throw new Error("Atributo 'descricao' inválido.");
    }
    this.usuario_id = usuario_id;
    this.titulo = titulo;
    this.descricao = descricao;
  }
}

module.exports = Notificacoes;
