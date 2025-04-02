class LocalVisitado {
  constructor(estabelecimento_id, usuario_id, data_visita) {
    this.estabelecimento_id = estabelecimento_id;
    this.usuario_id = usuario_id;
    this.data_visita = data_visita;
    if (!estabelecimento_id || !usuario_id || !data_visita) {
      throw new Error("Campos obrigatórios ausentes ou inválidos.");
    }
    if (!Number.isInteger(estabelecimento_id) || estabelecimento_id <= 0) {
      throw new Error("Atributo 'estabelecimento_id' inválido.");
    }
    if (!Number.isInteger(usuario_id) || usuario_id <= 0) {
      throw new Error("Atributo 'usuario_id' inválido.");
    }
    if (!(data_visita instanceof Date && isNaN(data_visita.getTime()))) {
      throw new Error("Atributo 'data_visita' deve ser um objeto Date.");
    }
  }
}

module.exports = LocalVisitado;
