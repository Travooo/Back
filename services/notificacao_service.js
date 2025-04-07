const Notificacao = require('../model/Notificacao');
const supabase = require('../config/db');

class NotificacaoService {
    static async createNotificacao(data) {
        const { error, data: result } = await supabase.from('notificacoes').insert([data]);
        if (error) throw error;
        return result;
    }

    static async getNotificacaoById(id) {
        const { error, data } = await supabase.from('notificacoes').select("*").eq('id', id).single();
        if (error) throw error;
        return data;
    }

    static async getAllNotificacoes() {
        const { error, data } = await supabase.from('notificacoes').select('*');
        if (error) throw error;
        return data;
    }

    static async updateNotificacao(id, updates) {
        const { error } = await supabase.from('notificacoes').update(updates).eq('id', id);
        if (error) throw error;
        return { message: 'Notificação atualizada com sucesso' };
    }

    static async deleteNotificacao(id) {
        const { error } = await supabase.from('notificacoes').delete().eq('id', id);
        if (error) throw error;
        return { message: 'Notificação removida com sucesso' };
    }
}

module.exports = NotificacaoService;
