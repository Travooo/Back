const Notificacoes = require('../models/Notificacoes');

class NotificacoesService {
    static async createNotificacao(data) {
        const { error, data: result } = await Notificacoes.insert(data);
        if (error) throw error;
        return result;
    }

    static async getNotificacaoById(id) {
        const { error, data } = await Notificacoes.getById(id);
        if (error) throw error;
        return data;
    }

    static async getAllNotificacoes() {
        const { error, data } = await Notificacoes.getAll();
        if (error) throw error;
        return data;
    }

    static async deleteNotificacao(id) {
        const { error } = await Notificacoes.delete(id);
        if (error) throw error;
        return { message: 'Notificação removida com sucesso' };
    }
}

module.exports = NotificacoesService;