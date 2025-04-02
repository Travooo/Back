class Cupom {
  constructor(estabelecimento_id, usuario_id, descricao) {
    if (!estabelecimento_id || !usuario_id || !descricao) {
      throw new Erros("Campos obrigatórios ausentes ou inválidos.");
    }
    if (typeof estabelecimento_id !== "number") {
      throw new Error("Atributo 'estabelecimento_id' inválido.");
    }
    if (typeof usuario_id !== "number") {
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
