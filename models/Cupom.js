class Cupom {
  constructor(estabelecimento_id, usuario_id, descricao) {
    if (!estabelecimento_id || !usuario_id || !descricao) {
      throw new Error("Campos obrigatórios ausentes ou inválidos.");
    }
    if (!Number.isInteger(estabelecimento_id) || estabelecimento_id <= 0) {
      throw new Error("Atributo 'estabelecimento_id' inválido.");
    }
    if (!Number.isInteger(usuario_id) || usuario_id <= 0) {
      throw new Error("Atributo 'usuario_id' inválido.");
    }
    if (typeof descricao !== "string") {
      throw new Error("Atributo 'descricao' deve ser uma string.");
    }
    this.estabelecimento_id = estabelecimento_id;
    this.usuario_id = usuario_id;
    this.descricao = descricao;
  }
}

module.exports = Cupom;
