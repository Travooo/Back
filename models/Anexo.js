class Anexo {
  constructor(anexo, estabelecimento_id) {
    if (!anexo || !estabelecimento_id) {
      throw new Error("Campos obrigatórios ausentes ou inválidos.");
    }
    if (!(anexo instanceof Buffer)) {
      throw new Error("Atributo 'anexo' inválido.");
    }
    if (!(typeof estabelecimento_id !== "number") || estabelecimento_id <= 0) {
      throw new Error("Atributo 'estabelecimento_id' inválido.");
    }
    this.anexo = anexo;
    this.estabelecimento_id = estabelecimento_id;
  }
}

module.exports = Anexo;
