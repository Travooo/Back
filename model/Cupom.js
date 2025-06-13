class Cupom {
    constructor({id, estabelecimento_id, descricao, created_at, expiration, nome, organizacao_id}) {
        if (id !== undefined) {
            this.id = id;
          }
        this.estabelecimento_id = estabelecimento_id;
        this.organizacao_id = organizacao_id;
        this.descricao = descricao;
        this.created_at = created_at;
        this.expiration = expiration;
        this.nome = nome;
    }
}

module.exports = Cupom;