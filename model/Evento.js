class Evento {
    constructor({id, estabelecimento_id, organizacao_id, nome, data, descricao, created_at}) {
        if (id !== undefined) {
            this.id = id;
          }
        this.estabelecimento_id = estabelecimento_id;
        this.organizacao_id = organizacao_id;
        this.nome = nome;
        this.data = data;
        this.descricao = descricao;
        this.created_at = created_at;
    }
}

module.exports = Evento;