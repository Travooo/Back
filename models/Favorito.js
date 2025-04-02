class Favorito {
  constructor(usuario_id, estabelecimento_id) {
    if (!usuario_id || !estabelecimento_id) {
      throw new Error("Campos obrigatórios ausentes ou inválidos.");
    }
    if (!Number.isInteger(usuario_id) || usuario_id <= 1) {
      throw new Error("Campos 'usuario_id' inválido.");
    }
    if (!Number.isInteger(estabelecimento_id) || estabelecimento_id <= 1) {
      throw new Error("Campos 'estabelecimento_id' inválido.");
    }
    this.usuario_id = usuario_id;
    this.estabelecimento_id = estabelecimento_id;
  }
}

module.exports = Favorito;
