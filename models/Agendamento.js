const { tryParseInt, tryParseDate } = require("./utilities/parseSafe");

class Agendamento {
  constructor(estabelecimento_id, usuario_id, horario, detalhes = null) {
    this.estabelecimento_id = tryParseInt(estabelecimento_id);
    if (this.estabelecimento_id === null || this.estabelecimento_id <= 0) {
      throw new Error("Atributo 'estabelecimento_id' inválido.");
    }
    this.usuario_id = tryParseInt(usuario_id);
    if (this.usuario_id === null || this.usuario_id <= 0) {
      throw new Error("Atributo 'usuario_id' inválido.");
    }
    this.horario = tryParseDate(horario);
    if (this.horario === null) {
      throw new Error("Atributo 'horario' inválido.");
    }
    if (detalhes !== null && typeof detalhes !== "string") {
      throw new Error("Atributo 'detalhes' deve ser string ou null.");
    }
    this.detalhes = detalhes;
  }
}

module.exports = Agendamento;
