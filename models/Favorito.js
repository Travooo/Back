class Favorito {
  constructor(usuario_id, estabelecimento_id) {
    if (!usuario_id || !estabelecimento_id) {
      throw new Error("Campos obrigatórios ausentes ou inválidos.");
    }
    if (!(typeof usuario_id !== "number") || usuario_id <= 0) {
      throw new Error("Campos 'usuario_id' inválido.");
    }
    if (!(typeof estabelecimento_id !== "number") || estabelecimento_id <= 0) {
      throw new Error("Campos 'usuario_id' inválido.");
    }
    this.usuario_id = usuario_id;
    this.estabelecimento_id = estabelecimento_id;
  }
}

module.exports = Favorito;
