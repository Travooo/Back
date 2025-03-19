const Evento = require('../model/Evento');
const supabase = require('../config/db');

class EventoService {
    static async criar(evento) {
        const { data, error } = await supabase
            .from('evento')
            .insert([{ 
                id_usuario: evento.id_usuario,
                id_usuario_organizacao: evento.id_usuario_organizacao,
                nome: evento.nome,
                data: evento.data,
                descricao: evento.descricao
            }])
            .select();
        if (error) throw error;
        return data;
    }

    static async buscarPorId(id) {
        const { data, error } = await supabase
            .from('evento')
            .select()
            .eq('id_evento', id)
            .single();
        if (error) throw error;
        return data;
    }

    static async listarTodos() {
        const { data, error } = await supabase.from('evento').select();
        if (error) throw error;
        return data;
    }

    static async atualizar(id, evento) {
        const { data, error } = await supabase
            .from('evento')
            .update({
                id_usuario: evento.id_usuario,
                id_usuario_organizacao: evento.id_usuario_organizacao,
                nome: evento.nome,
                data: evento.data,
                descricao: evento.descricao
            })
            .eq('id_evento', id)
            .select();
        if (error) throw error;
        return data;
    }

    static async deletar(id) {
        const { error } = await supabase.from('evento').delete().eq('id_evento', id);
        if (error) throw error;
        return { message: 'Evento removido com sucesso.' };
    }
}

module.exports = EventoService;