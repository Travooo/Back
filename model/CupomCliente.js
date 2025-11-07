class CupomCliente {
    constructor({id, resgatado, cupom_id, usuario_id, status_ativo}) {
        if (id !== undefined) {
            this.id = id;
          }
        this.cupom_id = cupom_id;
        this.usuario_id = usuario_id;
        this.resgatado = resgatado;
        this.status_ativo = status_ativo;
    }
}

module.exports = CupomCliente;