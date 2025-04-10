const Evento = require('../model/Evento');
const supabase = require('../config/db');

class EventoService {
    static async createEvento(data) {
        if (data.created_at === undefined || data.created_at === null) {
            delete data.created_at;
        }
        const { error, data: result } = await supabase.from('eventos').insert([data]);
        if (error) throw error;
        return result;
    }

    static async getEventoById(id) {
        const { error, data } = await supabase.from('eventos').select("*").eq('id', id).single();
        if (error) throw error;
        return data;
    }

    static async getAllEventos() {
        const { error, data } = await supabase.from('eventos').select('*');
        if (error) throw error;
        return data;
    }

    static async updateEvento(id, updates) {
        const { error } = await supabase.from('eventos').update(updates).eq('id', id);
        if (error) throw error;
        return { message: 'Evento atualizado com sucesso' };
    }

    static async deleteEvento(id) {
        const { error } = await supabase.from('eventos').delete().eq('id', id);
        if (error) throw error;
        return { message: 'Evento removido com sucesso' };
    }
}

module.exports = EventoService;
