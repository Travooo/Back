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
    const dataConvertida =
      typeof horario === "string" ? new Date(horario) : horario;
    if (!(dataConvertida instanceof Date) || isNaN(dataConvertida.getTime())) {
      throw new Error(
        "Atributo 'horario' deve ser uma string ISO ou Date válida."
      );
    }
  }
}

module.exports = LocalVisitado;
