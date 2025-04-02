class Conexao {
  constructor(usuario1_id, usuario2_id, data_conexao) {
    if (!usuario1_id || !usuario2_id || data_conexao) {
      throw new Error("Campos obrigatórios ausentes ou inválidos.");
    }
    if (!Number.isInteger(usuario1_id) || usuario1_id <= 0) {
      throw new Error("Atributo 'usuario1_id' inválido.");
    }
    if (!Number.isInteger(usuario2_id) || usuario2_id <= 0) {
      throw new Error("Atributo 'usuario2_id' inválido.");
    }
    if (!(data_conexao instanceof Date && isNaN(data_comentario.getTime()))) {
      throw new Error("Atributo 'data_conexao' deve ser um objeto Date.");
    }
    this.id_usuario1 = usuario1_id;
    this.id_usuario2 = usuario2_id;
    this.data_conexao = data_conexao;
  }
}

module.exports = Conexao;
