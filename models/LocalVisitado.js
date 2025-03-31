class LocalVisitado {
  constructor(
    id_local_visitado = null,
    id_estabelecimento,
    id_usuario,
    data_visita
  ) {
    this.id_local_visitado = id_local_visitado;
    this.id_estabelecimento = id_estabelecimento;
    this.id_usuario = id_usuario;
    this.data_visita = data_visita;
  }
}

module.exports = LocalVisitado;
