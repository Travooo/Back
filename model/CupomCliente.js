class CupomCliente {
    constructor({id, resgatado_em, cupom_id, usuario_id, status_ativo, codigo}) {
        if (id !== undefined) {
            this.id = id;
          }
        this.cupom_id = cupom_id;
        this.usuario_id = usuario_id;
        this.resgatado_em = resgatado_em;
        this.status_ativo = status_ativo;
        this.codigo = codigo;
    }
}

module.exports = CupomCliente;