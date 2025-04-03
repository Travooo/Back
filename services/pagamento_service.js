const Pagamento = require('../model/Pagamento');
const supabase = require('../config/db');

class PagamentoService {
    static async createPagamento(data) {
        const { error, data: result } = await Pagamento.insert(data);
        if (error) throw error;
        return result;
    }

    static async getPagamentoById(id) {
        const { error, data } = await Pagamento.getById(id);
        if (error) throw error;
        return data;
    }

    static async getAllPagamentos() {
        const { error, data } = await Pagamento.getAll();
        if (error) throw error;
        return data;
    }

    static async deletePagamento(id) {
        const { error } = await Pagamento.delete(id);
        if (error) throw error;
        return { message: 'Pagamento removido com sucesso' };
    }
}

module.exports = PagamentoService;